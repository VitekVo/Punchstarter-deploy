export interface IUser {
  id: number;
  email: string;
  username: string;
  fullName: string;
}

export interface IProject {
  id: number;
  title: string;
  description: string;
  category: "Tech" | "Art" | "Film" | "Music" | "Food" | "Game" | "Other";
  currentBudget: number;
  targetBudget: number;
  supporters: number;
  deadline: Date;
}
