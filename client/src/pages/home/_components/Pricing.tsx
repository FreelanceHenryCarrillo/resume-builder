import { Button } from "@/components/ui/button";
import { Check} from "lucide-react";
import Footer from "./Footer";

const Pricing = () => {
  return (
    <section
      className="relative h-screen bg-primary-resume text-white overflow-hidden border-none py-8 flex flex-col gap-10 px-10 items-center justify-center"
      id="Pricing"
    >
      {/* Luz difusa detrás */}
      <div className="absolute -inset-[230px] bg-[radial-gradient(circle,rgba(255,255,255,0.1)_0%,rgba(255,255,255,0.1)_0%,transparent_6%)] scale-[8] bottom-0 left-0"></div>
      <div className="text-center flex items-center flex-col gap-8 mb-20">
        <h1 className="text-2xl font-bold md:text-4xl">
          {" "}
          Flexible Plans for Every Need{" "}
        </h1>
        <hr className="bg-white w-40 text-center" />
        <div className="text-gray-400 w-[400px] md:w-[700px]">
          <p>
            Choose the perfect plan tailored to your needs. Whether you're just
            starting or require advanced features, we offer affordable options
            for everyone. Enjoy transparent pricing, no hidden fees, and the
            flexibility to upgrade as your goals grow.
          </p>
        </div>
      </div>

      <div className="z-10 flex flex-col w-full max-w-[900px]   items-center  gap-10 justify-center ">
        <div className="w-[400px] h-[500px] rounded-xl max-w-[400px] bg-white flex text-black flex-col items-center justify-between py-6 shadow-2xl">
          <div className="flex flex-col items-center justify-center gap-5">
            <span className="text-3xl font-bold">Free</span>
            <div className="flex w-full ">
              <span className="font-bold text-xl">$</span>
              <span className="text-5xl">0</span>
              <span className="text-xl self-end">/ mo</span>
            </div>
          </div>
          <div className="flex w-[80%] gap-6 flex-col">
            <span className="flex gap-4 font-semibold">
              Create up to Unspanmited resume <Check size={20} color="green" />
            </span>
            <span className="flex gap-4 font-semibold">
              spanmited Templates <Check size={20} color="green" />{" "}
            </span>
            <span className="flex gap-4 font-semibold">
              Basic Text Editor
              <Check size={20} color="green" />{" "}
            </span>
            <span className="flex gap-4 font-semibold">
              PDF Download <Check size={20} color="green" />
            </span>
            <span className="flex gap-4 font-semibold">
              Advanced design
              <Check size={20} color="green" />{" "}
            </span>
          </div>
          <Button className="w-[80%] bg-primary-resume">Active</Button>
        </div>
      </div>
      <Footer />
    </section>
  );
};

export default Pricing;
