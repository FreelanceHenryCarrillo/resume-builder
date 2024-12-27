import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section className="relative w-full h-full" id="home">
      {/* Fondo con clipath */}

      <div className="absolute rotate-180 -top-20 -left-20">
        <img src="/FrameCircle.svg" alt="" />
      </div>
      <div className="absolute w-dvw lg:h-full border-none  lg:bg-primary-resume lg:clipath-hero bg-primary-resume  h-48 bottom-0 rounded-tl-[100px] rounded-tr-[100px]"></div>
      <div className="absolute w-full h-full flex items-center justify-center">
        {/* Contenido principal */}
        <div className="w-full h-[80%] flex flex-col justify-center items-center lg:items-start px-4 lg:px-10">
          <div className="w-full max-w-[450px] md:max-w-[600px] lg:max-w-[500px] xl:max-w-[700px] h-full flex flex-col justify-center gap-10  ">
            {/* Texto descriptivo */}
            <div className="flex flex-col gap-4">
              <h1 className="font-bold text-5xl lg:text-5xl text-primary-resume__text xl:text-6xl">
                Crea y Simplifica Herramientas Digitales a tu Alcance
              </h1>
              <p className="mt-4 text-lg text-secundary__span">
                Descubre herramientas innovadoras diseñadas para facilitar tu
                vida digital. Desde crear CVs profesionales hasta gestionar
                firmas electrónicas de manera rápida y segura, ofrecemos
                soluciones prácticas y eficientes. Simplifica tus procesos y
                alcanza tus objetivos con nuestra plataforma integral.
              </p>
            </div>

            {/* Botones */}
            <div className="flex flex-col gap-4 w-full">
              <div className="flex w-full gap-2 md:gap-10">
                <Button className="shadow-xl h-16 text-center flex items-center rounded-xl justify-center bg-primary-resume w-full">
                  <span className="flex items-center gap-4 font-extrabold h-full px-6">
                    Resume Builder
                    <img
                      src="/resumeIcon.png"
                      alt="resumeIcon"
                      className="object-cover h-full w-full"
                    />
                  </span>
                </Button>

                <Button
                  disabled
                  className="shadow-xl relative h-16 text-center flex items-center rounded-xl justify-center bg-primary-resume w-full"
                >
                  <span className="flex items-center gap-4 font-extrabold h-full px-4">
                    Signature Digital
                    <img
                      src="/signatureIcon.svg"
                      alt="signatureIcon"
                      className="object-cover h-full w-full"
                    />
                  </span>
                  <span className="absolute -top-4 left-0 rounded-2xl bg-[#BFDBFE] text-black text-center px-2 py-1">
                    Under Construction
                  </span>
                </Button>
              </div>

              <div>
                <Button className="w-full shadow-xl h-14 bg-primary-resume__white text-black font-bold hover:text-white">
                  Get Started
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Imagen (oculta en móviles) */}
        <div className=" hidden lg:block h-full w-full  ">
          <img
            src="/dashboardResume.png"
            alt="Dashboard Resume"
            className="  rounded-2xl  object-contain h-full"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
