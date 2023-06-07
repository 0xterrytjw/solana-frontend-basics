import { Movie } from "@/utils/models";
import MovieAppClient from "./MovieAppClient";
import MovieForm from "./MovieForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";
import { MOVIE_REVIEW_PROGRAM_ID } from "@/utils/config";

export const revalidate = false;

const MovieAppPage = async () => {
  const connection = new Connection(clusterApiUrl("devnet"));
  const res = await connection.getProgramAccounts(
    new PublicKey(MOVIE_REVIEW_PROGRAM_ID)
  );
  // @ts-ignore
  const movies: Movie[] = res.map(({ account }) =>
    Movie.deserialize(account.data)
  );

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
    <main className="flex h-screen flex-col items-center justify-center tracking-widest">
      <h1 className="animate-pulse text-3xl font-bold">Solana Movie App 🎥</h1>
      <MovieAppClient />

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

export default MovieAppPage;
