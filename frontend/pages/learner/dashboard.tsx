import { useEffect, useState } from 'react';
import api from '../../utils/api';
import { getToken } from '../../utils/auth';
import { useRouter } from 'next/router';

export default function LearnerDashboard() {
  const [courses, setCourses] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const token = getToken();
        const res = await api.get('/learn/courses', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCourses(res.data);
      } catch (error: any) {
        alert(error.response?.data?.message || 'Failed to load courses');
      }
    };

    fetchCourses();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Your Courses</h1>
      {courses.length === 0 ? (
        <p>No courses found.</p>
      ) : (
        <ul className="space-y-4">
          {courses.map((course: any) => (
            <li
              key={course._id}
              className="border p-4 rounded cursor-pointer hover:bg-gray-100"
              onClick={() => router.push(`/learner/course/${course._id}`)}
            >
              <h2 className="text-lg font-semibold">{course.title}</h2>
              <p>{course.description}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
