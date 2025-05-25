import { useRouter } from 'next/router';

type Props = {
  course: {
    _id: string;
    title: string;
    description: string;
  };
};

export default function CourseCard({ course }: Props) {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`/learner/course/${course._id}`)}
      className="bg-white border border-gray-200 p-4 rounded-lg shadow hover:shadow-md transition cursor-pointer"
    >
      <h2 className="text-xl font-bold text-blue-700">{course.title}</h2>
      <p className="text-gray-600">{course.description}</p>
    </div>
  );
}
