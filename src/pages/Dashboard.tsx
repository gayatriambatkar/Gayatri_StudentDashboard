import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchStudents, deleteStudent, fetchCourses } from '../api/mockApi';
import type { Student, Course } from '../types';
import { EventLoopDemo } from '../utils/EventLoopDemo';
import ViewList from '../components/ViewList';

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
        EventLoopDemo();
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
            <br />
            <h4>List of the students:-</h4>
            <hr />
            <br />

            <ViewList students={students} getCourseName={getCourseName} onDelete={handleDelete} />
            <br></br>
            <div>
                <br />
                <hr></hr>
                <br />
                <button onClick={EventLoopDemo} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
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
