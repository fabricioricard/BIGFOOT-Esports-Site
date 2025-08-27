
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // Caminhos corretos para Next.js App Router
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    
    // Fallback para estruturas antigas (se existirem)
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      animation: {
        'spin-slow': 'spin 3s linear infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'bounce-gentle': 'bounceGentle 2s infinite',
      },
      backdropBlur: {
        xs: '2px',
      },
      colors: {
        'lol-gold': '#C89B3C',
        'lol-blue': '#0596AA',
        'lol-dark': '#010A13',
        'lol-silver': '#E8E8E8',
        // Cores personalizadas para o tema
        'slate': {
          850: '#1e293b',
          950: '#020617',
        },
        'blue': {
          450: '#60a5fa',
        }
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      borderRadius: {
        'xl': '0.75rem',
        '2xl': '1rem',
      },
      boxShadow: {
        'glow': '0 0 20px rgba(59, 130, 246, 0.15)',
        'glow-lg': '0 0 40px rgba(59, 130, 246, 0.2)',
      }
    },
  },
  plugins: [],
  // Garantir que o Tailwind funcione em produção
  important: false,
  corePlugins: {
    preflight: true,
  }
}
