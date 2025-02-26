import Head from 'next/head';
import Header from '../components/Header';
import PlayerCard from '../components/PlayerCard';

export default function Team() {
  const players = [
    { name: 'Jogador 1', role: 'Atacante', image: '/player1.jpg' },
    { name: 'Jogador 2', role: 'Suporte', image: '/player2.jpg' },
    { name: 'Jogador 3', role: 'Defensor', image: '/player3.jpg' },
  ];

  return (
    <div>
      <Head>
        <title>Nosso Time - BIGFOOT Esports</title>
      </Head>
      <Header />
      <main>
        <h1>Nosso Time</h1>
        <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
          {players.map((player, index) => (
            <PlayerCard key={index} name={player.name} role={player.role} image={player.image} />
          ))}
        </div>
      </main>
    </div>
  );
}
