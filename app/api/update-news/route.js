// app/api/update-news/route.js
import { NextResponse } from 'next/server'

export async function POST(request) {
  try {
    console.log('🚀 Iniciando workflow completo de atualização de notícias...')
    
    const startTime = Date.now()
    let scrapedArticles = []
    let translatedArticles = []
    let savedCount = 0
    
    // Obter a URL base da requisição atual
    const baseUrl = new URL(request.url).origin
    
    // Passo 1: Fazer scraping das notícias
    console.log('📡 Passo 1: Fazendo scraping...')
    try {
      const scrapeResponse = await fetch(`${baseUrl}/api/scrape-news`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }
      })
      
      if (!scrapeResponse.ok) {
        throw new Error(`Scraping failed with status: ${scrapeResponse.status}`)
      }
      
      const scrapeData = await scrapeResponse.json()
      
      if (scrapeData.success && scrapeData.articles) {
        scrapedArticles = scrapeData.articles
        console.log(`✅ Scraping concluído: ${scrapedArticles.length} artigos`)
      } else {
        throw new Error(scrapeData.error || 'Falha no scraping')
      }
    } catch (error) {
      console.error('❌ Erro no scraping:', error)
      return NextResponse.json({
        success: false,
        error: 'Falha no scraping de notícias',
        details: error.message,
        step: 'scraping'
      }, { status: 500 })
    }
    
    // Passo 2: Traduzir as notícias
    if (scrapedArticles.length > 0) {
      console.log('🌐 Passo 2: Traduzindo artigos...')
      try {
        const translateResponse = await fetch(`${baseUrl}/api/translate-news`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            articles: scrapedArticles
          })
        })
        
        if (!translateResponse.ok) {
          throw new Error(`Translation failed with status: ${translateResponse.status}`)
        }
        
        const translateData = await translateResponse.json()
        
        if (translateData.success && translateData.articles) {
          translatedArticles = translateData.articles
          console.log(`✅ Tradução concluída: ${translatedArticles.length} artigos`)
        } else {
          throw new Error(translateData.error || 'Falha na tradução')
        }
      } catch (error) {
        console.error('❌ Erro na tradução:', error)
        // Continuar com artigos não traduzidos se a tradução falhar
        translatedArticles = scrapedArticles.map(article => ({
          ...article,
          id: Math.random().toString(36).substr(2, 9),
          author: 'Inven Global',
          date_published: new Date().toISOString(),
          source: 'Inven Global',
          translated: false,
          language: 'en',
          translation_error: true
        }))
        console.log(`⚠️ Usando artigos não traduzidos: ${translatedArticles.length}`)
      }
    }
    
    // Passo 3: Salvar no banco de dados
    if (translatedArticles.length > 0) {
      console.log('💾 Passo 3: Salvando no banco de dados...')
      try {
        const saveResponse = await fetch(`${baseUrl}/api/news`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            articles: translatedArticles
          })
        })
        
        if (!saveResponse.ok) {
          throw new Error(`Saving failed with status: ${saveResponse.status}`)
        }
        
        const saveData = await saveResponse.json()
        
        if (saveData.success) {
          savedCount = saveData.added + saveData.updated || saveData.total || 0
          console.log(`✅ Salvamento concluído: ${savedCount} artigos (${saveData.added} novos, ${saveData.updated} atualizados)`)
        } else {
          throw new Error(saveData.error || 'Falha ao salvar')
        }
      } catch (error) {
        console.error('❌ Erro ao salvar:', error)
        return NextResponse.json({
          success: false,
          error: 'Falha ao salvar notícias',
          details: error.message,
          step: 'saving',
          scraped: scrapedArticles.length,
          translated: translatedArticles.length
        }, { status: 500 })
      }
    }
    
    const endTime = Date.now()
    const duration = Math.round((endTime - startTime) / 1000)
    
    console.log(`🎉 Workflow completo! Processados ${savedCount} artigos em ${duration}s`)
    
    return NextResponse.json({
      success: true,
      message: 'Workflow de atualização concluído com sucesso',
      stats: {
        scraped: scrapedArticles.length,
        translated: translatedArticles.filter(a => a.translated).length,
        failed_translation: translatedArticles.filter(a => a.translation_error).length,
        saved: savedCount,
        duration_seconds: duration
      },
      articles: translatedArticles,
      timestamp: new Date().toISOString()
    }, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
      }
    })
    
  } catch (error) {
    console.error('❌ Erro no workflow:', error)
    return NextResponse.json({
      success: false,
      error: 'Erro no workflow de atualização',
      details: error.message,
      timestamp: new Date().toISOString()
    }, { 
      status: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
      }
    })
  }
}

// Endpoint GET para informações sobre o workflow
export async function GET() {
  return NextResponse.json({
    message: 'API de Workflow Completo - Sistema de Notícias LoL',
    endpoint: 'POST /api/update-news',
    description: 'Executa o workflow completo: scraping → tradução → salvamento',
    steps: [
      '1. Scraping do Inven Global (/api/scrape-news)',
      '2. Tradução para português (/api/translate-news)', 
      '3. Salvamento no banco (/api/news)'
    ],
    features: [
      'Workflow automatizado completo',
      'Tratamento de erros em cada etapa',
      'Fallback para artigos não traduzidos',
      'Estatísticas detalhadas',
      'Medição de performance',
      'Logs detalhados',
      'URL base dinâmica'
    ],
    usage: {
      method: 'POST',
      response: {
        success: true,
        stats: 'Estatísticas do processamento',
        articles: 'Artigos processados',
        timestamp: 'Data/hora da execução'
      }
    },
    recommended_schedule: 'A cada 2-4 horas para manter conteúdo fresco'
  })
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
  })
}
