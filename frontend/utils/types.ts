export type Question = {
  _id: string;
  questionText: string;
  correctAnswer: string;
};

export type Chapter = {
  _id: string;
  title: string;
  content: string;
  questions: Question[];
};

export type Unit = {
  _id: string;
  title: string;
  chapters: Chapter[];
};

export type Section = {
  _id: string;
  title: string;
  units: Unit[];
};

export type Course = {
  _id: string;
  title: string;
  description: string;
  sections: Section[];
};
