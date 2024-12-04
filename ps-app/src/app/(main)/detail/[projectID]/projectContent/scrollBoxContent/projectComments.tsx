import React, { use } from "react";
import { IProject } from "@/utils/types/types";
import Button from "@/components/button/Button";
import { Comment } from "@/components/comment/Comment";
import { AddComment } from "@/components/comment/AddComment";
import { useState } from "react";
import { comment } from "postcss";
import { RiH1 } from "react-icons/ri";
const ProjectComments = ({ project }: { project: IProject }) => {
  const [showAddComment, setShowAddComment] = useState(false);
  const [comments, setComments] = useState(project.comments);

  async function handleAddComment(newComment: string) {
    const commentData = {
      project_id: project._id,
      comment: newComment,
      user_id: "6750a2d0999e49b6f5713d48", //TODO: add current logged in user when userProvider is ready
    };

    console.log(commentData);

    const response = await fetch("http://localhost:2580/projects/addComment", {
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
    console.log(comments);
    console.log(json.comment);
    setComments([...comments, json.comment]);
    setShowAddComment(false);
  }
  return (
    <div id={"comments"} className={"carousel-item w-full"}>
      <div
        className={
          "w-full h-fit border rounded-lg flex flex-col p-8 px-12 text-gray-700"
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
          {comments.length > 0 ? (
            comments.map((comment) => (
              <Comment
                key={comment._id}
                _id={comment._id}
                projectId={comment._id}
                user_id={comment.user_id}
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
