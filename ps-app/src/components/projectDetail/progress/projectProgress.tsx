import ProgressBar from "@/components/ui/progressBar/progressBar";
import React from "react";
import { getFormattedNumber } from "@/utils/getFormattedNumber";
import dayjs from "dayjs";

const ProjectProgress = ({
  goalAmount,
  variant = "bar",
  backers,
  deadline,
  sum,
}: {
  goalAmount: number;
  variant?: "bar" | "detail";
  backers?: number;
  deadline?: Date;
  sum: number;
}) => {
  const today: Date = new Date();

  // Calculate remaining days
  const timeDifference: number =
    new Date(String(deadline)).getTime() - today.getTime();
  const days: number = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
  return (
    <section className={"flex flex-col gap-6"}>
      <div className="flex flex-col gap-1">
        <ProgressBar currentBudget={sum} goalAmount={goalAmount} />
        {variant === "detail" ? (
          <div className={"flex w-full gap-1 items-baseline"}>
            Celkem vybráno
            <h3 className={"font-bold text-primary text-xl"}>{sum}</h3>z
            <h3>{goalAmount} Kč</h3>
          </div>
        ) : null}
      </div>
      {backers >= 0 && (
        <div className={"flex w-full gap-1 items-baseline"}>
          Tento projekt podpořilo již
          <h3 className={"font-bold text-primary text-xl"}>{backers}</h3>
          členů
        </div>
      )}
      {deadline ? (
        <div className={"flex w-full gap-1 items-baseline"}>
          Do konce zbývá
          <h3 className={"font-bold text-primary text-xl"}>{days}</h3>
          dní
        </div>
      ) : null}
    </section>
  );
};

export default ProjectProgress;
