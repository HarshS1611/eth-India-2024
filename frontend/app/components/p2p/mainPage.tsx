"use client";
import { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa6";

import axios from "axios";
import ModalChallenge from "./ModalChallenge";
import { Button } from "@/components/ui/button";
import ChallengeCard from "./ChallengeCard";

interface ChallengeProps {
  category: string;
  challengeName: string;
  target: number;
  targetType: string;
  id: string;
  amount: number;
}

const MainPage = () => {
  const [status, setStatus] = useState("registration");
  const [openModal, setOpenModal] = useState(false);
  const [challenges, setChallenges] = useState<ChallengeProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [inviteCode, setInviteCode] = useState("");

  const getAllChallenges = async () => {
    try {
      // First check the bucket
      const newBucket = "newbucket";
      console.log(`${process.env.NEXT_PUBLIC_API_URL}/buckets/${newBucket}`);
      const bucketResponse = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/buckets/${newBucket}`
      );

      // If bucket check is successful, proceed to get challenges
      console.log("Bucket Response:", bucketResponse);
      if (bucketResponse.data.success === true) {
        const challengesResponse = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/getallchallenges`
        );
        setChallenges(challengesResponse.data);
      }

      setLoading(false);
    } catch (error) {
      console.log("Error:");
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllChallenges();
  }, []);

  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);

  return (
    <div className="scroll-auto h-[80vh] overflow-y-auto scrollbar-hide">
      <p className="text-2xl font-bold p-4">P2P</p>

      <div className="flex justify-center">
        <div className="text-center border-[1px] border-[#e9e7e7] bg-[#373737] py-4 blur-[50] w-full mx-2  h-full rounded-lg inline-flex items-center whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-[--background] text-[--muted-foreground] px-4 justify-start text-sm font-normal shadow-none">
          <input
            placeholder="Enter Invite Code"
            value={inviteCode}
            onChange={(e) => setInviteCode(e.target.value)}
            className="text-white outline-none w-full bg-transparent"
          ></input>
          <div className="flex w-max justify-end">
            <Button variant={"outline"} className="text-black rounded-full">
              Join
            </Button>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2 mx-3 my-10 mb-16">
        <div
          onClick={handleOpen}
          className=" cursor-pointer relative w-full text-center"
        >
          <div className="flex flex-col shadow-xl  bg-[#373737] blur-[50] h-full rounded-xl w-full text-xs  font-thunder tracking-widest font-bold text-white items-center justify-center gap-2">
            <img className="w-12 h-12" src="/images/dare.png" />
          </div>
          <p className="flex text-center ml-4 mt-1">Dare A Friend</p>
        </div>
        <div
          onClick={handleOpen}
          className=" cursor-pointer relative w-full text-center"
        >
          <div className="flex flex-col shadow-xl  bg-[#373737] blur-[50] h-full rounded-xl w-full text-xs  font-thunder tracking-widest font-bold text-white items-center justify-center gap-2">
            <img className="w-12 h-12" src="/images/vs.png" />
          </div>
          <p className="flex text-center  ml-5 mt-1">Vs A Friend</p>
        </div>
        <div
          onClick={handleOpen}
          className=" cursor-pointer relative w-full text-center"
        >
          <div className="flex flex-col shadow-xl  bg-[#373737] blur-[50] h-full rounded-xl w-full text-xs  font-thunder tracking-widest font-bold text-white items-center justify-center gap-2">
            <img className="w-12 h-12" src="/images/multi.png" />
          </div>
          <p className="flex text-center ml-6 mt-1">Multiplayer</p>
        </div>
      </div>

      <div className="flex gap-5 my-10 px-4">
        <a
          href={"/"}
          className="relative bg-[#373737] py-4 blur-[50]] w-full h-full rounded-xl shadow-2xl"
        >
          <div className="flex flex-col w-full  text-lg font-thunder tracking-widest font-bold text-white items-center justify-center">
            <img className="w-10 h-10" src="/images/bet.png" />
            My Sidebets
          </div>
        </a>
        <a
          href={"/"}
          className="relative bg-[#373737] py-4 blur-[50]] w-full h-full rounded-xl shadow-2xl"
        >
          <div className="flex flex-col w-full  text-lg font-thunder tracking-widest font-bold text-white items-center justify-center">
            <img className="w-10 h-10" src="/images/struggle.png" />
            My Challenges
          </div>
        </a>
      </div>

      <div className="flex flex-col gap-2 my-5 px-4">
        <p className="text-2xl font-bold">Trending Now</p>
        {loading && challenges?.length < 0 ? (
          <p className="text-center text-white">Loading challenges...</p>
        ) : challenges.length > 0 ? (
          challenges.map((challenge) => (
            <ChallengeCard key={challenge.id} challenge={challenge} />
          ))
        ) : (
          <p className="text-center text-white">No challenges available.</p>
        )}
      </div>

      <div className="absolute bottom-20 right-2 md:right-[18%] lg:right-[28%] xl:right-[36%]">
        <Button
          variant={"secondary"}
          onClick={handleOpen}
          className="text-black font-bold rounded-full text-lg"
          size={"lg"}
        >
          Create
          <FaPlus className="" />
        </Button>
      </div>

      <ModalChallenge open={openModal} handleClose={handleClose} />
    </div>
  );
};

export default MainPage;
