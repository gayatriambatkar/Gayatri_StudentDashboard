import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchStudents, deleteStudent, fetchCourses } from '../api/mockApi';
import type { Student, Course } from '../types';
import { runEventLoopDemo } from '../utils/EventLoopDemo';


const Dashboard: React.FC = () => {
    const [students, setStudents] = useState<Student[]>([]);
    const [courses, setCourses] = useState<Course[]>([]);

    const loadData = async () => {
        const [studentsData, coursesData] = await Promise.all([
            fetchStudents(),
            fetchCourses(),
        ]);
        setStudents(studentsData);
        setCourses(coursesData);
    };

    useEffect(() => {
        loadData();
        runEventLoopDemo();
        // Only for this which is mentione in the assesment PDF 
        // "Implement a scenario that demonstrates knowledge of the event loop (e.g.,setTimeout/setInterval with async code)." 
    }, []);

    const handleDelete = async (id: string) => {
        await deleteStudent(id);
        loadData();
    };

    const getCourseName = (id: string) => courses.find((c) => c.id.toString() === id)?.name || 'Unknown';

    return (
        <div className="max-w-5xl mx-auto mt-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Student Dashboard</h1>
                <Link to="/add" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                    + Add Student
                </Link>
            </div>
            {students.length === 0 ? (
                <p className="text-gray-500">No students yet.</p>
            ) : (
                <div className="grid md:grid-cols-2 gap-4">
                    {students.map((student) => (
                        <div key={student.id} className="bg-white p-4 rounded shadow flex items-center space-x-4">
                            <img src={student.imageUrl} alt={student.name} className="w-16 h-16 rounded-full object-cover" />
                            <div className="flex-1">
                                <h2 className="text-lg font-semibold">{student.name}</h2>
                                <p className="text-sm text-gray-600">{student.email}</p>
                                <p className="text-sm text-gray-700">
                                    Course: {getCourseName(student.courseId)}
                                </p>
                            </div>
                            <div className="flex flex-col gap-2">
                                <Link to={`/edit/${student.id}`} className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 text-sm">
                                    Edit
                                </Link>
                                <button onClick={() => handleDelete(student.id)} className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 text-sm">
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            <br></br>
            <div>
                <br />
                <hr></hr>
                <br />
                <button onClick={runEventLoopDemo} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                    Event Loop Demo
                </button>
                <p className="text-sm text-gray-500 mt-2">
                    Note: This button is only for reviewers/developers. Open the browser console (Inspect → Console) to see how the JavaScript event loop works — the logs are printed there.
                </p>
            </div>
        </div>
    );
};

export default Dashboard;
