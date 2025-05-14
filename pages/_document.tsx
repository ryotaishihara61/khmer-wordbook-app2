// pages/_document.tsx
import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="ja">
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="description" content="くめたん - クメール語単語帳アプリ" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
