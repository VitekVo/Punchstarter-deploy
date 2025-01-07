import React from "react";
import { IComment } from "@/utils/types/types";
import Avatar from "../navbar/navElements/avatar";

export const Comment = ({ comment, username }: IComment) => {
  return (
    <div className="chat chat-start">
      <div />
      <Avatar username={username} />{" "}
      <div className="chat-header">{username}</div>
      <div className="chat-bubble chat-bubble-primary">{comment}</div>
    </div>
  );
};
