export interface IUser {
  id: number;
  email: string;
  username: string;
  fullName: string;
}

export interface IProject {
  _id: number;
  title: string;
  description: string;
  category: "Tech" | "Art" | "Film" | "Music" | "Food" | "Game" | "Other";
  currentBudget: number;
  goalAmount: number;
  followCount: number;
  deadline: Date;
  comments: IComment[];
  images: Buffer[];
  sum: number;
  donations: Array<Object>;
  followList: Array<Object>;
}

export interface IComment {
  id: number;
  comment: string;
  author: string;
}
