import WriteDataClient from "./WriteDataClient";

const WriteDataPage = async () => {
  return (
    <main className="flex h-screen flex-col items-center justify-center tracking-widest">
      <h1 className="animate-pulse text-3xl font-bold">Write data ✍🏻</h1>
      <WriteDataClient />
    </main>
  );
};

export default WriteDataPage;
