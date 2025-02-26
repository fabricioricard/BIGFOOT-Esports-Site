import React from "react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center">
      <header className="w-full p-5 flex justify-between items-center bg-gray-800 shadow-lg">
        <h1 className="text-3xl font-bold">BIGFOOT Esports</h1>
        <nav>
          <ul className="flex space-x-5">
            <li><Link href="/news" className="hover:underline">Notícias</Link></li>
            <li><Link href="/players" className="hover:underline">Jogadores</Link></li>
            <li><Link href="/shop" className="hover:underline">Loja</Link></li>
            <li><Link href="/about" className="hover:underline">Sobre Nós</Link></li>
            <li><Link href="/contact" className="hover:underline">Contato</Link></li>
          </ul>
        </nav>
      </header>
      <main className="flex-1 flex flex-col justify-center items-center text-center p-10">
        <h2 className="text-4xl font-semibold mb-4">Bem-vindo ao BIGFOOT Esports</h2>
        <p className="text-lg max-w-2xl">
          Acompanhe as últimas notícias, conheça nossos jogadores e adquira produtos exclusivos na nossa loja!
        </p>
      </main>
      <footer className="w-full p-4 bg-gray-800 text-center">
        <p>© 2025 BIGFOOT Esports - Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}
