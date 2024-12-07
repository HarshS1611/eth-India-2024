import Image from "next/image";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import HomePage from "./components/home/home";

export default function Home() {
  return (
    <div className="flex w-full  bg-black  justify-center">
    <div className=" h-screen w-full border-[1px] border-[#373737] bg-[#191919] py-4 blur-[50] text-white md:w-[550px] shadow-xl">
      <Navbar />
     <HomePage />
      <Footer />
    </div>
  </div>
  );
}
