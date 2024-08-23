import * as anchor from '@coral-xyz/anchor';
import { Program } from '@coral-xyz/anchor';
import { Keypair } from '@solana/web3.js';
import { Round3 } from '../target/types/round3';

describe('round3', () => {
  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);
  const payer = provider.wallet as anchor.Wallet;

  const program = anchor.workspace.Round3 as Program<Round3>;

  const round3Keypair = Keypair.generate();

  it('Initialize Round3', async () => {
    await program.methods
      .initialize()
      .accounts({
        round3: round3Keypair.publicKey,
        payer: payer.publicKey,
      })
      .signers([round3Keypair])
      .rpc();

    const currentCount = await program.account.round3.fetch(
      round3Keypair.publicKey
    );

    expect(currentCount.count).toEqual(0);
  });

  it('Increment Round3', async () => {
    await program.methods
      .increment()
      .accounts({ round3: round3Keypair.publicKey })
      .rpc();

    const currentCount = await program.account.round3.fetch(
      round3Keypair.publicKey
    );

    expect(currentCount.count).toEqual(1);
  });

  it('Increment Round3 Again', async () => {
    await program.methods
      .increment()
      .accounts({ round3: round3Keypair.publicKey })
      .rpc();

    const currentCount = await program.account.round3.fetch(
      round3Keypair.publicKey
    );

    expect(currentCount.count).toEqual(2);
  });

  it('Decrement Round3', async () => {
    await program.methods
      .decrement()
      .accounts({ round3: round3Keypair.publicKey })
      .rpc();

    const currentCount = await program.account.round3.fetch(
      round3Keypair.publicKey
    );

    expect(currentCount.count).toEqual(1);
  });

  it('Set round3 value', async () => {
    await program.methods
      .set(42)
      .accounts({ round3: round3Keypair.publicKey })
      .rpc();

    const currentCount = await program.account.round3.fetch(
      round3Keypair.publicKey
    );

    expect(currentCount.count).toEqual(42);
  });

  it('Set close the round3 account', async () => {
    await program.methods
      .close()
      .accounts({
        payer: payer.publicKey,
        round3: round3Keypair.publicKey,
      })
      .rpc();

    // The account should no longer exist, returning null.
    const userAccount = await program.account.round3.fetchNullable(
      round3Keypair.publicKey
    );
    expect(userAccount).toBeNull();
  });
});
