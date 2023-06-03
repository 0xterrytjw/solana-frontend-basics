"use client";

import React from "react";
import * as web3 from "@solana/web3.js";
import { Button } from "@/components/ui/button";
// import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import dynamic from "next/dynamic";

// Use of next/dynamic is needed because the @solana/wallet-adapter-react-ui library likely contains
// components that have browser-specific code, which is not executed on the server when Next.js does
// server-side rendering. If the components change their rendered output after being mounted on the
// client due to this browser-specific code, it could lead to errors.
// With this modification, the WalletMultiButton component will only be imported and rendered on the client,
// avoiding the server/client HTML mismatch issue. Note that this will cause the WalletMultiButton
// component to be rendered with a bit of a delay since it will only start loading once the JavaScript for
// the page starts executing on the client.
const WalletMultiButton = dynamic(
  () =>
    import("@solana/wallet-adapter-react-ui").then(
      (mod) => mod.WalletMultiButton
    ),
  { ssr: false, loading: () => <p>wallet button loading...</p> }
);

const UsingWalletsClient = () => {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();

  const ping = async () => {
    if (!connection || !publicKey) {
      return;
    }

    const programId = new web3.PublicKey(
      process.env.NEXT_PUBLIC_PROGRAM_ADDRESS!
    );
    const programDataAccount = new web3.PublicKey(
      process.env.NEXT_PUBLIC_PROGRAM_DATA_ADDRESS!
    );
    const transaction = new web3.Transaction();

    const instruction = new web3.TransactionInstruction({
      keys: [
        {
          pubkey: programDataAccount,
          isSigner: false,
          isWritable: true,
        },
      ],
      programId,
    });

    transaction.add(instruction);
    sendTransaction(transaction, connection).then((sig) => {
      console.log(sig);
    });
  };

  return (
    <main className="mt-12 w-1/2 p-4">
      <div className="flex items-center justify-center gap-x-4">
        <Button onClick={ping}>Ping</Button>
        <WalletMultiButton className="text-black dark:text-white" />
      </div>
    </main>
  );
};

export default UsingWalletsClient;
