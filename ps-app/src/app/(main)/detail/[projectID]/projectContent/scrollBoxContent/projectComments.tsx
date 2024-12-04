import React from "react";
import { IProject } from "@/utils/types/types";
import Button from "@/components/button/Button";
import { Comment } from "@/components/comment/Comment";
import { AddComment } from "@/components/comment/AddComment";
import { useState } from "react";
import { comment } from "postcss";
import { RiH1 } from "react-icons/ri";
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
          {project.comments.length > 0 ? (
            project.comments.map((comment) => (
              <Comment
                key={Math.random() * 1000}
                id={comment.id}
                author={comment.author}
                comment={comment.comment}
              ></Comment> // TODO: dát tam id commentu místo Math random xd
            ))
          ) : (
            <h1 className="text-2xl black text-center mt-10">
              Zatím se k projektu nikdo nevyjádřil. <br />
              Nestyď se a buď první!
            </h1>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectComments;
