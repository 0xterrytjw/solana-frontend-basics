"use client";

import React, { ChangeEvent, useState } from "react";
import {
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
import { Button } from "@/components/ui/button";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import dynamic from "next/dynamic";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";

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
  const [address, setAddress] = useState("");
  const [amount, setAmount] = useState("");

  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();

  const sendSol = async () => {
    if (!connection || !publicKey) {
      return;
    }

    let destinationPublicKey;
    try {
      destinationPublicKey = new PublicKey(address);
    } catch (error) {
      toast.error(`Invalid address: ${error}`);
      return;
    }

    const transaction = new Transaction();

    const instruction = SystemProgram.transfer({
      fromPubkey: publicKey,
      toPubkey: destinationPublicKey,
      lamports: LAMPORTS_PER_SOL * Number(amount),
    });

    transaction.add(instruction);
    sendTransaction(transaction, connection).then((sig) => {
      console.log("TX -> ", sig);
    });
  };

  return (
    <main className="mt-12 w-1/2 p-4">
      <Label htmlFor="address">Solana address</Label>
      <Input
        type="text"
        id="address"
        placeholder="e.g. HN7cABqLq46Es1jh92dQQisAq662SmxELLLsHHe4YWrH"
        className="placeholder:text-gray-600 dark:border-gray-500"
        autoComplete="off"
        value={address}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setAddress(e.target.value)
        }
      />
      <br />
      <Label htmlFor="amount">Amount to send</Label>
      <Input
        type="number"
        id="amount"
        placeholder="e.g. 0.1"
        className="placeholder:text-gray-600 dark:border-gray-500"
        autoComplete="off"
        value={amount}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setAmount(e.target.value)
        }
      />
      <div className="mt-8 flex items-center justify-center gap-x-4">
        <Button onClick={sendSol} disabled={!address || !amount}>
          Send
        </Button>
        <WalletMultiButton className="text-black dark:text-white" />
      </div>
    </main>
  );
};

export default UsingWalletsClient;
