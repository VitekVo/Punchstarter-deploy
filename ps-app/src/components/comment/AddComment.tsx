import React from "react";
import { VscSend } from "react-icons/vsc";

export const AddComment: React.FC<{
  handleAddComment: (newCommentText: string) => void;
}> = ({ handleAddComment }) => {
  const [text, setText] = React.useState("");

  const handleSubmit = () => {
    if (text.trim() !== "") {
      handleAddComment(text);
      setText("");
    }
  };

  return (
    <div className={"relative w-full h-fit"}>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Přidej komentář"
        className="textarea textarea-primary textarea-bordered textarea-xl w-full relative"
      ></textarea>
      <div className="flex justify-end">
        <button className={"absolute bottom-4 right-4"} onClick={handleSubmit}>
          <VscSend size={30} />
        </button>
      </div>
    </div>
  );
};
