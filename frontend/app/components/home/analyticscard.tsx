import React from "react";

const CircularProgress = ({ percentage }: { percentage: number }) => {
  const radius = 30;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg className="transform -rotate-90 w-20 h-20">
        <circle
          className="text-gray-700"
          strokeWidth="8"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx="40"
          cy="40"
        />
        <circle
          className="text-blue-500"
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
      </svg>
      <span className="absolute text-white text-sm">{percentage}%</span>
    </div>
  );
};

interface Props {
  title: string;
  value: number;
  subtitle?: string;
  symbol?: string;
  showProgress?: boolean;
  progressPercentage?: number;
}

const AnalyticsCard: React.FC<Props>= ({
  title,
  value,
  subtitle,
  symbol,
  showProgress = false,
  progressPercentage,
}) => {
  return (
    <div className="bg-gradient-to-br from-gray-700 to-gray-800 rounded-xl p-3">
      <div className="flex flex-col items-center justify-between h-full py-2">
        <div className="flex flex-col items-center text-center">
          <h3 className="text-gray-300 text-base">{title}</h3>
          <p className="text-white text-xl font-bold mt-2">{value}</p>
          {subtitle && !showProgress && (
            <p className="text-gray-400 text-sm mt-1">{subtitle}</p>
          )}
        </div>
        {showProgress ? (
          <CircularProgress percentage={progressPercentage || 0} />
        ) : (
          <div className="bg-gray-700 p-3 rounded-lg mt-2">
            <span className="text-blue-400 text-xl">{symbol}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default AnalyticsCard;
