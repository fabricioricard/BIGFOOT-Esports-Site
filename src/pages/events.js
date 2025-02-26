import Head from 'next/head';
import Header from '../components/Header';

export default function Events() {
  const events = [
    { title: 'Torneio BIGFOOT 2025', date: '15/03/2025', game: 'CS:GO' },
    { title: 'Copa Pé Grande', date: '20/04/2025', game: 'Valorant' },
  ];

  return (
    <div>
      <Head>
        <title>Eventos - BIGFOOT Esports</title>
      </Head>
      <Header />
      <main>
        <h1>Próximos Eventos</h1>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
          {events.map((event, index) => (
            <div key={index} style={{ background: '#1a1a1a', padding: '1rem', margin: '1rem', borderRadius: '8px', width: '300px' }}>
              <h2 style={{ color: '#00ffcc', margin: '0.5rem 0' }}>{event.title}</h2>
              <p>Data: {event.date}</p>
              <p>Jogo: {event.game}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}