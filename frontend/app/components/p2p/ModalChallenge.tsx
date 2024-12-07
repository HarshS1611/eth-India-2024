import React, { useState, useEffect, useCallback } from "react";
import FitnessImage from "./images/fit.jpg";
import TravelImage from "./assets/travel.webp";
import ArtImage from "./assets/art.jpg";
import AdvImage from "./assets/adventure.jpg";
import GameImg from "./assets/gaming.jpg";
import LifeImage from "./assets/lifestyle.webp";
import {
  Transaction,
  TransactionButton,
  TransactionSponsor,
  TransactionStatus,
  TransactionStatusAction,
  TransactionStatusLabel,
} from "@coinbase/onchainkit/transaction";
import axios from "axios";
import {BASE_SEPOLIA_CHAIN_ID, escrowCalls} from "./../../../blockchain/main"
interface ModalChallengeProps {
  open: boolean;
  handleClose: () => void;
}
// @ts-ignore

const ModalChallenge: React.FC<ModalChallengeProps> = ({ open, handleClose }) => {
  const [page, setPage] = useState(1);

  const [selectedCategory, setSelectedCategory] = useState("");
  const [formData, setFormData] = useState({
    category: "",
    isInviteOnly: false,
    challengeName: "",
    target: "",
    targetType: "meters",
    challengeType: "",
    startDate: "24/11/2024",
    endDate: "02/12/2024",
    wagerAmount: 0.0001,
    wagerCurrency: "ETH",
  });

  const categories = [
    { name: "Fitness", image: '/images/fit.jpg' },
    { name: "Travel", image: '/images/travel.webp' },
    { name: "Art", image: '/images/art.jpg' },
    { name: "Adventure", image: '/images/adventure.jpg' },
    { name: "Lifestyle", image: '/images/lifestyle.webp' },
    { name: "Gaming", image: '/images/gaming.jpg' },
  ];

 

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setFormData((prev) => ({ ...prev, category }));
  };

  const handleNext = () => {
    if (page === 1 && selectedCategory) {
      setPage(2);
    }
  };

  const handleBack = () => {
    if (page === 2) {
      setPage(1);
    } else {
      handleClose();
    }
  };

  const handleOnStatus = useCallback((status: any) => {
    console.log("LifecycleStatus", status);
    if(status.statusName == "success")
      {
        handleFormSubmit()
      }
  }, []);
  const handleFormSubmit = async () => {
    console.log("backend inytegration")
    console.log(formData);
  }
  if (!open) return null;

