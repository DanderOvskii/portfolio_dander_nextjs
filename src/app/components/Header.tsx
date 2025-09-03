"use client";

import React from "react";
import { logoutUser } from "@/utils/api";
import { genericErrors } from "@/utils/constants";
import Image from "next/image";

const Header = () => {
  const handleLogout = () => {
    try {
      logoutUser();
    } catch (error) {
      alert((error as Error).message || genericErrors.logoutFailed);
    }
  };

  return (
    <header className="py-4 flex justify-between items-center">
      <div className="w-1/2 flex justify-between items-center gap-[50px]">
        <a className="no-underline text-just-white text-subtitle transition-all ease-in-out duration-200 hover:text-header-color " href="#top"><p className="transition-all duration-500 hover:tracking-[10px]">home</p></a>
        <a className="no-underline text-just-white text-subtitle transition-all ease-in-out duration-200 hover:text-header-color " href="#about"><p>about</p></a>
        <a className="no-underline text-just-white text-subtitle transition-all ease-in-out duration-200 hover:text-header-color " href="#projects"><p>projects</p></a>
      </div>
      <nav >
        <div className="h-[10vh] flex justify-end items-center fixed aspect-[1.1] mr-align-left right-0">
          <Image className="h-[5vh] transition-all duration-500 invert"
            src="icons/bars-solid (1).svg"
            alt="Menu" fill
             />
        </div>
      </nav>
    </header>
  );
};

export default Header;
