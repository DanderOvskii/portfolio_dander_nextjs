"use client";

import Welkom from "@/components/Welkom"
import AboutMe from "./components/AboutMe";
import Projects from "./components/Projects";

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center ">
      <Welkom />
      <AboutMe />
      <Projects />

    </div>

  );
}
