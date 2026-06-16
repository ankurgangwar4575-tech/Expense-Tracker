import React from "react";

const SummaryCard = ({ title, amount, color }) => {
  const colors = {
    green: {
      card: "bg-green-50 border-green-200",
      text: "text-green-600",
      amount: "text-green-700",
    },
    blue: {
      card: "bg-blue-50 border-blue-200",
      text: "text-blue-600",
      amount: "text-blue-700",
    },
    red: {
      card: "bg-red-50 border-red-200",
      text: "text-red-600",
      amount: "text-red-700",
    },
  };
  const style = colors[color];
  return (
    <div
      className={`${style.card}
      border rounded-xl p-4 md:p-6`}
    >
      <div className="flex items-center gap-2 mb-3">
        <p
          className={`${style.text}
          text-sm font-medium`}
        >
          {title}
        </p>
      </div>
      <p
        className={`${style.amount}
        text-2xl md:text-3xl font-bold`}
      >
        ₹ {amount?.toLocaleString()}
      </p>
    </div>
  );
};

export default SummaryCard;
