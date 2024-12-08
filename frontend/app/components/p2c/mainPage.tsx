"use client";
import { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa6";

import axios from "axios";
import { Button } from "@/components/ui/button";
import ChallengeCard from "./ChallengeCard";

const CircularProgress = ({ percentages }: { percentages: number[] }) => {
  const baseRadius = 35;
  const circumference = 2 * Math.PI * baseRadius;

  return (
    <div className="flex flex-col gap-4 relative items-center justify-start">
      <p className="text-sm">Activity Ring:</p>
      <svg className="transform w-20 h-20">
        {percentages.map((percentage, index) => {
          const radius = baseRadius - index * 9;
          const strokeDashoffset =
            circumference - (percentage / 100) * circumference;
          const colors = ["text-red-700", "text-green-500", "text-blue-500"];
          return (
            <circle
              key={index}
              className={colors[index]}
              strokeWidth="8"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              stroke="currentColor"
              fill="transparent"
              r={radius}
              cx="40"
              cy="40"
            />
          );
        })}
      </svg>
    </div>
  );
};

const MainPage = () => {
  const [challenges, setChallenges] = useState([
    {
      id: 1,
      challengeName: "Challenge 1",
      status: "Active",
      category: "Fitness",
      target: 100,
      targetType: "Pushups",
      amount: 10,
    },
    {
      id: 2,
      challengeName: "Challenge 2",
      status: "Done",
      category: "Fitness",
      target: 100,
      targetType: "Pushups",
      amount: 10,
    },
  ]);
  const getP2PChallenges = async () => {
    try {
      const challengesResponse = await axios.get(
        `http://localhost:3001/p2cchallenges`
      );
      setChallenges(challengesResponse.data);
    } catch (error) {
      console.log("Error:");
      setLoading(false);
    }
  };
  console.log("Challenges:", challenges);

  const [status, setStatus] = useState("registration");
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [inviteCode, setInviteCode] = useState("");

  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);

  useEffect(() => {
    getP2PChallenges();
  }, []);

  return (
    <div className="scroll-auto h-[80vh] overflow-y-auto scrollbar-hide">
      <p className="text-2xl font-bold p-4">P2C</p>

      <div>
        <div className="relative bg-[#373737] py-4 blur-[50] mx-auto w-96 h-full rounded-xl shadow-2xl">
          <div className="flex w-max ml-10 gap-10 text-lg font-thunder tracking-widest font-bold text-white items-center justify-center">
            <CircularProgress percentages={[85, 60, 30]} />

            <div className="font-light mt-5 text-md">
              <p>Move</p>
              <p>Exercise</p>
              <p>Stand</p>
            </div>
          </div>
        </div>
        <div className="flex mt-5">
          <div className="relative bg-[#373737] py-4 blur-[50] mx-auto w-44 h-full rounded-xl shadow-2xl">
            <div className="flex w-full gap-10 text-lg font-thunder tracking-widest font-bold text-white items-center justify-center">
              <div className="font-light text-md">
                <p>Step Count:</p>
                <p className="text-4xl font-bold text-green-500">400</p>
              </div>
            </div>
          </div>
          <div className="relative bg-[#373737] py-4 blur-[50] mx-auto w-44 h-full rounded-xl shadow-2xl">
            <div className="flex w-full gap-10 text-lg font-thunder tracking-widest font-bold text-white items-center justify-center">
              <div className="font-light text-md">
                <p>Step Distance:</p>
                <p className="text-4xl font-bold text-green-500">50 Km</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2 my-5 px-4">
        <p className="text-2xl font-bold">Daily Streak</p>
        {loading && challenges.length < 0 ? (
          <p className="text-center text-white">Loading challenges...</p>
        ) : challenges.length > 0 ? (
          challenges.map((challenge) => (
            <ChallengeCard key={challenge.id} challenge={challenge} />
          ))
        ) : (
          <p className="text-center text-white">No challenges available.</p>
        )}
      </div>
    </div>
  );
};

export default MainPage;
