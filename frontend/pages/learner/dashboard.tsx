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
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-4">Your Courses</h1>
            {courses.length === 0 ? (
                <p>No courses found.</p>
            ) : (
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {courses.map((course: any) => (
                        <CourseCard key={course._id} course={course} />
                    ))}
                </ul>

            )}
        </div>
    );

}

export default withAuth(LearnerDashboard, 'learner');
