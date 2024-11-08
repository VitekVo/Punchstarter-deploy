export function categoryColor(category: string): string {
  switch (category) {
    case "Tech":
      return "primary";
    case "Art":
      return "secondary";
    case "Game":
      return "accent";
    case "Film":
      return "info";
    case "Music":
      return "success";
    case "Food":
      return "error";
    case "Other":
      return "warning";
    default:
      return "primary";
  }
}
