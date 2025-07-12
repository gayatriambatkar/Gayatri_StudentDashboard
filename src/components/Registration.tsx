import React from 'react';
import { useForm } from 'react-hook-form';
import type { Course } from '../types';

export type StudentFormValues = {
  name: string;
  email: string;
  courseId: string;
  image: FileList;
};

type Props = {
  onSubmit: (data: StudentFormValues) => void;
  courses: Course[];
  defaultValues?: Partial<StudentFormValues>;
};

const StudentForm: React.FC<Props> = ({ onSubmit, courses, defaultValues }) => {
  const { register, handleSubmit, formState: { errors }, } = useForm<StudentFormValues>({ defaultValues, });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded shadow-md space-y-4">
      <div>
        <label className="block font-medium">Name</label>
        <input type="text" {...register('name', { required: 'Name is required' })} className="w-full border p-2 rounded" />
        {errors.name && (
          <p className="text-red-500 text-sm">{errors.name.message}</p>
        )}
      </div>
      <div>
        <label className="block font-medium">Email</label>
        <input
          type="email"  {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^\S+@\S+$/i,
              message: 'Invalid email format',
            },
          })}
          className="w-full border p-2 rounded"
        />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label className="block font-medium">Course</label>
        <select {...register('courseId', { required: 'Please select a course' })} className="w-full border p-2 rounded" >
          <option value="">Select a course</option>
          {courses.map((course) => (
            <option key={course.id} value={course.id.toString()}>
              {course.name}
            </option>
          ))}
        </select>
        {errors.courseId && (
          <p className="text-red-500 text-sm">{errors.courseId.message}</p>
        )}
      </div>

      <div>
        <label className="block font-medium">Profile Image</label>
        <input
          type="file"
          {...register('image', { required: 'Image is required' })}
          accept="image/*"
          className="w-full border p-2 rounded"
        />
        {errors.image && (
          <p className="text-red-500 text-sm">{errors.image.message}</p>
        )}
      </div>

      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700" >
        Save Student
      </button>
    </form>
  );
};

export default StudentForm;
