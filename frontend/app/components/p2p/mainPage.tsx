"use client"
import { useState, useEffect } from "react";

import axios from "axios";
import ModalChallenge from "./ModalChallenge";
import { Button } from "@/components/ui/button"
import ChallengeCard from "./ChallengeCard";


const MainPage = () => {
    const [status, setStatus] = useState("registration");
    const [openModal, setOpenModal] = useState(false);
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
            status: "Active",
            category: "Fitness",
            target: 100,
            targetType: "Pushups",
            amount: 10,
        },
        {
            id: 3,
            challengeName: "Challenge 3",
            status: "Active",
            category: "Fitness",
            target: 100,
            targetType: "Pushups",
            amount: 10,
        },
        {
            id: 4,
            challengeName: "Challenge 4",
            status: "Active",
            category: "Fitness",
            target: 100,
            targetType: "Pushups",
            amount: 10,
        },
       
    ]); 
    const [loading, setLoading] = useState(true); 
    const [inviteCode, setInviteCode] = useState(""); 

    const handleOpen = () => setOpenModal(true);
    const handleClose = () => setOpenModal(false);


    
    return (
        <div className="scroll-auto h-[80vh] overflow-y-auto scrollbar-hide">
            <p className="text-2xl font-bold p-4">P2P</p>

            <div className="flex justify-center">
                <div
                    className="text-center border-[1px] border-[#e9e7e7] bg-[#373737] py-4 blur-[50] w-full mx-2  h-full rounded-lg inline-flex items-center whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-[--background] text-[--muted-foreground] px-4 justify-start text-sm font-normal shadow-none"
                >
                    <input
                        placeholder="Enter Invite Code"
                        value={inviteCode}
                        onChange={(e) => setInviteCode(e.target.value)}
                        className="text-white outline-none w-full bg-transparent"
                    ></input>
                    <div className="flex w-max justify-end">
                        <Button
                        variant={"outline"}
                            className="text-black"
                        >
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
                        <img className="w-15 h-15" src="data:image/webp;base64,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" />


                    </div>
                    <p className="flex text-center ml-4 mt-1">Dare A Friend</p>
                </div>
                <div
                    onClick={handleOpen}
                    className=" cursor-pointer relative w-full text-center"
                >
                    <div className="flex flex-col shadow-xl  bg-[#373737] blur-[50] h-full rounded-xl w-full text-xs  font-thunder tracking-widest font-bold text-white items-center justify-center gap-2">
                        <img className="w-15 h-15" src="data:image/webp;base64,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" />

                    </div>
                    <p className="flex text-center  ml-5 mt-1">Vs A Friend</p>
                </div>
                <div
                    onClick={handleOpen}
                    className=" cursor-pointer relative w-full text-center"
                >
                    <div className="flex flex-col shadow-xl  bg-[#373737] blur-[50] h-full rounded-xl w-full text-xs  font-thunder tracking-widest font-bold text-white items-center justify-center gap-2">
                        <img className="w-15 h-15" src="data:image/webp;base64,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" />


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

            <div className="absolute bottom-20 right-2 md:right-[18%] lg:right-[28%] xl:right-[36%]">
                <button
                    onClick={handleOpen}
                    className="border-[1px] border-[#777474] bg-[#373737] py-3 px-6 blur-[50] rounded-full p-2 text-lg font-bold lg:px-6"
                >
                    Create
                </button>
            </div>

            <ModalChallenge open={openModal} handleClose={handleClose} />
        </div>
    )
}

export default MainPage;