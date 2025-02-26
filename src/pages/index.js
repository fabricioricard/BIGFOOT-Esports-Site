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
        <div style={{ background: 'url(/banner.jpg)', backgroundSize: 'cover', padding: '4rem 0' }}>
          <h1>Bem-vindo à BIGFOOT Esports</h1>
          <p style={{ fontSize: '1.2rem', maxWidth: '600px', margin: '1rem auto' }}>
            Sua casa para notícias, eventos e competições de esports de alto nível!
          </p>
        </div>
      </main>
    </div>
  );
}