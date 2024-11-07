"use client";

import React from "react";

const ProgressBar = ({
  currentBudget,
  targetBudget,
}: {
  currentBudget: number;
  targetBudget: number;
}) => {
  const progress = (currentBudget / targetBudget) * 100;

  return (
    <div className={"flex-grow h-3 rounded-full bg-gray-200 relative"}>
      <div
        style={{
          width: progress + "%",
        }}
        className={`bg-primary rounded-full h-full absolute z-10 left-0`}
      />
    </div>
  );
};

export default ProgressBar;
