export const getFormattedNumber = (number: number): string => {
  const charArray = number.toString().split("").reverse();
  let result: string = "";

  charArray.map((char, idx) => {
    result += char;
    if ((idx + 1) % 3 === 0) result += " ";
  });

  return result.split("").reverse().join("");
};
