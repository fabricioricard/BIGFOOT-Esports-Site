import Head from 'next/head';
import Header from '../components/Header';

export default function Events() {
  return (
    <div>
      <Head>
        <title>Eventos - BIGFOOT Esports</title>
      </Head>
      <Header />
      <main>
        <h1>Próximos Eventos</h1>
        <p>Evento 1 - Data: TBD</p>
        <p>Evento 2 - Data: TBD</p>
      </main>
    </div>
  );
}
