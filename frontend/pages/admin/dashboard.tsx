import { useState } from 'react';
import api from '../../utils/api';
import { getToken } from '../../utils/auth';
import withAuth from '../../components/withAuth';

function AdminDashboard() {
  const [courseTitle, setCourseTitle] = useState('');
  const [description, setDescription] = useState('');
  const [courseId, setCourseId] = useState('');
  const [sectionTitle, setSectionTitle] = useState('');
  const [sectionId, setSectionId] = useState('');
  const [unitTitle, setUnitTitle] = useState('');
  const [unitId, setUnitId] = useState('');
  const [chapterTitle, setChapterTitle] = useState('');
  const [chapterContent, setChapterContent] = useState('');
  const [question, setQuestion] = useState('');
  const [type, setType] = useState('mcq');
  const [options, setOptions] = useState('');
  const [answer, setAnswer] = useState('');

  const token = getToken();

  const post = async (endpoint: string, data: object) => {
    try {
      const res = await api.post(endpoint, data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('Success ✅');
      return res.data;
    } catch (err: any) {
      alert(err.response?.data?.message || 'Error ❌');
    }
  };

  return (
    <div className="p-8 space-y-6">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>

      {/* Course */}
      <div>
        <h2 className="font-semibold">Create Course</h2>
        <input className="border p-2 mr-2" placeholder="Title" onChange={(e) => setCourseTitle(e.target.value)} />
        <input className="border p-2 mr-2" placeholder="Description" onChange={(e) => setDescription(e.target.value)} />
        <button className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={async () => {
            const data = await post('/admin/courses', { title: courseTitle, description });
            setCourseId(data?._id || '');
          }}>
          Create
        </button>
      </div>

      {/* Section */}
      <div>
        <h2 className="font-semibold">Add Section</h2>
        <input className="border p-2 mr-2" placeholder="Section Title" onChange={(e) => setSectionTitle(e.target.value)} />
        <button className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={async () => {
            const data = await post('/admin/sections', { courseId, title: sectionTitle });
            setSectionId(data?._id || '');
          }}>
          Add
        </button>
      </div>

      {/* Unit */}
      <div>
        <h2 className="font-semibold">Add Unit</h2>
        <input className="border p-2 mr-2" placeholder="Unit Title" onChange={(e) => setUnitTitle(e.target.value)} />
        <button className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={async () => {
            const data = await post('/admin/units', { sectionId, title: unitTitle });
            setUnitId(data?._id || '');
          }}>
          Add
        </button>
      </div>

      {/* Chapter */}
      <div>
        <h2 className="font-semibold">Add Chapter</h2>
        <input className="border p-2 mr-2" placeholder="Chapter Title" onChange={(e) => setChapterTitle(e.target.value)} />
        <input className="border p-2 mr-2" placeholder="Chapter Content" onChange={(e) => setChapterContent(e.target.value)} />
        <button className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={async () => {
            const data = await post('/admin/chapters', { unitId, title: chapterTitle, content: chapterContent });
            setChapterTitle('');
            setChapterContent('');
            setChapterTitle(data?._id || '');
          }}>
          Add
        </button>
      </div>

      {/* Question */}
      <div>
        <h2 className="font-semibold">Add Question</h2>
        <input className="border p-2 mr-2" placeholder="Question Text" onChange={(e) => setQuestion(e.target.value)} />
        <input className="border p-2 mr-2" placeholder="Options (comma separated)" onChange={(e) => setOptions(e.target.value)} />
        <input className="border p-2 mr-2" placeholder="Correct Answer" onChange={(e) => setAnswer(e.target.value)} />
        <select className="border p-2 mr-2" onChange={(e) => setType(e.target.value)} value={type}>
          <option value="mcq">MCQ</option>
          <option value="fill">Fill in the Blank</option>
          <option value="text">Text</option>
        </select>
        <button className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => {
            post('/admin/questions', {
              chapterId: chapterTitle, // misused as ID holder
              questionText: question,
              options: options.split(',').map(opt => opt.trim()),
              correctAnswer: answer,
              type,
            });
          }}>
          Add
        </button>
      </div>
    </div>
  );
}


export default withAuth(AdminDashboard, 'admin');