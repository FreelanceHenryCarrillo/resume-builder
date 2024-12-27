import Header from "./_components/Header";
import Hero from "./_components/Hero";
import Pricing from "./_components/Pricing";
import Services from "./_components/Services";

const Home = () => {
  return (
    <main className="w-dvw h-dvh overflow-x-hidden">
      <div className="relative w-full max-w-[1840px] mx-auto h-full flex flex-col justify-center">
        <div className="w-full h-full">
          <Header />
          <Hero />
          <Services />
          <Pricing />
        </div>
      </div>
    </main>
  );
};

export default Home;
