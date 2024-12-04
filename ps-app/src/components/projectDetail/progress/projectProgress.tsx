import ProgressBar from "@/components/ui/progressBar/progressBar";
import React from "react";
import { getFormattedNumber } from "@/utils/getFormattedNumber";
import dayjs from "dayjs";

const ProjectProgress = ({
  currentBudget,
  goalAmount,
  variant = "bar",
  backers,
  deadline,
}: {
  currentBudget: number;
  goalAmount: number;
  variant?: "bar" | "detail";
  backers?: number;
  deadline?: Date;
}) => {
  return (
    <section className={"flex flex-col gap-6"}>
      <div className="flex flex-col gap-1">
        <ProgressBar currentBudget={currentBudget} goalAmount={goalAmount} />
        {variant === "detail" ? (
          <div className={"flex w-full gap-1 items-baseline"}>
            Celkem vybráno
            <h3 className={"font-bold text-primary text-xl"}>
              {currentBudget}
            </h3>
            z<h3>{goalAmount} Kč</h3>
          </div>
        ) : null}
      </div>
      {backers ? (
        <div className={"flex w-full gap-1 items-baseline"}>
          Tento projekt podpořilo již
          <h3 className={"font-bold text-primary text-xl"}>{backers}</h3>
          členů
        </div>
      ) : null}
      {deadline ? (
        <div className={"flex w-full gap-1 items-baseline"}>
          Do konce zbývá
          <h3 className={"font-bold text-primary text-xl"}>
            {dayjs(deadline).format("D")}
          </h3>
          dní
        </div>
      ) : null}
    </section>
  );
};

export default ProjectProgress;
