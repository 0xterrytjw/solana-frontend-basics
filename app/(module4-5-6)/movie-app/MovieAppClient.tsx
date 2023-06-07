"use client";

import dynamic from "next/dynamic";
import React from "react";
import MovieForm from "./MovieForm";
const WalletMultiButton = dynamic(
  () =>
    import("@solana/wallet-adapter-react-ui").then(
      (mod) => mod.WalletMultiButton
    ),
  { ssr: false, loading: () => <p>wallet button loading...</p> }
);

type MovieAppClientProps = {
  // movie: Movie;
};
const MovieAppClient = () => {
  return (
    <main className="mt-12 w-1/2 p-4">
      <MovieForm />
      <div className="mt-8 flex justify-center">
        <WalletMultiButton className="bg-gray-300 text-black dark:text-white" />
      </div>
    </main>
  );
};

export default MovieAppClient;
