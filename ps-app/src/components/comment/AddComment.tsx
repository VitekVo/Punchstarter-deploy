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
    <div>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Přidej komentář"
        className="textarea textarea-primary textarea-bordered textarea-xl h-40 w-full m-4"
      ></textarea>
      <div className="flex justify-end">
        <button onClick={handleSubmit}>
          <VscSend size={30} />
        </button>
      </div>
    </div>
  );
};
