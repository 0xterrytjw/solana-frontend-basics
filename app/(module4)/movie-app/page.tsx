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

const MovieAppPage = async () => {
  const movies = [];

  const movieCard = (title: string, review: string, rating: number) => (
    <Card className="p-4">
      <CardHeader>
        <CardTitle>
          <p className="text-xl font-semibold">{title}</p>
        </CardTitle>
        <CardDescription>Review: {review}</CardDescription>
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

      <section>
        <p className="p-4 font-bold">Movies</p>
        <div className="flex gap-4">
          {movieCard("sharktank", "what a good show!", 5)}
          {movieCard("sharktank1", "what a good show!", 6)}
          {movieCard("sharktank2", "what a good show!", 7)}
        </div>
      </section>
    </main>
  );
};

export default MovieAppPage;
