// pages/index.tsx
import { useState } from 'react';
import Image from 'next/image';
import WordCard from '@/components/WordCard';
import words from '@/data/words.json';

// 単語データの型定義
type Word = {
  id: number;
  word_kh: string;
  pronunciation: string;
  meaning_ja: string;
  category: string;
};

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // ユニークなカテゴリ一覧を抽出
  const categories = Array.from(new Set(words.map((word) => word.category)));

  // フィルタリングされた単語リスト
  const filteredWords = selectedCategory
    ? words.filter((word) => word.category === selectedCategory)
    : words;

  return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      {/* ロゴとタイトル */}
      <Image
        src="/khmetanlogo.png"
        alt="くめたんロゴ"
        width={200}
        height={200}
      />
      <h1 style={{ fontSize: '1.5rem', marginTop: '1rem' }}>
        くめたん - クメール語単語帳
      </h1>
      <div style={{ margin: '1rem' }}>
        <a
          href="/test"
          style={{
            display: 'inline-block',
            padding: '0.5rem 1rem',
            backgroundColor: '#ffd700',
            color: '#fff',
            borderRadius: '6px',
            textDecoration: 'none'
          }}
        >
          テストモードへ
        </a>
      </div>
      {/* カテゴリフィルター */}
      <div style={{ margin: '2rem 0' }}>
        <button
          onClick={() => setSelectedCategory(null)}
          style={{
            margin: '0.5rem',
            backgroundColor: selectedCategory === null ? '#ccc' : 'transparent',
            border: '1px solid #aaa',
            borderRadius: '6px',
            padding: '0.3rem 1rem'
          }}
        >
          すべて表示
        </button>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            style={{
              margin: '0.5rem',
              backgroundColor: selectedCategory === category ? '#ccc' : 'transparent',
              border: '1px solid #aaa',
              borderRadius: '6px',
              padding: '0.3rem 1rem'
            }}
          >
            {category}
          </button>
        ))}
      </div>

      {/* 単語カード表示 */}
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        {filteredWords.map((word: Word) => (
          <WordCard
            key={word.id}
            wordKh={word.word_kh}
            pronunciation={word.pronunciation}
            meaningJa={word.meaning_ja}
          />
        ))}
      </div>
    </div>
  );
}
