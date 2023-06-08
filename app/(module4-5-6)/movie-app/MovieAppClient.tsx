"use client";

import dynamic from "next/dynamic";
import React, { ChangeEvent, useEffect, useState } from "react";
import MovieForm from "./MovieForm";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Movie } from "@/utils/models";
import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";
import { MOVIE_REVIEW_PROGRAM_ID } from "@/utils/config";
import { MovieCoordinator } from "@/utils/MovieCoordinator";
import useSWR from "swr";
import { Input } from "@/components/ui/input";

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
  const connection = new Connection(clusterApiUrl("devnet"));
  const [movies, setMovies] = useState<Movie[]>([]);
  const [search, setSearch] = useState("c");
  const [page, setPage] = useState(1);
  const MOVIES_PER_PAGE = 3;

  const moviesFetcher = async (
    connection: Connection,
    page: number,
    perPage: number
  ) => {
    console.log("hello");
    console.log("connection -> ", connection);
    console.log("page ->", page);
    console.log("perPage -> ", perPage);
    const movies: Movie[] = await MovieCoordinator.fetchPage(
      connection,
      page,
      perPage,
      search,
      search !== ""
    );
    console.log("world");

    return movies;
  };

  // const { data, error, isLoading } = useSWR(
  //   [connection, page, MOVIES_PER_PAGE],
  //   moviesFetcher
  // );

  useEffect(() => {
    MovieCoordinator.fetchPage(connection, page, 2, search, search !== "").then(
      setMovies
    );
  }, [page, search]);

  console.log("movies -> ", movies);

  const movieCard = (
    i: number,
    title: string,
    rating: number,
    description: string
  ) => (
    <Card className="w-72 p-4" key={i}>
      <CardHeader>
        <CardTitle>
          <p className="text-xl font-semibold">{title}</p>
        </CardTitle>
        <CardDescription>Description: {description}</CardDescription>
      </CardHeader>
      <CardFooter>
        <p>Rating score: {rating}</p>
      </CardFooter>
    </Card>
  );

  return (
    <main className="mt-12 w-1/2 p-4">
      <MovieForm />
      <div className="mt-8 flex justify-center">
        <WalletMultiButton className="bg-gray-300 text-black dark:text-white" />
      </div>
      <Input
        type="text"
        placeholder="Search..."
        className="placeholder:text-gray-600 dark:border-gray-500"
        autoComplete="off"
        value={search}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setSearch(e.target.value)
        }
      />
      <h2 className="mt-12 px-8 py-2 text-2xl font-bold">Movies</h2>
      <section className="w-full overflow-x-auto p-8">
        <div className="flex flex-wrap gap-4">
          {movies.map((movie, i) =>
            movieCard(i, movie.title, movie.rating, movie.description)
          )}
        </div>
      </section>
    </main>
  );
};

export default MovieAppClient;
