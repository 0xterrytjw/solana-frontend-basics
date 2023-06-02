import ReadDataClient from "./ReadDataClient";

const ReadDataPage = async () => {
  return (
    <main className="flex h-screen flex-col items-center justify-center tracking-widest">
      <h1 className="animate-pulse text-3xl font-bold">Read data 👓</h1>
      <ReadDataClient />
    </main>
  );
};

export default ReadDataPage;
