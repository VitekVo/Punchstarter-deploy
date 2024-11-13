import React from "react";

const CommentBox = ({ isVisible }: { isVisible: boolean }) => {
  return (
    <div
      className={`flex flex-col items-center justify-center h-full bg-green-500 rounded-md p-4 ${isVisible ? "opacity-100" : "opacity-0"} transition-opacity duration-500`}
    >
      <h2 className="text-white text-2xl">Comments Section</h2>
      <div className="mt-4 h-[400px] overflow-y-auto w-full">
        {/* Simulating multiple comments */}
        <p className="text-white">Comment 1</p>
        <p className="text-white">Comment 2</p>
        <p className="text-white">Comment 3</p>
        <p className="text-white">Comment 4</p>
        {/* Add more comments as needed */}
      </div>
    </div>
  );
};

export default CommentBox;
