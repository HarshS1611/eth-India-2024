"use client";
import { useState, useCallback } from "react";
import {
  Transaction,
  TransactionButton,
  TransactionSponsor,
  TransactionStatus,
  TransactionStatusAction,
  TransactionStatusLabel,
} from "@coinbase/onchainkit/transaction";
import axios from "axios";
import { BASE_SEPOLIA_CHAIN_ID, escrowCalls } from "./../../../blockchain/main";

const P2PChallenge = (challengeDetails: any) => {
  console.log(
    "Challenge Details: from where contract is called",
    challengeDetails
  );
  console.log(
    "Challenge Details: from where contract is called",
    challengeDetails.challengeDetails.id
  );

  const [hasJoined, setHasJoined] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [activityIds, setActivityIds] = useState({});
  const [distances, setDistances] = useState({ activity1: 0, activity2: 0 });
  const [pollInterval, setPollInterval] = useState<NodeJS.Timeout | null>(null);
  const [athleteWins, setAthleteWins] = useState(false)
  const handleOnStatus = useCallback((status: any) => {
    console.log("LifecycleStatus", status);
    // handleJoinChallenge()
    if (status.statusName == "success") {
      handleJoinChallenge();
    }
    console.log("i have joinde");
  }, []);
  const handleOnStatus2 = useCallback((status: any) => {
    console.log("challenege resolved", status);
  }, []);
  const handleJoinChallenge = async () => {
    console.log("Joining challenge...");
    setHasJoined(true);
    setIsActive(true);
    const postActivity1 = fetch("http://localhost:3001/activities1", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: "Temp request1",
        startTime: "2024-12-01T06:00:00Z",
        endTime: "2024-12-01T07:00:00Z",
        startDistance: 0,
        endDistance: 0,
      }),
    }).then((response) => response.json());

    const postActivity2 = fetch("http://localhost:3001/activities2", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: "Temp request2",
        startTime: "2024-12-01T06:00:00Z",
        endTime: "2024-12-01T07:00:00Z",
        startDistance: 0,
        endDistance: 0,
      }),
    }).then((response) => response.json());

    Promise.all([postActivity1, postActivity2])
      .then(([activity1Data, activity2Data]) => {
        // console.log("Activity 1:", activity1Data);
        // console.log("Activity 2:", activity2Data);
        setActivityIds({
          activity1Id: activity1Data._id,
          activity2Id: activity2Data._id,
        });
        setHasJoined(true);
        startPolling(activity1Data._id, activity2Data._id);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const startPolling = (activity1Id: any, activity2Id: any) => {
    const pollIntervalId = setInterval(async () => {
      const randomNum1 = Math.floor(Math.random() * 5) + 1;
      const randomNum2 = Math.floor(Math.random() * 5) + 1;

      Promise.all([
        fetch(`http://localhost:3001/activities1/${activity1Id}`)
          .then((response) => response.json())
          .then((data) => {
            const updatedDistance = data.endDistance + randomNum1;
            setDistances((prev) => ({ ...prev, activity1: updatedDistance }));
            return fetch(`http://localhost:3001/activities1/${activity1Id}`, {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ endDistance: updatedDistance }),
            }).then((response) => response.json());
          }),
        fetch(`http://localhost:3001/activities2/${activity2Id}`)
          .then((response) => response.json())
          .then((data) => {
            const updatedDistance = data.endDistance + randomNum2;
            setDistances((prev) => ({ ...prev, activity2: updatedDistance }));
            return fetch(`http://localhost:3001/activities2/${activity2Id}`, {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ endDistance: updatedDistance }),
            }).then((response) => response.json());
          }),
      ])
        .then(async ([activity1Update, activity2Update]) => {
          console.log("Updated Activity 1:", activity1Update);
          console.log("Updated Activity 2:", activity2Update);

          if (activity1Update.endDistance >= 30) {
            {            console.log("resolving challenege")
            }

            console.log("Athlete 1 Wins!");
            clearInterval(pollIntervalId); // Stop polling
            setPollInterval(null); // Clear polling state
            setAthleteWins(true)
            alert("Athlete 1 Wins!"); // Alert when Athlete 1 wins
          } else if (activity2Update.endDistance >= 30) {
            {            console.log("resolving challenege")
            }
           
            console.log("Athlete 2 Wins!");
            clearInterval(pollIntervalId); // Stop polling
            setPollInterval(null); // Clear polling state
            setAthleteWins(true)
            alert("Athlete 2 Wins!"); // Alert when Athlete 2 wins
          }
        })
        .catch((error) => {
          console.error("Polling Error:", error);
        });
    }, 2000);

    setPollInterval(pollIntervalId); // Store polling interval ID
  };

  const handleStop = async () => {
    console.log("Stopping challenge...");
    setHasJoined(false);
  };

  return (
    <div className="flex flex-col gap-4 px-4">
      <div className="relative bg-[#4d4d4d] border-2 border-[#3E3E3E] w-full h-full rounded-lg">
        <img
          src="/images/running.png"
          alt="running"
          className="w-full h-52 object-cover"
        />
        <p className="text-xl font-bold my-1 mx-5">
          {challengeDetails.challengeDetails.challengeName}
        </p>
        <div>
          <p className="p-6 text-lg font-bold text-white">
            About the challenge
          </p>
          <p className="px-6 text-base font-normal text-white">
            This challenge is a{" "}
            <span className="font-semibold">
              {challengeDetails.challengeDetails.category}
            </span>{" "}
            challenge, where participants compete to achieve the specified goal.
            The challenge is designed to test your endurance, skill, and
            commitment. Take on the challenge to push your limits and earn
            rewards based on your performance!
          </p>
        </div>
        <div className="flex justify-between px-2">
          <div className="flex flex-col gap-2 my-10 px-4">
            <p className="text-lg font-bold">Target:</p>
            <p className="text-sm font-medium">
              {challengeDetails.challengeDetails.target}{" "}
              {challengeDetails.challengeDetails.targetType}
            </p>
          </div>
          <div className="flex flex-col gap-2 my-10 px-4">
            <p className="text-lg font-bold">Reward:</p>
            <p className="text-sm font-medium">
              {challengeDetails.challengeDetails.amount * 2}
            </p>
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
  <Transaction
    chainId={BASE_SEPOLIA_CHAIN_ID}
    calls={
      challengeDetails.challengeDetails.id
        ? escrowCalls.joinP2PChallenge(
            challengeDetails.challengeDetails.id,
            "0.0001"
          )
        : {}
    }
    onStatus={handleOnStatus}
    className="bg-blue-700 text-white"
  >
    <TransactionButton />
    <TransactionSponsor />
    <TransactionStatus>
      <TransactionStatusLabel />
      <TransactionStatusAction />
    </TransactionStatus>
  </Transaction>
) : (
  athleteWins ? (
    <Transaction
      chainId={BASE_SEPOLIA_CHAIN_ID}
      calls={
        challengeDetails.challengeDetails.id
          ? escrowCalls.resolveP2PChallenge(
              challengeDetails.challengeDetails.id,
            )
          : {}
      }
      onStatus={handleOnStatus2}
      className="bg-blue-700 text-white"
    >
      <TransactionButton text="claim" />
      <TransactionSponsor />
      <TransactionStatus>
        <TransactionStatusLabel />
        <TransactionStatusAction />
      </TransactionStatus>
    </Transaction>
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
      Give up!
    </button>
  )
)}
    </div>
  );
};

export default P2PChallenge;
