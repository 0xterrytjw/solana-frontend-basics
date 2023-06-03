import UsingWalletsClient from "./UsingWalletsClient";

const UsingWalletsPage = async () => {
  return (
    <main className="flex h-screen flex-col items-center justify-center tracking-widest">
      <h1 className="animate-pulse text-3xl font-bold">Using Wallets 👛</h1>
      <UsingWalletsClient />
    </main>
  );
};

export default UsingWalletsPage;
