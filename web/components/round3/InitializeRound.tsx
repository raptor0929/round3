'use client';
import React, { useState } from 'react';
import { useAnchorWallet } from '@solana/wallet-adapter-react';
import { Connection, PublicKey, Keypair } from '@solana/web3.js';
import { Program, AnchorProvider, web3, BN } from '@coral-xyz/anchor';
import { Round3, Round3IDL } from '@round3/anchor';
import { TOKEN_PROGRAM_ID, createAccount, createAssociatedTokenAccount } from '@solana/spl-token';
// import { Round3 } from './round3'; // Make sure to import your IDL
// import idl from './round3.json'; // Your IDL file

const InitializeRoundComponent = () => {
  const [paymentAmount, setPaymentAmount] = useState('');
  const [numberOfPlayers, setNumberOfPlayers] = useState('');
  const [frequencyOfTurns, setFrequencyOfTurns] = useState('');
  const wallet = useAnchorWallet();

  const initializeRound = async () => {
    if (!wallet) {
      alert('Please connect your wallet');
      return;
    }

    const connection = new Connection('https://api.devnet.solana.com');
    const provider = new AnchorProvider(connection, wallet, {});
    const programId = new PublicKey('5BFX4Zoj2NwRB6MheKbo9TpvTpQvocEJkPbWk8PQFwpc');
    const program = new Program(Round3IDL, programId, provider);

    const roundKeypair = Keypair.generate();
    const tokenMint = new PublicKey('4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU');
    const initializerTokenAccount = new PublicKey('Hbb9BJBboJSJJQKqTwa86AB4EQu4sS948Y453rgAMk4h');
    const roundTokenAccount = new PublicKey('4PuburbozaFjxiXQsGjGqvG2mAsx5fPQGbPZJvdDoiXY');

    try {
      await program.methods
        .initializeRound(
          new BN(parseFloat(paymentAmount) * 1e6), // Convert to lamports
          parseInt(numberOfPlayers),
          new BN(parseInt(frequencyOfTurns))
        )
        .accounts({
          round: roundKeypair.publicKey,
          initializer: wallet.publicKey,
          tokenMint: tokenMint,
          initializerTokenAccount: initializerTokenAccount,
          roundTokenAccount: roundTokenAccount,
          tokenProgram: TOKEN_PROGRAM_ID,
          systemProgram: web3.SystemProgram.programId,
        })
        .signers([roundKeypair])
        .rpc().catch(e => console.log(e));
        console.log('Success!!! ', roundTokenAccount);

    //   alert('Round initialized successfully!');

    } catch (error) {
      console.error('Error:', error);
      alert('Failed to initialize round');
    }
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">Initialize Round</h2>
      <input
        type="text"
        placeholder="Payment Amount"
        value={paymentAmount}
        onChange={(e) => setPaymentAmount(e.target.value)}
        className="w-full p-2 mb-2 border rounded"
      />
      <input
        type="number"
        placeholder="Number of Players"
        value={numberOfPlayers}
        onChange={(e) => setNumberOfPlayers(e.target.value)}
        className="w-full p-2 mb-2 border rounded"
      />
      <input
        type="number"
        placeholder="Frequency of Turns (seconds)"
        value={frequencyOfTurns}
        onChange={(e) => setFrequencyOfTurns(e.target.value)}
        className="w-full p-2 mb-2 border rounded"
      />
      <button
        onClick={initializeRound}
        className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Initialize Round
      </button>
    </div>
  );
};

export default InitializeRoundComponent;