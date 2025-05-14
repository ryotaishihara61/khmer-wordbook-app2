// components/WordCard.tsx
import React, { useState } from 'react';

type WordCardProps = {
  wordKh: string;
  pronunciation: string;
  meaningJa: string;
};

const WordCard: React.FC<WordCardProps> = ({ wordKh, pronunciation, meaningJa }) => {
  const [showAnswer, setShowAnswer] = useState(false);

  return (
    <div style={{
      border: '1px solid #ccc',
      borderRadius: '12px',
      padding: '1rem',
      margin: '1rem 0',
      backgroundColor: '#f9f9f9'
    }}>
      <div style={{ fontSize: '1.0rem', marginBottom: '0.5rem' }}>
        <strong>日本語 ＝ </strong> {meaningJa}
      </div>

      {showAnswer && (
        <div style={{ marginBottom: '0.5rem' }}>
          <div><strong>クメール語:</strong> {wordKh}</div>
          <div><strong>読み方:</strong> {pronunciation}</div>
        </div>
      )}

      <button onClick={() => setShowAnswer(!showAnswer)}>
        {showAnswer ? '答えを非表示' : '答えを表示'}
      </button>
    </div>
  );
};

export default WordCard;
