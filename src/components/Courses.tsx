import React, { useEffect, useState } from 'react';
import type { Course } from '../types';
import { fetchCourses } from '../api/mockApi';

type Props = {
  value: string;
  onChange: (value: string) => void;
  error?: string;
};

const CourseSelect: React.FC<Props> = ({ value, onChange, error }) => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState<string | null>(null);

  useEffect(() => {
    const loadCourses = async () => {
      try {
        const data = await fetchCourses();
        setCourses(data);
      } catch (err) {
        setApiError('Failed to load courses.');
      } finally {
        setLoading(false);
      }
    };
    loadCourses();
  }, []);

  return (
    <div>
      <label className="block font-medium">Course</label>
      {loading ? (<p className="text-sm text-gray-500">Loading courses...</p>) : apiError ? (
        <p className="text-red-500 text-sm">{apiError}</p>
      ) : (
        <select value={value} onChange={(e) => onChange(e.target.value)} className="w-full border p-2 rounded">
          <option value="">Select a course</option>
          {courses.map((course) => (
            <option key={course.id} value={course.id.toString()}>
              {course.name}
            </option>
          ))}
        </select>
      )}
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default CourseSelect;
