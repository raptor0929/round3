import * as anchor from '@coral-xyz/anchor';
import { Program } from '@coral-xyz/anchor';
import { Keypair, PublicKey } from '@solana/web3.js';
import { Round3 } from '../target/types/round3';
import { TOKEN_PROGRAM_ID, createMint, createAccount, mintTo } from '@solana/spl-token';

describe('round3', () => {
  const provider = anchor.AnchorProvider.local();
  anchor.setProvider(provider);
  const payer = provider.wallet as anchor.Wallet;

  const program = anchor.workspace.Round3 as Program<Round3>;

  const roundKeypair = Keypair.generate();
  let tokenMint: PublicKey;
  let initializerTokenAccount: PublicKey;
  let roundTokenAccount: PublicKey;

  beforeAll(async () => {
    // Create a new token mint
    tokenMint = await createMint(
      provider.connection,
      payer.payer,
      payer.publicKey,
      null,
      6 // 6 decimals
    );

    // Create token accounts
    initializerTokenAccount = await createAccount(
      provider.connection,
      payer.payer,
      tokenMint,
      payer.publicKey
    );

    roundTokenAccount = await createAccount(
      provider.connection,
      payer.payer,
      tokenMint,
      roundKeypair.publicKey
    );

    // Mint tokens to the initializer's account
    await mintTo(
      provider.connection,
      payer.payer,
      tokenMint,
      initializerTokenAccount,
      payer.publicKey,
      5000000 // Mint 5 tokens (assuming 6 decimals)
    );
  });

  it('Initialize Round', async () => {
    const paymentAmount = new anchor.BN(1000000); // 1 token
    const numberOfPlayers = 5;
    const frequencyOfTurns = new anchor.BN(86400); // 1 day in seconds

    try {
      await program.methods
        .initializeRound(paymentAmount, numberOfPlayers, frequencyOfTurns)
        .accounts({
          round: roundKeypair.publicKey,
          initializer: payer.publicKey,
          tokenMint: tokenMint,
          initializerTokenAccount: initializerTokenAccount,
          roundTokenAccount: roundTokenAccount,
          tokenProgram: TOKEN_PROGRAM_ID,
          systemProgram: anchor.web3.SystemProgram.programId,
        })
        .signers([roundKeypair])
        .rpc();

      const roundAccount = await program.account.round.fetch(roundKeypair.publicKey);

      expect(roundAccount.paymentAmount.toNumber()).toEqual(1000000);
      expect(roundAccount.numberOfPlayers).toEqual(5);
      expect(roundAccount.currentIndexOfPlayer).toEqual(0);
      expect(roundAccount.totalAmountLocked.toNumber()).toEqual(5000000); // 5 tokens
      expect(roundAccount.availableSlots).toEqual(4);
      expect(roundAccount.frequencyOfTurns.toNumber()).toEqual(86400);
      expect(roundAccount.status).toEqual({ pending: {} });
      expect(roundAccount.tokenMint.toBase58()).toEqual(tokenMint.toBase58());
      expect(roundAccount.players[0].toBase58()).toEqual(payer.publicKey.toBase58());
      expect(roundAccount.orderOfTurns[0].toBase58()).toEqual(payer.publicKey.toBase58());
    } catch (error) {
      console.error('Detailed error:', error);
      throw error; // Re-throw the error to fail the test
    }
  });
});