#!/bin/bash

set -e

# Configuration
PROGRAM_NAME="round3"
PROGRAM_KEYPAIR="deploy-keypair.json"
CONFIG_FILE="deployment_config.json"
USDC_MINT="4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU" # Devnet USDC mint address

# Ensure we're on devnet
solana config set --url https://api.devnet.solana.com

# Check if program keypair exists, if not create it
if [ ! -f "$PROGRAM_KEYPAIR" ]; then
    solana-keygen new --no-bip39-passphrase -o "$PROGRAM_KEYPAIR"
fi

# Get program ID from keypair
PROGRAM_ID=$(solana-keygen pubkey "$PROGRAM_KEYPAIR")
echo "Program ID: $PROGRAM_ID"

# Update Anchor.toml with the program ID
sed -i.bak "s/^round3 = \".*\"$/round3 = \"$PROGRAM_ID\"/" Anchor.toml
rm Anchor.toml.bak

# Update lib.rs with the program ID
sed -i.bak "s/declare_id!(\".*\")/declare_id!(\"$PROGRAM_ID\")/" programs/$PROGRAM_NAME/src/lib.rs
rm programs/$PROGRAM_NAME/src/lib.rs.bak

# Build the program
anchor build

# Deploy the program
anchor deploy --provider.cluster devnet --program-keypair "$PROGRAM_KEYPAIR" --program-name "$PROGRAM_NAME"

# Create or get initializer's USDC token account
INITIALIZER_TOKEN_ACCOUNT=$(spl-token create-account $USDC_MINT | grep "Creating account" | awk '{print $3}')
echo "Initializer USDC Token Account: $INITIALIZER_TOKEN_ACCOUNT"

# Create a new roundAccount
ROUND_ACCOUNT=$(solana-keygen new --no-bip39-passphrase --silent | solana-keygen pubkey -)
echo "Round Account: $ROUND_ACCOUNT"

# Save configuration
echo "{
  \"program_id\": \"$PROGRAM_ID\",
  \"usdc_mint\": \"$USDC_MINT\",
  \"initializer_token_account\": \"$INITIALIZER_TOKEN_ACCOUNT\",
  \"round_account\": \"$ROUND_ACCOUNT\"
}" > "$CONFIG_FILE"

# Output deployment summary
echo "
Deployment Summary:
-------------------
Program ID: $PROGRAM_ID
USDC Mint: $USDC_MINT
Initializer USDC Token Account: $INITIALIZER_TOKEN_ACCOUNT
Round Account: $ROUND_ACCOUNT
"

# Update React component with new addresses
sed -i.bak "s/const programId = new PublicKey('.*')/const programId = new PublicKey('$PROGRAM_ID')/" ../web/components/round3/InitializeRound.tsx
sed -i.bak "s/const tokenMint = new PublicKey('.*')/const tokenMint = new PublicKey('$USDC_MINT')/" ../web/components/round3/InitializeRound.tsx
sed -i.bak "s/const initializerTokenAccount = new PublicKey('.*')/const initializerTokenAccount = new PublicKey('$INITIALIZER_TOKEN_ACCOUNT')/" ../web/components/round3/InitializeRound.tsx
sed -i.bak "s/const roundAccount = new PublicKey('.*')/const roundAccount = new PublicKey('$ROUND_ACCOUNT')/" ../web/components/round3/InitializeRound.tsx
rm ../web/components/round3/InitializeRound.tsx.bak

echo "React component updated with new addresses."
echo "Deployment complete!"