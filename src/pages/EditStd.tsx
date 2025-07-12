import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchCourses, fetchStudents, updateStudent } from '../api/mockApi';
import StudentForm, { type StudentFormValues } from '../components/Registration';
import type { Course, Student } from '../types';

const EditStudent: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [student, setStudent] = useState<Student | null>(null);
    const [courses, setCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const loadData = async () => {
            try {
                const [students, courseData] = await Promise.all([
                    fetchStudents(),
                    fetchCourses(),
                ]);
                const found = students.find((s) => s.id === id);
                if (!found) setError('Student not found');
                else setStudent(found);
                setCourses(courseData);
            } catch (err) {
                setError('Something went wrong');
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, [id]);

    const handleUpdate = async (data: StudentFormValues) => {
        const file = data.image?.[0];
        const imageUrl = file ? URL.createObjectURL(file) : student?.imageUrl;
        if (!student) return;

        const updatedStudent: Student = {
            ...student,
            name: data.name,
            email: data.email,
            courseId: data.courseId,
            imageUrl: imageUrl || '',
        };
        await updateStudent(updatedStudent);
        navigate('/');
    };

    if (loading) return <p className="p-4">Loading...</p>;
    if (error) return <p className="p-4 text-red-600">{error}</p>;
    if (!student) return null;

    return (
        <div className="max-w-xl mx-auto mt-8">
            <h2 className="text-2xl font-semibold mb-4">Edit Student</h2>
            <StudentForm
                onSubmit={handleUpdate}
                courses={courses}
                defaultValues={{
                    name: student.name,
                    email: student.email,
                    courseId: student.courseId,
                }}
            />
        </div>
    );
};

export default EditStudent;
