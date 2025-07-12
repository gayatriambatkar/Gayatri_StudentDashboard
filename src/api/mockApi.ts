import type { Course, Student } from '../types';
const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export const fetchCourses = async (): Promise<Course[]> => {
  await delay(500); 
//   Coureses 
  return [
    { id: 1, name: 'HTML Basics' },
    { id: 2, name: 'CSS Mastery' },
    { id: 3, name: 'JavaScript Pro' },
    { id: 4, name: 'React In Depth' },
  ];
};

const STUDENT_KEY = 'students-data';
// View
export const fetchStudents = async (): Promise<Student[]> => {
  await delay(300);
  const stored = localStorage.getItem(STUDENT_KEY);
  return stored ? JSON.parse(stored) : [];
};
// save
export const saveStudent = async (student: Student): Promise<void> => {
  const students = await fetchStudents();
  students.push(student);
  localStorage.setItem(STUDENT_KEY, JSON.stringify(students));
  await delay(200);
};

// edit
export const updateStudent = async (updated: Student): Promise<void> => {
  const students = await fetchStudents();
  const updatedList = students.map((s) =>s.id === updated.id ? updated : s);
  localStorage.setItem(STUDENT_KEY, JSON.stringify(updatedList));
};

// delete
export const deleteStudent = async (id: string): Promise<void> => {
  const students = await fetchStudents();
  const filtered = students.filter((s) => s.id !== id);
  localStorage.setItem(STUDENT_KEY, JSON.stringify(filtered));
};
