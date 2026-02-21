import Carousel from "@/components/Carousel";
import Hero from "@/components/Hero";
import ServiceBoard from "@/components/Image_Board";
import Achievements from "@/components/Achievements";
import Image from "next/image";
import Features from "@/components/Feature";

export default function Home() {
  return (
    <>
    <Carousel/>
    <Hero/>
    <ServiceBoard/>
    <Achievements/>
    <Features/>
    </>
  );
}
