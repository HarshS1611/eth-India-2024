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
    // console.log(
    //   "wefiuwbfiwbfoiuewbfuiwbfiouewbfiouewbfioewubfoeuwifbeiowufbewoiufbwoeiufbeiwo"
    // );
    // console.log("fuwefiuewfuewbfoiuewbf", id);
    try {
      const res = await axios.get(`http://localhost:8001/challenge/${id}`);
      // console.log("Challenge Detail:", res.data);
      setChallengeDetails(res.data);
      // console.log("Challengesadsadasasd Detailss:", res);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getChallengeDetail(id);
  }, []);
  // console.log("chalenge details nepal", challengeDetails);

  return (
    <div className="flex w-full  bg-black  justify-center">
      <div className=" h-screen w-full overflow-y-auto border-[1px] border-[#373737] bg-[#191919] py-4 blur-[50] text-white md:w-[550px] shadow-xl">
        <Navbar />
        <P2PChallenge challengeDetails={challengeDetails} />
        <Footer />
      </div>
      <p>hihih</p>
    </div>
  );
}
