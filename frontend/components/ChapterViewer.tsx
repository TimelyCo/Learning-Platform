type Props = {
  chapter: any;
  onAnswer: (questionId: string, value: string) => void;
};

export default function ChapterViewer({ chapter, onAnswer }: Props) {
  return (
    <div className="pl-6 border-l mt-2 mb-6">
      <h4 className="font-semibold text-lg">{chapter.title}</h4>
      <p className="mb-2 text-gray-700">{chapter.content}</p>

      {chapter.questions.map((q: any) => (
        <div key={q._id} className="mb-2">
          <p className="font-medium">{q.questionText}</p>

          {q.type === 'mcq' && q.options.map((opt: string, idx: number) => (
            <label key={idx} className="block">
              <input
                type="radio"
                name={q._id}
                value={opt}
                onChange={(e) => onAnswer(q._id, e.target.value)}
                className="mr-2"
              />
              {opt}
            </label>
          ))}

          {(q.type === 'fill' || q.type === 'text') && (
            <input
              className="border p-1 mt-1 w-full"
              onChange={(e) => onAnswer(q._id, e.target.value)}
            />
          )}
        </div>
      ))}
    </div>
  );
}
