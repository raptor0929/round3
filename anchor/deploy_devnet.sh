#!/bin/bash

# Exit immediately if a command exits with a non-zero status.
set -e

# Function to check if a command exists
command_exists () {
    type "$1" &> /dev/null ;
}

# Check for required tools
for cmd in solana anchor spl-token; do
    if ! command_exists "$cmd"; then
        echo "Error: $cmd is not installed. Please install it and try again."
        exit 1
    fi
done

# Configuration
PROGRAM_NAME="round3"
PROGRAM_KEYPAIR="deploy-keypair.json"
TOKEN_KEYPAIR="token-keypair.json"
ROUND_KEYPAIR="round-keypair.json"
TOKEN_NAME="StableCoinToken"
TOKEN_DECIMALS=6
INITIALIZER_AMOUNT=1000000000 # 1000 tokens with 6 decimals
CONFIG_FILE="deployment_config.json"

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

# Check if config file exists
if [ -f "$CONFIG_FILE" ]; then
    echo "Loading existing configuration..."
    TOKEN_ADDRESS="4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU"
    #TOKEN_ADDRESS=$(jq -r .token_address "$CONFIG_FILE")
    INITIALIZER_TOKEN_ACCOUNT=$(jq -r .initializer_token_account "$CONFIG_FILE")
else
    echo "No existing configuration found. Creating new token..."
    # Create token keypair if it doesn't exist
    if [ ! -f "$TOKEN_KEYPAIR" ]; then
        solana-keygen new --no-bip39-passphrase -o "$TOKEN_KEYPAIR"
    fi
    
    # Create token with the keypair
    TOKEN_ADDRESS=$(spl-token create-token --decimals $TOKEN_DECIMALS "$TOKEN_KEYPAIR" | grep "Creating token" | awk '{print $3}')
    echo "Token Address: $TOKEN_ADDRESS"

    # Create token account for the initializer (using default keypair)
    INITIALIZER_TOKEN_ACCOUNT=$(spl-token create-account "$TOKEN_ADDRESS" | grep "Creating account" | awk '{print $3}')
    echo "Initializer Token Account: $INITIALIZER_TOKEN_ACCOUNT"

    # Mint initial tokens to the initializer's account
    spl-token mint "$TOKEN_ADDRESS" $INITIALIZER_AMOUNT "$INITIALIZER_TOKEN_ACCOUNT"
fi

# Create a new roundAccount
solana-keygen new --no-bip39-passphrase -o "$ROUND_KEYPAIR"
ROUND_ACCOUNT=$(solana-keygen pubkey "$ROUND_KEYPAIR")
echo "Round Account: $ROUND_ACCOUNT"

# Save configuration
echo "{
  \"token_address\": \"$TOKEN_ADDRESS\",
  \"initializer_token_account\": \"$INITIALIZER_TOKEN_ACCOUNT\",
  \"round_account\": \"$ROUND_ACCOUNT\"
}" > "$CONFIG_FILE"

# Output important addresses
echo "
Deployment Summary:
-------------------
Program ID: $PROGRAM_ID
Token Address: $TOKEN_ADDRESS
Initializer Token Account: $INITIALIZER_TOKEN_ACCOUNT
Round Account: $ROUND_ACCOUNT
"

# Update React component with new addresses
sed -i.bak "s/const programId = new PublicKey('.*')/const programId = new PublicKey('$PROGRAM_ID')/" ../web/components/round3/InitializeRound.tsx
sed -i.bak "s/const tokenMint = new PublicKey('.*')/const tokenMint = new PublicKey('$TOKEN_ADDRESS')/" ../web/components/round3/InitializeRound.tsx
sed -i.bak "s/const initializerTokenAccount = new PublicKey('.*')/const initializerTokenAccount = new PublicKey('$INITIALIZER_TOKEN_ACCOUNT')/" ../web/components/round3/InitializeRound.tsx
sed -i.bak "s/const roundAccount = new PublicKey('.*')/const roundAccount = new PublicKey('$ROUND_ACCOUNT')/" ../web/components/round3/InitializeRound.tsx
rm ../web/components/round3/InitializeRound.tsx.bak

echo "React component updated with new addresses."

echo "Deployment complete!"