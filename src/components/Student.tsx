import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Student } from '../types';
import Alert from './Alert';

interface Props {
  student: Student;
  getCourseName: (id: string) => string;
  onDelete: (id: string) => void;
}

const Students: React.FC<Props> = ({ student, getCourseName, onDelete }) => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const handleEdit = () => {
    if (!student.email || !student.courseId) {
      alert('This student data is incomplete and cannot be edited.');
      return;
    }
    navigate(`/edit/${student.id}`);
  };

  return (
    <>
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
          <button onClick={handleEdit}  className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 text-sm">
            Edit
          </button>
          <button onClick={() => setShowModal(true)} className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 text-sm">
            Delete
          </button>
        </div>
      </div>

      {showModal && (
        <Alert  title="Delete Student"
          message={`Are you sure you want to delete ${student.name}?`}
          onConfirm={() => {
            onDelete(student.id);
            setShowModal(false);
          }}
          onCancel={() => setShowModal(false)}
        />
      )}
    </>
  );
};

export default Students;
