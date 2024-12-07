"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import Navbar from "@/app/components/navbar";
import Footer from "@/app/components/footer";
import P2PChallenge from "@/app/components/challenge/p2pChallenge";

export default function Challenge() {
  const { id } = useParams();
  const [challengeDetails, setChallengeDetails] = useState<any>({});

  const getChallengeDetail = async (id: any) => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/challenge/${id}`
      );
      console.log("Challenge Detail:", res.data);
      setChallengeDetails(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getChallengeDetail(id);
  }, []);

  return (
    <div className="flex w-full  bg-black  justify-center">
      <div className=" h-screen w-full border-[1px] border-[#373737] bg-[#191919] py-4 blur-[50] text-white md:w-[550px] shadow-xl">
        <Navbar />
        <P2PChallenge challengeDetails={challengeDetails} />
        <Footer />
      </div>
    </div>
  );
}
