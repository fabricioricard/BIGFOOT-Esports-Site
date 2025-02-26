import Head from 'next/head';
import Header from '../components/Header';

export default function Team() {
  return (
    <div>
      <Head>
        <title>Nosso Time - BIGFOOT Esports</title>
      </Head>
      <Header />
      <main>
        <h1>Nosso Time</h1>
        <ul>
          <li>Jogador 1 - Posição</li>
          <li>Jogador 2 - Posição</li>
          <li>Jogador 3 - Posição</li>
        </ul>
      </main>
    </div>
  );
}
