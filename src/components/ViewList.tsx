import React from 'react';
import Students from './Student';
import type { Student } from '../types';

interface Props {
    students: Student[];
    getCourseName: (id: string) => string;
    onDelete: (id: string) => void;
}
const ViewList: React.FC<Props> = ({ students, getCourseName, onDelete }) => {
    if (students.length === 0) return <p className="text-gray-500">No students yet.</p>;
    return (
        <div className="grid md:grid-cols-2 gap-4">
            {students.map((student) => (
                <Students key={student.id} student={student} getCourseName={getCourseName} onDelete={onDelete} />
            ))}
        </div>
    );
};

export default ViewList;
