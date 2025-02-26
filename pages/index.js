import Head from 'next/head';
import Header from '../components/Header';

export default function Home() {
  return (
    <div>
      <Head>
        <title>BIGFOOT Esports</title>
        <meta name="description" content="Bem-vindo ao site oficial da BIGFOOT Esports" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main>
        <h1>Bem-vindo à BIGFOOT Esports</h1>
        <p>Sua casa para notícias, eventos e competições de esports!</p>
      </main>
    </div>
  );
}
