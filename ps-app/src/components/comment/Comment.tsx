import React from "react";
import { IComment } from "@/utils/types/types";
import { useUserContext } from "@/context/UserContext";
export const Comment = ({ comment, user_id, username }: IComment) => {
  const { user } = useUserContext();
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
        </div>{" "}
        <div className="chat-header">{username}</div>
        <div className="chat-bubble chat-bubble-primary">{comment}</div>
      </div>
    </div>
  );
};
