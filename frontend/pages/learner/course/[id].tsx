import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import api from '../../../utils/api';
import { getToken } from '../../../utils/auth';
import ChapterViewer from '../../../components/ChapterViewer';
import toast from 'react-hot-toast';
import Layout from '../../../components/Layout';

export default function CoursePage() {
  const router = useRouter();
  const { id } = router.query;

  const [course, setCourse] = useState<any>(null);
  const [userProgress, setUserProgress] = useState<any>(null);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      try {
        const courseRes = await api.get(`/learn/course/${id}`, {
          headers: { Authorization: `Bearer ${getToken()}` },
        });
        setCourse(courseRes.data);

        const progressRes = await api.get(`/learn/progress/${id}`, {
          headers: { Authorization: `Bearer ${getToken()}` },
        });
        setUserProgress(progressRes.data);
      } catch (err: any) {
        toast.error('Failed to load course or progress.');
        router.push('/learner/dashboard');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleAnswer = (questionId: string, value: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const submitProgress = async (chapterId: string) => {
    try {
      const score = Object.entries(answers).filter(([questionId, userAnswer]) =>
        course.sections.some(section =>
          section.units.some(unit =>
            unit.chapters.some(chap =>
              chap._id === chapterId &&
              chap.questions.some(q => q._id === questionId && q.correctAnswer === userAnswer)
            )
          )
        )
      ).length;

      await api.post('/learn/progress', {
        courseId: id,
        chapterId,
        score,
      }, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });

      toast.success(`Progress saved! Score: ${score}`);
    } catch {
      toast.error('Failed to save progress');
    }
  };

  if (loading) return <Layout><div className="p-8">Loading course...</div></Layout>;

  if (!course) return null;

  return (
    <Layout>
      <div className="p-4 sm:p-8">
        <h1 className="text-2xl font-bold text-blue-700 mb-4">{course.title}</h1>

        {course.sections.map((section: any) => (
          <div key={section._id}>
            <h2 className="text-lg font-semibold text-blue-600 mb-2">{section.title}</h2>

            {section.units.map((unit: any) => (
              <div key={unit._id} className="pl-4 mb-4">
                <h3 className="font-semibold">{unit.title}</h3>

                {unit.chapters.map((chapter: any) => {
                  const completed = userProgress?.completedChapters?.includes(chapter._id);
                  const scoreObj = userProgress?.scores?.find((s: any) => s.chapter === chapter._id);
                  const score = scoreObj?.score ?? null;

                  return (
                    <div key={chapter._id} className="mt-4 border-l pl-4">
                      <div className="flex justify-between items-center">
                        <h4 className="text-md font-semibold">{chapter.title}</h4>
                        {completed && (
                          <span className="text-green-600 text-sm">
                            ✅ Completed {score !== null ? `(${score} pts)` : ''}
                          </span>
                        )}
                      </div>

                      <ChapterViewer chapter={chapter} onAnswer={handleAnswer} />

                      <button
                        onClick={() => submitProgress(chapter._id)}
                        className="mb-6 px-5 py-2 bg-green-600 hover:bg-green-700 text-white rounded shadow-sm transition duration-200"
                      >
                        ✅ Submit Chapter
                      </button>

                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        ))}
      </div>
    </Layout>
  );
}
