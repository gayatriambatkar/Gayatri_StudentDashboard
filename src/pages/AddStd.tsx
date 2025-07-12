import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchCourses, saveStudent } from '../api/mockApi';
import StudentForm, { type StudentFormValues } from '../components/Registration';
import type { Course, Student } from '../types';
import { v4 as uuidv4 } from 'uuid';

const AddStudent: React.FC = () => {
    const [courses, setCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const loadCourses = async () => {
            try {
                const data = await fetchCourses();
                setCourses(data);
            } catch {
                setError('Failed to fetch courses');
            } finally {
                setLoading(false);
            }
        };
        loadCourses();
    }, []);

    const handleAddStudent = async (data: StudentFormValues) => {
        const file = data.image[0];
        const imageUrl = URL.createObjectURL(file);
        const newStudent: Student = {
            id: uuidv4(),
            name: data.name,
            email: data.email,
            courseId: data.courseId,
            imageUrl,
        };
        await saveStudent(newStudent);
        navigate('/'); //Dashboard
    };

    if (loading) return <p className="p-4">Loading...</p>;
    if (error) return <p className="p-4 text-red-600">{error}</p>;

    return (
        <div className="max-w-xl mx-auto mt-8">
            <h2 className="text-2xl font-semibold mb-4">Add Student</h2>
            <StudentForm onSubmit={handleAddStudent} courses={courses} />
        </div>
    );
};

export default AddStudent;
