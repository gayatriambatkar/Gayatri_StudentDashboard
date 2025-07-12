import React from 'react';
import { Link } from 'react-router-dom';
import type { Student } from '../types';

interface Props {
    student: Student;
    getCourseName: (id: string) => string;
    onDelete: (id: string) => void;
}

const StudentCard: React.FC<Props> = ({ student, getCourseName, onDelete }) => {
    return (
        <div className="bg-white p-4 rounded shadow flex items-center space-x-4">
            <img
                src={student.imageUrl}
                alt={student.name}
                className="w-16 h-16 rounded-full object-cover"
            />
            <div className="flex-1">
                <h2 className="text-lg font-semibold">{student.name}</h2>
                <p className="text-sm text-gray-600">{student.email}</p>
                <p className="text-sm text-gray-700">
                    Course: {getCourseName(student.courseId)}
                </p>
            </div>
            <div className="flex flex-col gap-2">
                <Link to={`/edit/${student.id}`} className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 text-sm" >
                    Edit
                </Link>
                <button onClick={() => onDelete(student.id)} className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 text-sm"  >
                    Delete
                </button>
            </div>
        </div>
    );
};

export default StudentCard;
