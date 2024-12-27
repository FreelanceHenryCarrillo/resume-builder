import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import CONSTANST_GOBAL from "@/constants";
import { Button } from "@/components/ui/button";


const Header = () => {
  const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false);

  const menuRef = useRef<HTMLDivElement>(null);

  const handleOutsideClick = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setIsOpenMenu(false);
    }
  };

  useEffect(() => {
    if (isOpenMenu) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpenMenu]);

  return (
    <section className="fixed w-full max-w-[1640px] h-24 z-10 flex justify-between items-center px-20 select-none bg-transparent">
      <div className="font-bold text-2xl">Defined.</div>
      <div className="lg:hidden">
        <Menu
          size={30}
          cursor={"pointer"}
          {...(!isOpenMenu && { onClick: () => setIsOpenMenu(!isOpenMenu) })}
          aria-label="Toggle menu"
        />
      </div>
      <div className="gap-20 hidden lg:flex">
        {CONSTANST_GOBAL.LABELS_HEADER_HOME.map((label) => (
          <a className="cursor-pointer font-regular" key={label.id} href={label.href}>
            {label.title}
          </a>
        ))} 
      </div>

      <Button className="hidden lg:block w-[300px] rounded-[12px] font-bold bg-primary-resume ">Get Started!</Button>
      {isOpenMenu && (
        <div
          ref={menuRef}
          className={cn(
            "fixed top-0 right-0 h-full w-[80%] bg-black z-10 flex flex-col items-center justify-center gap-10  text-white transition-all ease-out duration-300"
          )}
        >
          <X
            className="absolute top-10 right-10 cursor-pointer"
            size={30}
            onClick={() => setIsOpenMenu(!isOpenMenu)}
          />
          {CONSTANST_GOBAL.LABELS_HEADER_HOME.map((label) => (
            <a
              className="cursor-pointer text-3xl"
              key={label.id}
              href={label.href}
              {...(isOpenMenu && { onClick: () => setIsOpenMenu(false) })}
            >
              {label.title.toLocaleUpperCase()}
            </a>
          ))}
        </div>
      )}
    </section>
  );
};

export default Header;
