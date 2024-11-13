import { redirect } from "next/navigation";

const Button = ({
  text,
  onClick,
  variant,
  isDisabled,
  type,
}: {
  text: string;
  onClick: () => void;
  variant?: "contained" | "outlined";
  isDisabled?: boolean;
  type?: "submit" | "button";
}) => {
  return (
    <button
      onClick={onClick}
      disabled={isDisabled}
      type={type}
      className={`${!isDisabled ? "hover:bg-primary-dark" : "bg-opacity-40"} transition w-full py-2 bg-primary text-white rounded-lg`}
    >
      {text}
    </button>
  );
};

export default Button;
