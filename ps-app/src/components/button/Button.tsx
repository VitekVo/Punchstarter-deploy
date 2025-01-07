const Button = ({
  text,
  onClick,
  variant,
  isDisabled,
  type,
  width,
}: {
  text: string;
  onClick: () => void;
  variant?: "contained" | "outlined";
  isDisabled?: boolean;
  type?: "submit" | "button";
  width?: "fit" | "full";
}) => {
  return (
    <button
      onClick={onClick}
      disabled={isDisabled}
      type={type}
      className={`${!isDisabled ? "hover:bg-primary-dark" : "bg-opacity-40"} transition ${width === "fit" ? "w-fit px-4" : "w-full"} py-2 bg-primary text-white rounded-lg`}
    >
      {text}
    </button>
  );
};

export default Button;
