"use client"; 


import Image from "next/image";
import Welkom from "@/components/Welkom"
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="flex justify-center items-center h-screen">
      <Welkom />
     
    </div>
    
  );
}
