import { useState } from "react";

const P2PChallenge = ({ id }: { id: string | string[] }) => {

    const [hasJoined, setHasJoined] = useState(false);
    const [isActive, setIsActive] = useState(false);
    const [activityIds, setActivityIds] = useState({});
    const [distances, setDistances] = useState({ activity1: 0, activity2: 0 });
    const [pollInterval, setPollInterval] = useState(null); 
    
  
    const [challengeData, setChallengeData] = useState( {
        id: 1,
        challengeName: "Challenge 1",
        status: "Active",
        category: "Fitness",
        target: 100,
        targetType: "Pushups",
        amount: 10,
    });
  
    const handleJoinChallenge = async () => {
      console.log("Joining challenge...");
      setHasJoined(true);
      setIsActive(true)

    }
  
      const handleStop = async () => {
          console.log("Stopping challenge...");
          setHasJoined(false);
      }
  
  
    return(
        <div className="flex flex-col gap-4 px-4">
        <div className="relative bg-[#4d4d4d] border-2 border-[#3E3E3E] w-full h-full rounded-lg">
          <img
            src="/images/running.png"
            alt="running"
            className="w-full h-52 object-cover"
          />
          <p className="text-xl font-bold my-1 mx-5">
            {challengeData.challengeName}
          </p>
          <div>
            <p className="p-6 text-lg font-bold text-white">
              About the challenge
            </p>
            <p className="px-6 text-base font-normal text-white">
              This challenge is a{" "}
              <span className="font-semibold">{challengeData.category}</span>{" "}
              challenge, where participants compete to achieve the specified
              goal. The challenge is designed to test your endurance, skill, and
              commitment. Take on the challenge to push your limits and earn
              rewards based on your performance!
            </p>
          </div>
          <div className="flex justify-between px-2">
            <div className="flex flex-col gap-2 my-10 px-4">
              <p className="text-lg font-bold">Target:</p>
              <p className="text-sm font-medium">
                {challengeData.target} {challengeData.targetType}
              </p>
            </div>
            <div className="flex flex-col gap-2 my-10 px-4">
              <p className="text-lg font-bold">Reward:</p>
              <p className="text-sm font-medium">{challengeData.amount * 2}</p>
            </div>
          </div>
        </div>
        {hasJoined && (
          <div className="flex justify-center gap-4">
            <div className="bg-[#4d44445e] text-white p-4 rounded-lg w-full shadow-md">
              <h3 className="text-lg font-bold">Athlete 1</h3>
              <p>End Distance: {distances.activity1} m</p>
            </div>
            <div className="bg-[#5e5e5e5e] text-white p-4 rounded-lg w-full shadow-md">
              <h3 className="text-lg font-bold">Athlete 2</h3>
              <p>End Distance: {distances.activity2} m</p>
            </div>
          </div>
        )}

        {!hasJoined ? (
          <button
            onClick={handleJoinChallenge}
            className="bg-white text-black rounded-full p-3 text-lg"
          >
            Start Now
          </button>
        ) : (
          <button
            onClick={handleStop}
            className={`flex-1 rounded-full p-3 w-full text-lg ${
              !isActive
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-red-500 hover:bg-red-600"
            }`}
            disabled={!isActive}
          >
            Give up !
          </button>
        )}
      </div>
    )
}

export default P2PChallenge;