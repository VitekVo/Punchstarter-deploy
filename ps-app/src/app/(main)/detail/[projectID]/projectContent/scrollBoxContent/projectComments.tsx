import React, { use } from "react";
import { IProject } from "@/utils/types/types";
import Button from "@/components/button/Button";
import { Comment } from "@/components/comment/Comment";
import { AddComment } from "@/components/comment/AddComment";
import { useState } from "react";
import { comment } from "postcss";
import { RiH1 } from "react-icons/ri";
import { UserContextProvider, useUserContext } from "@/context/UserContext";
import { url } from "../../../../../../../config/axiosInstance";
const ProjectComments = ({ project }: { project: IProject }) => {
  const [showAddComment, setShowAddComment] = useState(false);
  const [comments, setComments] = useState(project.comments);
  const { user } = useUserContext();

  console.log(user);

  async function handleAddComment(newComment: string) {
    const commentData = {
      projectId: project._id,
      text: newComment,
      userId: user?.id,
    };

    console.log(commentData);

    const response = await fetch(`${url}/comments`, {
      method: "POST",
      body: JSON.stringify(commentData),
      headers: { "Content-Type": "application/json" },
    });

    const json = await response.json();
    if (!response.ok) {
      console.log(json.error);
    }
    if (response.ok) {
      console.log("new list created", json);
    }
    const newCommentWithUser = {
      ...json.comment,
      user_id: {
        id: user?.id,
        username: user?.username, // Add the username under the user_id field
      },
    };

    // Update the comments state to include the new comment
    setComments([...comments, newCommentWithUser]);
    setShowAddComment(false);
  }
  return (
    <div id={"comments"} className={"carousel-item w-full"}>
      <div
        className={
          "w-full h-fit border rounded-lg flex flex-col p-8 px-12 text-gray-700 gap-y-8"
        }
      >
        <div className="flex justify-between">
          <h2 className="text-lg uppercase font-bold">komentáře</h2>
          <Button
            text={"Add comment"}
            width={"fit"}
            onClick={() => setShowAddComment(!showAddComment)}
            isDisabled={user ? false : true}
          ></Button>
        </div>
        <div>
          {showAddComment && (
            <AddComment handleAddComment={handleAddComment}></AddComment>
          )}

          <div className={"flex flex-col gap-y-4"}>
            {comments.length > 0 ? (
              comments.map((comment) => (
                <Comment
                  key={comment._id}
                  _id={comment._id}
                  projectId={comment._id}
                  user_id={comment.user_id}
                  comment={comment.comment}
                  username={comment.user_id.username}
                />
              ))
            ) : (
              <h1 className="text-2xl black text-center">
                Zatím se k projektu nikdo nevyjádřil. <br />
                Nestyď se a buď první!
              </h1>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectComments;
