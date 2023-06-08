import MovieAppClient from "./MovieAppClient";

export const revalidate = 60;

const MovieAppPage = async () => {
  // @ts-ignore
  // const movies: Movie[] = res.map(({ account }) =>
  //   Movie.deserialize(account.data)
  // );

  return (
    <main className="flex h-screen flex-col items-center justify-center tracking-widest">
      <h1 className="animate-pulse text-3xl font-bold">Solana Movie App 🎥</h1>
      <MovieAppClient />
    </main>
  );
};

export default MovieAppPage;
