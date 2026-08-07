"use client";

import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Teachings } from "@/components/Teachings";
import { Begampura } from "@/components/Begampura";
import { Raags } from "@/components/Raags";
import { Events } from "@/components/Events";
import { ELibrary } from "@/components/ELibrary";
import { Gallery } from "@/components/Gallery";
import { Connect } from "@/components/Connect";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Teachings />
      <Begampura />
      <Raags />
      <Events />
      <ELibrary />
      <Gallery />
      <Connect />
    </>
  );
}
