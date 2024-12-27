import { Button } from "@/components/ui/button";

const Services = () => {
  return (
    <section
      className="relative h-screen bg-primary-resume text-white overflow-hidden border-none py-8 flex flex-col gap-10 px-10 items-center justify-center"
      id="services"
    >
      <div className="absolute top-20 -left-40 rotate-90 opacity-20">
        <img src="/FrameCircle.svg" alt="" />
      </div>
      {/* Luz difusa detrás */}
      <div className="absolute -inset-[200px] bg-[radial-gradient(circle,rgba(255,255,255,0.1)_0%,rgba(255,255,255,0.1)_0%,transparent_6%)] scale-[8] bottom-0 left-0"></div>
      <div className="text-center flex items-center flex-col gap-8 mb-20">
        <h1 className="text-4xl font-bold"> Services for Every </h1>
        <hr className="bg-white w-40 text-center" />
        <div className="text-gray-400 w-[400px]">
          <p>
            Choose the perfect plan tailored to your needs. Whether you're just
            starting or require advanced features, we offer affordabl
          </p>
        </div>
      </div>

      <div className="z-10 flex flex-col w-full max-w-[900px]  items-center  gap-10 justify-center">
        <div className="flex w-full items-center justify-between  gap-4">
          <h3 className="text-xl font-bold w-64  text-center ">
            Resume Builder
          </h3>
          <hr className="bg-white w-full text-center h-2 rounded-2xl" />
          <Button className="w-64 bg-primary-resume rounded-xl">
            Get Started
          </Button>
        </div>
        <div className="w-full h-full border-[20px] rounded-xl">
          <img src="/dashboardResume.png" alt="" className="object-cover" />
        </div>
      </div>
    </section>
  );
};

export default Services;
