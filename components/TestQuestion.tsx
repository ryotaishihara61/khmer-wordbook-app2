// components/TestQuestion.tsx
import { useState, useEffect } from 'react';

type Word = {
  id: number;
  word_kh: string;
  pronunciation: string;
  meaning_ja: string;
  category: string;
};

type Props = {
  question: Word;
  allWords: Word[];
  onAnswer: (selected: string, correct: boolean) => void;
};

const TestQuestion: React.FC<Props> = ({ question, allWords, onAnswer }) => {
  const [options, setOptions] = useState<string[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  useEffect(() => {
    const others = allWords.filter(w => w.id !== question.id);
    const shuffled = others.sort(() => Math.random() - 0.5).slice(0, 3);
    const choices = [...shuffled.map(w => w.pronunciation), question.pronunciation]
      .sort(() => Math.random() - 0.5);
    setOptions(choices);
    setSelected(null);
    setIsCorrect(null);
  }, [question]);

  const handleSelect = (choice: string) => {
    setSelected(choice);
    const correct = choice === question.pronunciation;
    setIsCorrect(correct);
  };

  const handleNext = () => {
    if (selected !== null && isCorrect !== null) {
      onAnswer(selected, isCorrect); // ← これが test.tsx に結果を渡す部分！
    }
  };

  return (
    <div style={{ margin: '2rem auto', maxWidth: '400px' }}>
      <h2 style={{ fontSize: '1.5rem' }}>{question.meaning_ja}</h2>

      <div style={{ margin: '1rem 0' }}>
        {options.map((opt) => (
          <button
            key={opt}
            onClick={() => handleSelect(opt)}
            disabled={selected !== null}
            style={{
              margin: '0.3rem',
              padding: '0.5rem 1rem',
              backgroundColor: selected === opt
                ? opt === question.pronunciation
                  ? '#c8f7c5'
                  : '#f7c5c5'
                : '#f0f0f0'
            }}
          >
            {opt}
          </button>
        ))}
      </div>

      {selected && (
        <div>
          <p>
            {isCorrect
              ? '⭕ 正解！'
              : `❌ 不正解。正解: ${question.pronunciation}（${question.word_kh}）`}
          </p>
          <button onClick={handleNext} style={{ marginTop: '1rem' }}>
            次の問題へ
          </button>
        </div>
      )}
    </div>
  );
};

export default TestQuestion;
