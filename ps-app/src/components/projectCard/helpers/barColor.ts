export function barColor(currentBudget: number, targetBudget: number): string {
  let percentage = (currentBudget / targetBudget) * 100;

  if (percentage < 33.33) {
    return "error";
  } else if (percentage >= 33.33 && percentage < 66.66) {
    return "warning";
  } else {
    return "success";
  }
}
