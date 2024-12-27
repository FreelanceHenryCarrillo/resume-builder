import { MessageSquareDot } from "lucide-react";
import { Button } from "../ui/button";
import useLogout from "@/hooks/resume/onLogout";

const Header = () => {
 const { onLogout } = useLogout()
  return (
    <header className="w-full h-12 flex  items-center justify-between px-10 shadow-md bg-gray-200">
      <div className=" h-full flex items-center gap-4">
        <img src={"../../public/logo.svg"} alt="logo"  className="h-8 w-8" />
      </div>
      <div className="flex gap-4 items-center justify-center">
        <MessageSquareDot className="cursor-pointer hover:scale-[1.1] text-black" />
        <Button onClick={onLogout}>Logout</Button>
      </div>
    </header>
  );
};

export default Header;
