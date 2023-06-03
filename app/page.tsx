import CustomLink from "@/components/CustomLink";
import { MdViewModule } from "react-icons/md";

const HomePage = async () => {
  const module = (moduleNum: string, url: string) => (
    <CustomLink href={url} className="underline">
      <MdViewModule className="mr-2" />
      <span>Module {moduleNum}</span>
    </CustomLink>
  );

  return (
    <main className="flex h-screen flex-col items-center justify-center p-8 tracking-widest">
      <h1 className="animate-pulse text-3xl font-bold">Solana Dev</h1>
      <section className="p-8">
        {module("1", "/read-data")}
        {module("2", "/write-data")}
        {module("3", "/using-wallets")}
      </section>
    </main>
  );
};

export default HomePage;
