import { Facebook, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="absolute  bottom-10 w-full bg-[#242424] h-20 flex justify-center items-center ">
      <div className="max-w-[1640px] w-full flex justify-between px-10">
        <div className="font-bold text-2xl">Defined.</div>
        <div className=" hidden gap-6 cursor-pointer h-full items-center justify-center md:flex">
          <Facebook color="#b9b6b6" size={20} />
          <Instagram color="#b9b6b6" size={20} />
          <Linkedin color="#b9b6b6" size={20} />
        </div>
        <div className="text-[10px] flex flex-col gap-2 text-gray-400 text-center ">
          <span>2024 Your Company Name. All rights reserved.</span>
          <hr className="bg-gray-600 w-full" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
