import React from "react";
import { IProject } from "@/utils/types/types";
import Button from "@/components/button/Button";
import { Comment } from "@/components/comment/Comment";
import { AddComment } from "@/components/comment/AddComment";
import { useState } from "react";
import { comment } from "postcss";
const ProjectComments = ({ project }: { project: IProject }) => {
  const [showAddComment, setShowAddComment] = useState(false);
  const [comments, setComments] = useState(project.comments); // TODO: je to příšerný řešení, dělal jsem to rychle na hodinu PM :)
  function handleAddComment(newComment: string) {
    setComments([...comments, { text: newComment }]);
  }
  return (
    <div id={"comments"} className={"carousel-item w-full"}>
      <div
        className={
          "w-full h-full border rounded-lg flex flex-col p-8 px-12 text-gray-700"
        }
      >
        <div className="grid grid-cols-7">
          <h2 className="text-lg uppercase font-bold">komentáře</h2>
          <div className="col-start-7">
            <Button
              text={"Add comment"}
              onClick={() => setShowAddComment(!showAddComment)}
            ></Button>
          </div>
        </div>
        <div>
          {showAddComment && (
            <AddComment handleAddComment={handleAddComment}></AddComment>
          )}
          {comments.map((comment) => (
            <Comment key={Math.random() * 1000} text={comment.text}></Comment> // TODO: dát tam id commentu místo Math random xd
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectComments;
