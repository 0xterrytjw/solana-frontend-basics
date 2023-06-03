"use client";

import React from "react";
import * as web3 from "@solana/web3.js";
import { Button } from "@/components/ui/button";

const WriteDataClient = () => {
  const initializeKeypair = (): web3.Keypair => {
    const secret = JSON.parse(
      process.env.NEXT_PUBLIC_PRIVATE_KEY ?? ""
    ) as number[]; // parse the PRIVATE_KEY environment variable as number[]
    const secretKey = Uint8Array.from(secret); // initialize a Uint8Array
    const keypairFromSecretKey = web3.Keypair.fromSecretKey(secretKey); // initialize and return a Keypair using that Uint8Array
    return keypairFromSecretKey;
  };

  const pingProgram = async () => {
    const connection = new web3.Connection(web3.clusterApiUrl("devnet"));

    // 1. Create a TX
    const transaction = new web3.Transaction();

    // 2. Create an instruction
    const programId = new web3.PublicKey(
      process.env.NEXT_PUBLIC_PROGRAM_ADDRESS!
    );
    const programDataPubKey = new web3.PublicKey(
      process.env.NEXT_PUBLIC_PROGRAM_DATA_ADDRESS!
    );
    const instruction = new web3.TransactionInstruction({
      keys: [
        {
          pubkey: programDataPubKey,
          isSigner: false,
          isWritable: true,
        },
      ],
      programId,
    });
    const transferInstruction = web3.SystemProgram.transfer({
      fromPubkey: initializeKeypair().publicKey,
      toPubkey: programDataPubKey,
      lamports: web3.LAMPORTS_PER_SOL / 10, // 0.1 SOL
    });

    // 3. Add the instruction to the TX
    transaction.add(instruction);
    transaction.add(transferInstruction);

    // 4. Sign and send the TX
    const payer = initializeKeypair();
    console.log("Sending transaction...");
    const signature = await web3.sendAndConfirmTransaction(
      connection,
      transaction,
      [payer]
    );

    console.log("Signature -> ", signature);
  };

  return (
    <main className="mt-12 w-1/2 p-4">
      <div className="flex justify-center">
        <Button onClick={pingProgram}>Ping</Button>
      </div>
    </main>
  );
};

export default WriteDataClient;
