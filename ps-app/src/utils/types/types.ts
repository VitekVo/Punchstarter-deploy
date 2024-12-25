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
  category: ProjectCategory;
  currentBudget: number;
  goalAmount: number;
  followCount: number;
  deadline: Date;
  comments: IComment[];
  images: Buffer[];
  sum: number;
  donations: Array<Object>;
  followList: Array<Object>;
  creatorId: ICreator;
  created_at: Date;
}
export enum ProjectCategory {
  Tech = "Tech",
  Art = "Art",
  Film = "Film",
  Music = "Music",
  Food = "Food",
  Game = "Game",
  Other = "Other",
}

export interface IComment {
  _id: string;
  projectId: string;
  comment: string;
  username: string;
  user_id: ICreator;
}
export interface ICreator {
  _id: string; // The unique identifier of the creator
  username: string; // The creator's username
}
