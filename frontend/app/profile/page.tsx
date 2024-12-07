
"use client";
import ProfileImg from "../../assets/profile.webp";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Footer from "../components/footer";
import Navbar from "../components/navbar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"


export default function Profile() {

    const [userDetails, setUserDetails] = useState(null);
    const [portfolioData, setPortfolioData] = useState(null);
    const [wallets, setWallets] = useState(null);
    const [error, setError] = useState(null);
    const [activeSection, setActiveSection] = useState(null);


    return (
        <div className="flex w-full  bg-black  justify-center">
            <div className=" h-screen w-full border-[1px] border-[#373737] bg-[#191919] py-4 blur-[50] text-white md:w-[550px] shadow-xl">
                <Navbar />
                <div className="px-4 scroll-auto h-[80vh] overflow-y-auto scrollbar-hide">
                    <p className="text-2xl font-bold">Profile</p>

                    <div className="flex my-3 justify-center">
                        <Avatar className="h-40 w-40">
                            <AvatarImage  src="https://github.com/shadcn.png" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                    </div>
                    <div className="flex my-3 text-lg justify-center">
                        Wallet Address:{" "}
                    </div>
                    <div className="flex my-3 justify-center">
                        Username: HarshS16
                    </div>
                    <div className="flex my-3 justify-center">
                        Token Balance: 250
                    </div>
                    <div className="flex gap-5 my-10 px-4">
                        <a
                            href={"/"}
                            className="relative bg-[#282828] border-2 border-[#3E3E3E] w-full h-full   rounded-lg"
                        >
                            <div className="flex w-full py-6 text-lg font-thunder tracking-widest font-bold text-white items-center justify-center gap-5">
                                Challenges Joined
                            </div>
                        </a>
                        <a
                            href={"/"}
                            className="relative bg-[#282828] border-2 border-[#3E3E3E] w-full h-full   rounded-lg"
                        >
                            <div className="flex w-full py-6 text-lg font-thunder tracking-widest font-bold text-white items-center justify-center gap-5">
                                Challenges Hosted
                            </div>
                        </a>
                    </div>
                    <div className="flex flex-col gap-2 my-10 px-4">
                        <p className="text-2xl font-bold">General Settings</p>
                        <div>
                            <div className="relative bg-[#282828] border-2 border-[#3E3E3E] w- h-full   rounded-lg">
                                <div>
                                    <div className="flex w-full py-6 text-xl font-thunder tracking-widest font-bold text-white items-center justify-center gap-5">
                                        test activity
                                    </div>
                                </div>
                            </div>
                            <div>

                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </div>
    );
}