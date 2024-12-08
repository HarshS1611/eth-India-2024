import React from "react";

export default function ChallengeCard({ challenge }: { challenge: any }) {
    // console.log("Challenge:", challenge);
  return (
    <div className="my-2">
      <div
        onClick={() => (window.location.href = `/challenge/${challenge.id}`)} 
        className="relative cursor-pointer  bg-[#282828] shadow-xl w-full h-full rounded-lg pb-5 px-5"
      >
        <div>
          <div className="flex justify-center items-center">
            <h3 className="flex w-full pt-4 pb-2 text-xl font-thunder tracking-wide font-bold text-white">
              {challenge.challengeName}
            </h3>
            <p
              className={`${
                challenge.status === "Active"
                  ? "bg-[#03EF1B] text-[#03EF1B]"
                  : "bg-[#E9C500] text-[#E9C500]"
              } dm-mono-regular bg-opacity-40 text-xs mt-2 font-medium px-3 py-1 rounded-xl`}
            >
              {challenge.status || "Upcoming"}
            </p>
          </div>
          <p className="text-white text-sm py-1">{challenge.category}</p>
        </div>
        <div className="bg-slate-400 w-full h-[0.5px] my-2"></div>
        <div className="flex justify-between">
          <div className="flex flex-col gap-y-3">
            <h5 className="text-base text-white/90">Target</h5>
            <p className="text-white text-sm">
              {challenge.target} {challenge.targetType}
            </p>
          </div>
          <div className="flex flex-col gap-y-3">
            <h5 className="text-base text-white/90">Min. Amount</h5>
            <p className="text-white text-sm">{challenge.amount} ETH</p>
          </div>
        </div>
      </div>
    </div>
  );
}
