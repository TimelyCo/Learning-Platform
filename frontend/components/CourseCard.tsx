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
      className="bg-white rounded-xl p-5 shadow-sm border border-gray-200 transition hover:shadow-md"
    >
      <h2 className="text-xl font-semibold text-blue-700 mb-1">{course.title}</h2>
      <p className="text-gray-600 text-sm mb-3">{course.description}</p>

      <span
        onClick={() => router.push(`/learner/course/${course._id}`)}
        className="inline-block text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded cursor-pointer transition-transform transform hover:scale-105"
      >
        Start Learning →
      </span>
    </div>
  );
}
