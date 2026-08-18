import Image from "next/image";
import Header from "./Header";
import Hero from "./Hero";
import Features from "./Features";
import Footer from "./Footer";

export default function Home() {
  return (
    <div className="bg-white">
      <Header/>
      <Hero/>
      <Features/>
      <Footer/>
    </div>
  );
}
