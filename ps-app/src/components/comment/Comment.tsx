import React from "react";
import { IComment } from "@/utils/types/types";
export const Comment = ({ text }: IComment) => {
  return (
    <div className="mb-10">
      <div className="chat chat-start">
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            <img
              alt="Tailwind CSS chat bubble component"
              src="/CandiceLigma.jpg"
            />
          </div>
        </div>
        <div className="chat-header">Candice Ligma</div>
        <div className="chat-bubble">{text}</div>
      </div>
    </div>
  );
};
