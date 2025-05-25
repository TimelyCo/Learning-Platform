import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import api from '../../../utils/api';
import { getToken } from '../../../utils/auth';
import ChapterViewer from '../../../components/ChapterViewer';

export default function CoursePage() {
  const router = useRouter();
  const { id } = router.query;
  const [course, setCourse] = useState<any>(null);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!id) return;
    api.get(`/learn/course/${id}`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    })
      .then(res => setCourse(res.data))
      .catch(err => alert('Failed to load course'));
  }, [id]);

  const handleAnswer = (questionId: string, value: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const submitProgress = async (chapterId: string) => {
    try {
      await api.post('/learn/progress', {
        courseId: id,
        chapterId,
        score: Object.keys(answers).length, // simple score logic for now
      }, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      alert('Progress saved!');
    } catch {
      alert('Failed to save progress');
    }
  };

  if (!course) return <div className="p-8">Loading...</div>;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-blue-700 mb-4">{course.title}</h1>
      {course.sections.map((section: any) => (
        <div key={section._id}>
          <h2 className="text-lg font-semibold text-blue-600">{section.title}</h2>
          {section.units.map((unit: any) => (
            <div key={unit._id} className="pl-4">
              <h3 className="font-semibold">{unit.title}</h3>
              {unit.chapters.map((chapter: any) => (
                <div key={chapter._id}>
                  <ChapterViewer chapter={chapter} onAnswer={handleAnswer} />
                  <button
                    onClick={() => submitProgress(chapter._id)}
                    className="mb-6 px-4 py-2 bg-green-600 text-white rounded"
                  >
                    Submit Chapter
                  </button>
                </div>
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
