"use client";

import React, { ChangeEvent, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import * as web3 from "@solana/web3.js";
import toast from "react-hot-toast";

const ReadDataClient = () => {
  const [address, setAddress] = useState("");
  const [balance, setBalance] = useState(0); // balance denominated in SOL
  const [isExecutable, setIsExecutable] = useState(false); // balance denominated in SOL

  const checkBalance = async () => {
    if (!address) {
      alert(`Please enter an address!`);
      return;
    }

    try {
      const key = new web3.PublicKey(address);
      const connection = new web3.Connection(web3.clusterApiUrl("devnet"));
      const bal = await connection.getBalance(key);
      setBalance(bal / web3.LAMPORTS_PER_SOL);

      const account = await connection.getAccountInfo(key);
      setIsExecutable(account?.executable || false);

      toast.success("Check balance success!");
    } catch (error) {
      setBalance(0);
      toast.error(`${error}, Please enter a valid address!`);
    }
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

      <div className="mt-8 flex justify-center">
        <Button onClick={checkBalance}>Check balance</Button>
      </div>

      <div className="mt-4 p-4">
        <p className="rounded-xl text-center">Balance: {balance}</p>
        <p className="rounded-xl text-center">
          Executable: {isExecutable ? "Yes" : "No"}
        </p>
      </div>
    </main>
  );
};

export default ReadDataClient;
