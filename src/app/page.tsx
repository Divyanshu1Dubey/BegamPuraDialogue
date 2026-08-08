"use client";

import { Hero } from "@/components/Hero";
import { HomeAboutPreview } from "@/components/previews/HomeAboutPreview";
import { HomeTeachingsPreview } from "@/components/previews/HomeTeachingsPreview";
import { HomeBegampuraPreview } from "@/components/previews/HomeBegampuraPreview";
import { HomeRaagsPreview } from "@/components/previews/HomeRaagsPreview";
import { HomeEventsPreview } from "@/components/previews/HomeEventsPreview";
import { HomeLibraryPreview } from "@/components/previews/HomeLibraryPreview";
import { HomeGalleryPreview } from "@/components/previews/HomeGalleryPreview";
import { HomeConnectPreview } from "@/components/previews/HomeConnectPreview";

export default function Home() {
  return (
    <>
      <Hero />
      <HomeAboutPreview />
      <HomeTeachingsPreview />
      <HomeBegampuraPreview />
      <HomeRaagsPreview />
      <HomeEventsPreview />
      <HomeLibraryPreview />
      <HomeGalleryPreview />
      <HomeConnectPreview />
    </>
  );
}
