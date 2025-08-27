// ===================================================
// 2. app/api/news/status/route.js - CRIAR NOVO
// ===================================================
import { NextResponse } from 'next/server'
import { newsDatabase } from '../route.js'

export async function GET() {
  try {
    const now = new Date();
    const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000);
    
    const recentNews = newsDatabase.filter(news => 
      new Date(news.date_published) > oneHourAgo
    );

    const status = {
      cache_loaded: true,
      total_news: newsDatabase.length,
      recent_news: recentNews.length,
      last_update: newsDatabase.length > 0 ? 
        new Date(Math.max(...newsDatabase.map(n => new Date(n.date_published).getTime()))).toISOString() :
        null,
      updating: false,
      healthy: true
    };

    return NextResponse.json({
      success: true,
      status: status
    }, {
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Access-Control-Allow-Origin': '*'
      }
    });

  } catch (error) {
    console.error('❌ Erro no status:', error);
    return NextResponse.json({
      success: false,
      status: {
        cache_loaded: false,
        total_news: 0,
        updating: false,
        healthy: false
      },
      error: error.message
    }, { status: 500 });
  }
}
