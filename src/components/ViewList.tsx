import React from 'react';
import StudentCard from './Student';
import type { Student } from '../types';

interface Props {
    students: Student[];
    getCourseName: (id: string) => string;
    onDelete: (id: string) => void;
}
const StudentList: React.FC<Props> = ({ students, getCourseName, onDelete }) => {
    if (students.length === 0) return <p className="text-gray-500">No students yet.</p>;
    return (
        <div className="grid md:grid-cols-2 gap-4">
            {students.map((student) => (
                <StudentCard key={student.id} student={student} getCourseName={getCourseName} onDelete={onDelete} />
            ))}
        </div>
    );
};

export default StudentList;
