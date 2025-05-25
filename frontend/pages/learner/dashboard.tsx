import { useEffect, useState } from 'react';
import api from '../../utils/api';
import { getToken } from '../../utils/auth';
import { useRouter } from 'next/router';
import CourseCard from '../../components/CourseCard';
import withAuth from '../../components/withAuth';

function LearnerDashboard() {
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
        <div className="p-6 sm:p-8 max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-blue-700 mb-8">📚 Your Courses</h1>

            {courses.length === 0 ? (
                <p className="text-gray-600">No courses found.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {courses.map((course: any) => (
                        <CourseCard key={course._id} course={course} />
                    ))}
                </div>
            )}
        </div>
    );


}

export default withAuth(LearnerDashboard, 'learner');
