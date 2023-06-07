"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import * as web3 from "@solana/web3.js";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { Movie } from "@/utils/models";

const MOVIE_REVIEW_PROGRAM_ID = "CenYq6bDRB7p73EjsPEpiYN7uveyPUTdXkDkgUduboaN";

type FormProps = {};
const MovieForm = () => {
  const [title, setTitle] = useState("");
  const [rating, setRating] = useState("");
  const [description, setDescription] = useState("");
  const isIncompleteForm = !title || !description || !rating; // derived state

  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();

  const handleSubmit = async () => {
    const movie = new Movie(title, Number(rating), description);
    handleTransactionSubmit(movie);
  };

  const handleTransactionSubmit = async (movie: Movie) => {
    if (!publicKey) {
      alert("Please connect your wallet!");
      return;
    }

    const buffer = movie.serialize();
    const transaction = new web3.Transaction();

    const [pda] = await web3.PublicKey.findProgramAddress(
      [publicKey.toBuffer(), new TextEncoder().encode(movie.title)],
      new web3.PublicKey(MOVIE_REVIEW_PROGRAM_ID)
    );

    const instruction = new web3.TransactionInstruction({
      keys: [
        {
          pubkey: publicKey,
          isSigner: true,
          isWritable: false,
        },
        {
          pubkey: pda,
          isSigner: false,
          isWritable: true,
        },
        {
          pubkey: web3.SystemProgram.programId,
          isSigner: false,
          isWritable: false,
        },
      ],
      data: buffer,
      programId: new web3.PublicKey(MOVIE_REVIEW_PROGRAM_ID),
    });

    transaction.add(instruction);

    try {
      let txid = await sendTransaction(transaction, connection);
      console.log(
        `Transaction submitted: https://explorer.solana.com/tx/${txid}?cluster=devnet`
      );
    } catch (e) {
      alert(JSON.stringify(e));
    }
  };

  return (
    <main className="mt-4 flex w-full flex-col items-center space-y-4">
      <h2 className="text-xl font-semibold">Movie Form</h2>
      <div className="grid w-full max-w-lg items-center gap-1.5">
        <Label htmlFor="title">Movie title</Label>
        <Input
          type="text"
          id="title"
          placeholder="Enter title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="grid w-full max-w-lg items-center gap-1.5">
        <Label htmlFor="review">Review</Label>
        <Input
          type="text"
          id="review"
          placeholder="Write a review..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className="grid w-full max-w-lg items-center gap-1.5">
        <Label htmlFor="rating">Rating</Label>
        <Input
          type="number"
          id="rating"
          placeholder="e.g. 5"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        />
      </div>

      <div className="mt-8">
        <Button onClick={handleSubmit} disabled={isIncompleteForm}>
          Submit
        </Button>
      </div>
    </main>
  );
};

export default MovieForm;
