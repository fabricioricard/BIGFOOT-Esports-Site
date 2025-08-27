// ===================================================
// 1. app/api/news/route.js - CORRIGIDO
// ===================================================
import { NextResponse } from 'next/server'

// Banco de dados em memória compartilhado
let newsDatabase = []

export async function GET() {
  try {
    // Calcular estatísticas
    const stats = {
      total: newsDatabase.length,
      lastUpdate: newsDatabase.length > 0 ? 
        new Date(Math.max(...newsDatabase.map(n => new Date(n.date_published).getTime()))).toISOString() :
        null
    };

    return NextResponse.json({
      success: true,
      data: newsDatabase, // ← CORRIGIDO: mudou de 'news' para 'data'
      count: newsDatabase.length,
      stats: stats,
      last_update: stats.lastUpdate
    }, {
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Access-Control-Allow-Origin': '*'
      }
    });

  } catch (error) {
    console.error('❌ Erro ao buscar notícias:', error);
    return NextResponse.json(
      { 
        success: false,
        error: 'Erro ao buscar notícias',
        message: error.message 
      },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const { articles } = await request.json();
    
    if (!articles || !Array.isArray(articles)) {
      return NextResponse.json(
        { 
          success: false,
          error: 'Articles array is required' 
        },
        { status: 400 }
      );
    }
    
    // Adicionar ao banco de dados (evitando duplicatas por URL)
    let added = 0;
    let updated = 0;

    articles.forEach(article => {
      const existingIndex = newsDatabase.findIndex(n => n.url === article.url);
      if (existingIndex >= 0) {
        newsDatabase[existingIndex] = article; // Atualizar
        updated++;
      } else {
        newsDatabase.push(article); // Adicionar novo
        added++;
      }
    });
    
    // Manter apenas as 50 notícias mais recentes
    newsDatabase = newsDatabase
      .sort((a, b) => new Date(b.date_published) - new Date(a.date_published))
      .slice(0, 50);
    
    console.log(`✅ ${added} adicionadas, ${updated} atualizadas. Total: ${newsDatabase.length}`);
    
    return NextResponse.json({
      success: true,
      added: added,
      updated: updated,
      total: newsDatabase.length,
      saved: articles.length
    });
    
  } catch (error) {
    console.error('❌ Erro ao salvar notícias:', error);
    return NextResponse.json(
      { 
        success: false,
        error: 'Erro ao salvar notícias',
        message: error.message 
      },
      { status: 500 }
    );
  }
}

// OPTIONS para CORS
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}

// Exportar o banco de dados para uso em outras rotas
export { newsDatabase };
