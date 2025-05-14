// pages/test.tsx
import { useState, useEffect } from 'react';
import words from '@/data/words.json';
import TestQuestion from '@/components/TestQuestion';

type Word = {
  id: number;
  word_kh: string;
  pronunciation: string;
  meaning_ja: string;
  category: string;
};

type AnswerResult = {
  question: Word;
  selected: string;
  correct: boolean;
};

export default function TestPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('すべて');
  const [shuffled, setShuffled] = useState<Word[]>([]);
  const [current, setCurrent] = useState(0);
  const [results, setResults] = useState<AnswerResult[]>([]);
  const [finished, setFinished] = useState(false);

  const categories = Array.from(new Set(words.map((w) => w.category)));

  useEffect(() => {
    // 出題リストをカテゴリごとに再生成
    const pool = selectedCategory === 'すべて'
      ? words
      : words.filter(w => w.category === selectedCategory);

    const shuffledList = [...pool].sort(() => Math.random() - 0.5).slice(0, 20);
    setShuffled(shuffledList);
    setCurrent(0);
    setResults([]);
    setFinished(false);
  }, [selectedCategory]);

  const handleAnswer = (selected: string, correct: boolean) => {
    const result: AnswerResult = {
      question: shuffled[current],
      selected,
      correct,
    };
    setResults((prev) => [...prev, result]);

    if (current + 1 < shuffled.length) {
      setCurrent((prev) => prev + 1);
    } else {
      setFinished(true);
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <div style={{ marginBottom: '1rem' }}>
        <a
          href="/"
          style={{
            display: 'inline-block',
            padding: '0.5rem 1rem',
            backgroundColor: '#ccc',
            borderRadius: '6px',
            textDecoration: 'none',
            color: '#000'
          }}
        >
          ← トップに戻る
        </a>
      </div>

      <h1>20問チャレンジ！</h1>

      <div style={{ marginBottom: '1rem' }}>
        <label>
          出題カテゴリ:{' '}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="すべて">すべて</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </label>
      </div>

      {!finished && shuffled.length > 0 && (
        <TestQuestion
          question={shuffled[current]}
          allWords={words}
          onAnswer={handleAnswer}
        />
      )}

      {finished && (
        <div style={{ maxWidth: '700px', margin: '2rem auto', textAlign: 'left' }}>
          <h2>✅ スコア: {results.filter(r => r.correct).length} / {results.length}</h2>

          <h3>📝 回答一覧:</h3>
          <ul>
            {results.map((res, index) => (
              <li key={index} style={{ marginBottom: '1rem' }}>
                <strong>{index + 1}. {res.question.meaning_ja}</strong><br />
                あなたの答え: {res.selected}<br />
                正解: {res.question.pronunciation}<br />
                {res.correct ? '⭕ 正解' : '❌ 不正解'}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
