export type Course = {
  id: number;
  name: string;
};

export type Student = {
  id: string;
  name: string;
  email: string;
  courseId: string;
  imageUrl: string;
};
