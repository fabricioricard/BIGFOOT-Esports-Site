export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white flex items-center justify-center">
      <div className="text-center">
        <div className="text-6xl mb-4">🔍</div>
        <h2 className="text-2xl font-bold mb-4">Página não encontrada</h2>
        <p className="text-gray-300 mb-6">A página que você procura não existe.</p>
        <a 
          href="/" 
          className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-medium transition-colors inline-block"
        >
          🏠 Voltar ao início
        </a>
      </div>
    </div>
  )
}