// @ts-ignore

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 backdrop-blur-sm text-black">
      <div className="bg-white w-96 rounded-lg p-6 relative max-h-[80vh] overflow-y-auto scrollbar-hide">
        {/* Progress Bar */}
        <div className="mb-4">
          <div className="w-80 h-2 bg-gray-200 rounded-full">
            <div
              className={`h-2 rounded-full ${
                page === 1 ? "bg-gray-400" : "bg-gray-700"
              }`}
              style={{ width: page === 1 ? "50%" : "100%" }}
            />
          </div>
        </div>

        {/* Page Content */}
        {page === 1 ? (
          <>
            <h2 className="text-xl font-bold mb-4">Choose a Category</h2>
            <div className="grid grid-cols-3 gap-4 mb-4">
              {categories.map((category) => (
                <div
                  key={category.name}
                  className={`border rounded-lg p-4 flex flex-col items-center cursor-pointer transition-transform ${
                    selectedCategory === category.name
                      ? "bg-gray-300 border-gray-700 scale-105"
                      : "bg-gray-100"
                  }`}
                  onClick={() => handleCategorySelect(category.name)}
                >
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-16 h-16 mb-2 object-cover"
                  />
                  <p className="text-sm font-medium text-center">
                    {category.name}
                  </p>
                </div>
              ))}
            </div>

            <button
              onClick={handleNext}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg w-full disabled:bg-gray-300 mb-2"
              disabled={!selectedCategory}
            >
              Next
            </button>
          </>
        ) : (
          <>
            <h2 className="text-xl font-bold mb-2">Challenge Details</h2>
            <p className="text-sm mb-4">
              Fill in the details for your challenge.
            </p>

            <div className="flex mb-4 justify-between items-center">
              <label className="block text-lg font-medium mb-2">
                Invite Only Challenge
              </label>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={formData.isInviteOnly}
                  onChange={() =>
                    setFormData((prev) => ({
                      ...prev,
                      isInviteOnly: !prev.isInviteOnly,
                    }))
                  }
                />
                <div className="group peer bg-white rounded-full duration-300 w-16 h-8 ring-2 ring-black after:duration-300 after:bg-black peer-checked:after:bg-blue-300 peer-checked:ring-blue-300 after:rounded-full after:absolute after:h-6 after:w-6 after:top-1 after:left-1 after:flex after:justify-center after:items-center peer-checked:after:translate-x-8 peer-hover:after:scale-95"></div>
              </label>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium">
                Challenge Name
              </label>
              <input
                type="text"
                placeholder="Enter challenge name"
                value={formData.challengeName}
                onChange={(e) =>
                  setFormData({ ...formData, challengeName: e.target.value })
                }
                className="border border-gray-300 rounded-lg w-full p-2"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium">Target to Win</label>
              <div className="flex">
                <input
                  type="number"
                  placeholder="Target"
                  value={formData.target}
                  onChange={(e) =>
                    setFormData({ ...formData, target: e.target.value })
                  }
                  className="border border-gray-300 rounded-l-lg p-2 w-full"
                />
                <select
                  value={formData.targetType}
                  onChange={(e) =>
                    setFormData({ ...formData, targetType: e.target.value })
                  }
                  className="border border-gray-300 rounded-r-lg p-2"
                >
                  <option value="meters">Meters</option>
                  <option value="kilometers">Kilometers</option>
                </select>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium">
                Challenge Type
              </label>
              <select
                value={formData.challengeType}
                onChange={(e) =>
                  setFormData({ ...formData, challengeType: e.target.value })
                }
                className="border border-gray-300 rounded-lg w-full p-2"
              >
                <option value="">Select Challenge Type</option>
                <option value="multiplayer">Multiplayer</option>
                <option value="versus">Versus Your Friend</option>
                <option value="dare">Dare Your Friend</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium">
                Start Date / Time
              </label>
              <input
                type="datetime-local"
                value={formData.startDate}
                onChange={(e) =>
                  setFormData({ ...formData, startDate: e.target.value })
                }
                className="border border-gray-300 rounded-lg w-full p-2"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium">
                End Date / Time
              </label>
              <input
                type="datetime-local"
                value={formData.endDate}
                onChange={(e) =>
                  setFormData({ ...formData, endDate: e.target.value })
                }
                className="border border-gray-300 rounded-lg w-full p-2"
              />
            </div>

            <h3 className="text-lg font-bold mb-2">Participation Details</h3>
            <p className="text-sm mb-4">Maximum Participants: 50</p>

            <h3 className="text-lg font-bold mb-2">Wager Details</h3>
            <div className="mb-4">
              <label className="block text-sm font-medium">Wager Amount</label>
              <div className="flex">
                <input
                  type="number"
                  placeholder="Wager Amount"
                  value={formData.wagerAmount}
                  onChange={(e) =>
                    setFormData({ ...formData, wagerAmount: Number(e.target.value) })
                  }
                  className="border border-gray-300 rounded-l-lg p-2 w-full"
                />
                <select
                  value={formData.wagerCurrency}
                  onChange={(e) =>
                    setFormData({ ...formData, wagerCurrency: e.target.value })
                  }
                  className="border border-gray-300 rounded-r-lg p-2"
                >
                  <option value="POL">POL</option>
                  <option value="BASE">BASE</option>
                  <option value="USDC">USDC</option>
                </select>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium">
                Connected Wallet
              </label>
              <p className="border border-gray-300 rounded-lg text-ellipsis">
                { " 0x123...456"}
              </p>
            </div>
            {/* @ts-ignore */}
<Transaction
  chainId={BASE_SEPOLIA_CHAIN_ID}
  calls={escrowCalls.createP2PChallenge(formData.wagerAmount)}
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
            
            {/* <button
              onClick={handleFormSubmit}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg w-full mb-2"
            >
              Submit
            </button> */}
          </>
        )}

        {/* Back Button */}
        <button
          onClick={handleBack}
          className="bg-gray-300 text-black px-4 py-2 rounded-lg w-full"
        >
          Back
        </button>

        <button
          onClick={handleClose}
          className="absolute top-4 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
        >
          X
        </button>
      </div>
    </div>
  );
};

export default ModalChallenge;
