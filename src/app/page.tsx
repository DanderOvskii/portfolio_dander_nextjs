"use client"; 


import Image from "next/image";
import Welkom from "@/components/Welkom"

export default function Home() {
  return (
    <div className="flex justify-center items-center h-screen">
      <Welkom />
      <div className="relative w-1/2 h-1/2">
        <Image
          src="/undraw_welcome_cats.svg"
          alt="Welcome Cats"
          fill
          style={{ objectFit: "contain" }}
        />
      </div>
    </div>
  );
}
