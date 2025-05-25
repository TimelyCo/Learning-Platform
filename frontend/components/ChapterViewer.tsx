type Props = {
  chapter: any;
  onAnswer: (questionId: string, value: string) => void;
};

export default function ChapterViewer({ chapter, onAnswer }: Props) {
  return (
    <div className="pl-6 border-l-2 border-blue-200 mt-4 mb-8">
      <h4 className="text-lg font-semibold text-blue-800 mb-2">{chapter.title}</h4>
      <p className="text-gray-700 mb-4">{chapter.content}</p>

      {chapter.questions.map((q: any) => (
        <div key={q._id} className="mb-6 p-4 bg-gray-50 rounded shadow-sm border border-gray-200">
          <p className="font-medium mb-2 text-gray-800">{q.questionText}</p>

          {/* MCQ */}
          {q.type === 'mcq' && q.options.map((opt: string, idx: number) => (
            <label key={idx} className="block mb-1 cursor-pointer">
              <input
                type="radio"
                name={q._id}
                value={opt}
                onChange={(e) => onAnswer(q._id, e.target.value)}
                className="mr-2 accent-blue-600"
              />
              <span className="text-gray-700">{opt}</span>
            </label>
          ))}

          {/* Fill/Text */}
          {(q.type === 'fill' || q.type === 'text') && (
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded mt-1"
              placeholder="Type your answer..."
              onChange={(e) => onAnswer(q._id, e.target.value)}
            />
          )}
        </div>
      ))}
    </div>
  );
}
