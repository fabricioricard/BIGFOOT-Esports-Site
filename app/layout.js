// app/layout.js
import './globals.css'

export const metadata = {
  title: 'Sistema de Notícias LoL',
  description: 'Notícias automáticas e atualizadas sobre League of Legends',
  viewport: 'width=device-width, initial-scale=1',
  charset: 'utf-8',
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
        <link rel="icon" href="/favicon.ico" />
        {/* Script simplificado para tratamento básico de erros */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Tratamento global simplificado de erros
              window.addEventListener('error', function(event) {
                console.error('Erro JavaScript:', event.error);
                // Não deixar o erro quebrar a aplicação
                event.preventDefault();
                return false;
              });

              window.addEventListener('unhandledrejection', function(event) {
                console.error('Promise rejeitada:', event.reason);
                event.preventDefault();
              });

              // Log de inicialização
              console.log('✅ Sistema de Notícias LoL iniciado');
            `,
          }}
        />
      </head>
      <body className="min-h-screen bg-slate-900 text-slate-200 antialiased">
        {children}
      </body>
    </html>
  )
}
