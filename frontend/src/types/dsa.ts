export type Problem = {
  id: string;
  title: string;
  level: "Easy" | "Medium" | "Tough";
  completed: boolean;
  leetcode: string;
  youtube: string;
  article: string;
};

export type Topic = {
  id: string;
  name: string;
  problems: Problem[];
};

