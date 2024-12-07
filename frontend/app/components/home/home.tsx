"use client"
import React, { useState } from "react";
import AnalyticsCard from "./analyticscard";

const HomePage = () => {
  const analytics = {
    tokensLeft: 500,
    rewardsRedeemed: 150,
    challengesCompleted: 75,
    challengeProgress: 68,
  };
  const [totalTokens, setTotalTokens] = useState(800);

  const getLevelDetails = (tokens: number) => {
    if (tokens < 500) {
      return {
        color: "bg-gradient-to-r from-yellow-700 to-amber-800",
        progress: (tokens / 500) * 100,
        level: "BRONZE",
      };
    } else if (tokens < 1000) {
      return {
        color: "bg-gradient-to-r from-gray-500 to-gray-300",
        progress: ((tokens - 500) / 500) * 100,
        level: "SILVER",
      };
    } else if (tokens < 1500) {
      return {
        color: "bg-gradient-to-r from-yellow-600 to-yellow-500",
        progress: ((tokens - 1000) / 500) * 100,
        level: "GOLD",
      };
    } else {
      return {
        color: "bg-gradient-to-r from-purple-600 to-blue-700",
        progress: 100,
        level: "PLATINUM",
      };
    }
  };

  const { color, progress, level } = getLevelDetails(totalTokens);

  return (
    <div className="space-y-6 p-6 scroll-auto h-[80vh] overflow-y-auto scrollbar-hide">
      <div
        className={`p-4 xl:p-6 rounded-lg ${color} text-white flex items-center space-x-6 relative`}
      >
        <div className="flex-shrink-0">
          <img src='/images/dollar.svg' alt="Bitcoin" className="w-12 h-12" />
        </div>
        <div className="m-0">
          <h3 className="text-md xl:text-xl font-semibold">Total Tokens Earned</h3>
          <p className="mt-2">{totalTokens} Tokens</p>
          <div className="mt-4">
            <div className="h-2 bg-gray-300 rounded-full overflow-hidden">
              <div
                style={{ width: `${progress}%` }}
                className={`bg-gradient-to-r from-green-400 to-blue-500 h-full`}
              ></div>
            </div>
            <p className="mt-2 text-sm">
              {Math.round(progress)}% to next level
            </p>
          </div>
        </div>

        <div
          className={`absolute top-4 right-4 px-4 py-2 rounded-md border-2 text-sm font-bold uppercase ${color} text-white`}
        >
          {level}
        </div>
      </div>

      <div className="flex flex-col justify-between bg-gray-100 p-6 rounded-lg text-black">
        <div className="flex justify-end">
          <div className=" bg-[#297FFF26] text-black font-semibold px-4 py-2 rounded-lg w-max text-sm">
            Coming Soon
          </div>
        </div>

        <div className="flex items-center space-x-6 mt-4 justify-center w-full">
          <div className="flex-shrink-0">
            <img
              src='/images/smartw.svg'
              alt="Smartwatch"
              className="w-24 h-24 object-cover rounded-lg"
            />
          </div>
          <div className="flex-grow">
            <h6 className="text-lg font-semibold">
              Connect with a Smartwatch or any other wearable
            </h6>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 mb-10">
        <AnalyticsCard
          title="Tokens Until Next Reward"
          value={analytics.tokensLeft}
          subtitle="Keep going!"
          symbol="🎯"
        />
        <AnalyticsCard
          title="Total Rewards Redeemed"
          value={analytics.rewardsRedeemed}
          subtitle="Great progress!"
          symbol="🏆"
        />
        <AnalyticsCard
          title="Challenges"
          value={analytics.challengesCompleted}
          showProgress={true}
          progressPercentage={analytics.challengeProgress}
        />
      </div>
    </div>
  );
};
export default HomePage;
