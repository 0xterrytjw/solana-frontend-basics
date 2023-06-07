import CustomLink from "@/components/CustomLink";
import { MdViewModule } from "react-icons/md";

const HomePage = async () => {
  const _module = (moduleNum: string, url: string) => (
    <CustomLink href={url} className="underline">
      <MdViewModule className="mr-2" />
      <span>Module {moduleNum}</span>
    </CustomLink>
  );

  return (
    <main className="flex h-screen flex-col items-center justify-center p-8 tracking-widest">
      <h1 className="animate-pulse text-3xl font-bold">Solana Dev</h1>
      <section className="p-8">
        {_module("1", "/read-data")}
        {_module("2", "/write-data")}
        {_module("3", "/using-wallets")}
        {_module("4", "/movie-app")}
      </section>
    </main>
  );
};

export default HomePage;
