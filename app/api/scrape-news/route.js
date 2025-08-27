import { NextResponse } from 'next/server'
import * as cheerio from 'cheerio'

// Cache global para evitar scraping excessivo
let lastScrapeTime = 0
let cachedArticles = []
const SCRAPE_COOLDOWN = 60000 // 1 minuto entre scrapes

export async function POST() {
  try {
    console.log('🚀 Iniciando scraping automatizado do Inven Global LoL...')
    
    // Verificar cooldown
    const now = Date.now()
    if (now - lastScrapeTime < SCRAPE_COOLDOWN && cachedArticles.length > 0) {
      console.log('⏳ Usando cache (cooldown ativo)')
      return NextResponse.json({
        success: true,
        articles: cachedArticles,
        count: cachedArticles.length,
        cached: true,
        timestamp: new Date().toISOString()
      })
    }
    
    // Headers otimizados para o Inven Global
    const headers = {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
      'Accept-Language': 'en-US,en;q=0.9',
      'Accept-Encoding': 'gzip, deflate, br',
      'Connection': 'keep-alive',
      'Upgrade-Insecure-Requests': '1',
      'Sec-Fetch-Dest': 'document',
      'Sec-Fetch-Mode': 'navigate',
      'Sec-Fetch-Site': 'none',
      'Cache-Control': 'no-cache'
    }
    
    // Fazer scraping da página principal do LoL
    console.log('📡 Buscando página principal: https://www.invenglobal.com/lol')
    
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 15000) // 15s timeout
    
    const response = await fetch('https://www.invenglobal.com/lol', {
      headers,
      signal: controller.signal
    })
    
    clearTimeout(timeoutId)
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }
    
    const html = await response.text()
    const $ = cheerio.load(html)
    
    console.log('🔍 Analisando estrutura da página...')
    
    const articleLinks = new Set()
    
    // Seletores específicos para o Inven Global - seção LoL
    const selectors = [
      // Links principais de artigos
      'a[href*="/lol/articles/"]',
      // Cards de notícias
      '.article-card a[href*="/lol/articles/"]',
      '.news-item a[href*="/lol/articles/"]',
      // Links em listas
      '.article-list a[href*="/lol/articles/"]',
      // Featured articles
      '.featured-article a[href*="/lol/articles/"]',
      // Qualquer link que contenha "lol/articles"
      'a[href*="lol/articles"]'
    ]
    
    // Extrair todos os links de artigos
    selectors.forEach(selector => {
      $(selector).each((i, element) => {
        const href = $(element).attr('href')
        if (href) {
          const fullUrl = href.startsWith('http') ? href : `https://www.invenglobal.com${href}`
          if (fullUrl.includes('/lol/articles/') && articleLinks.size < 12) {
            articleLinks.add(fullUrl)
          }
        }
      })
    })
    
    console.log(`🔍 Encontradas ${articleLinks.size} URLs únicas de artigos`)
    
    if (articleLinks.size === 0) {
      // Fallback: tentar buscar links de forma mais agressiva
      console.log('⚠️ Tentando método de fallback...')
      $('a').each((i, element) => {
        const href = $(element).attr('href')
        if (href && href.includes('/lol/articles/')) {
          const fullUrl = href.startsWith('http') ? href : `https://www.invenglobal.com${href}`
          if (articleLinks.size < 10) {
            articleLinks.add(fullUrl)
          }
        }
      })
    }
    
    if (articleLinks.size === 0) {
      throw new Error('Nenhum artigo encontrado na página')
    }
    
    // Processar cada artigo
    const articles = []
    const urlArray = Array.from(articleLinks).slice(0, 1) // Limitar a 1
    
    for (let i = 0; i < urlArray.length; i++) {
      const url = urlArray[i]
      
      try {
        console.log(`📰 Processando ${i + 1}/${urlArray.length}: ${url}`)
        
        const controller2 = new AbortController()
        const timeoutId2 = setTimeout(() => controller2.abort(), 12000)
        
        const articleResponse = await fetch(url, {
          headers: {
            ...headers,
            'Referer': 'https://www.invenglobal.com/lol'
          },
          signal: controller2.signal
        })
        
        clearTimeout(timeoutId2)
        
        if (!articleResponse.ok) {
          console.warn(`⚠️ Erro HTTP ${articleResponse.status} para ${url}`)
          continue
        }
        
        const articleHtml = await articleResponse.text()
        const article$ = cheerio.load(articleHtml)
        
        // Extração de dados do artigo
        let title = ''
        let content = ''
        let imageUrl = null
        let author = null
        let publishDate = null
        
        // Título - múltiplas tentativas
        const titleSelectors = [
          'h1.article-title',
          'h1[class*="title"]',
          '.post-title h1',
          '.article-header h1',
          'h1',
          '[data-testid="title"]',
          '.entry-title'
        ]
        
        for (const selector of titleSelectors) {
          title = article$(selector).first().text().trim()
          if (title && title.length > 5) break
        }
        
        // Conteúdo - múltiplas tentativas
        const contentSelectors = [
          '.article-content',
          '.post-content', 
          '.entry-content',
          '.article-body',
          '[class*="content"]',
          '.inven-article-content'
        ]
        
        for (const selector of contentSelectors) {
          const contentElement = article$(selector).first()
          if (contentElement.length) {
            // Remover scripts e elementos desnecessários
            contentElement.find('script, style, .advertisement, .ad, .share').remove()
            content = contentElement.text().trim()
            if (content && content.length > 50) break
          }
        }
        
        // Imagem - múltiplas tentativas
        const imageSelectors = [
          'meta[property="og:image"]',
          '.article-image img',
          '.featured-image img',
          '.post-image img',
          'img[src*="static.invenglobal.com"]',
          '.article-content img',
          'img[class*="article"]'
        ]
        
        for (const selector of imageSelectors) {
          if (selector.includes('meta')) {
            imageUrl = article$(selector).attr('content')
          } else {
            imageUrl = article$(selector).first().attr('src')
          }
          if (imageUrl) break
        }
        
        // Limpar URL da imagem
        if (imageUrl) {
          if (imageUrl.startsWith('//')) {
            imageUrl = `https:${imageUrl}`
          } else if (imageUrl.startsWith('/')) {
            imageUrl = `https://www.invenglobal.com${imageUrl}`
          }
        }
        
        // Autor
        const authorSelectors = [
          '.author-name',
          '.byline',
          '[class*="author"]',
          '.article-meta .author'
        ]
        
        for (const selector of authorSelectors) {
          author = article$(selector).first().text().trim()
          if (author && author.length > 2) break
        }
        
        // Data de publicação
        const dateSelectors = [
          'meta[property="article:published_time"]',
          '.publish-date',
          '.article-date',
          '[class*="date"]'
        ]
        
        for (const selector of dateSelectors) {
          if (selector.includes('meta')) {
            publishDate = article$(selector).attr('content')
          } else {
            publishDate = article$(selector).first().text().trim()
          }
          if (publishDate) break
        }
        
        // Limpar conteúdo
        if (content) {
          content = content
            .replace(/\s+/g, ' ') // Normalizar espaços
            .replace(/\n+/g, '\n') // Normalizar quebras
            .replace(/[^\w\s\.,!?;:()"'-]/g, '') // Remover caracteres especiais
            .trim()
        }
        
        // Validar dados mínimos
        if (title && title.length > 10 && content && content.length > 50) {
          const article = {
            title,
            content: content.length > 1500 ? content.substring(0, 1500) + '...' : content,
            url,
            image_url: imageUrl,
            author: author || 'Inven Global',
            date_published: publishDate || new Date().toISOString(),
            scraped_at: new Date().toISOString()
          }
          
          articles.push(article)
          console.log(`✅ Extraído: "${title.substring(0, 50)}..."`)
        } else {
          console.warn(`⚠️ Dados insuficientes para ${url} (título: ${title?.length || 0}, conteúdo: ${content?.length || 0})`)
        }
        
        // Rate limiting
        if (i < urlArray.length - 1) {
          await new Promise(resolve => setTimeout(resolve, 800))
        }
        
      } catch (error) {
        console.error(`❌ Erro ao processar ${url}:`, error.message)
        continue
      }
    }
    
    // Atualizar cache
    lastScrapeTime = now
    cachedArticles = articles
    
    console.log(`🎉 Scraping concluído! ${articles.length} artigos válidos extraídos`)
    
    if (articles.length === 0) {
      return NextResponse.json({
        success: false,
        error: 'Nenhum artigo válido foi extraído',
        articles: [],
        count: 0,
        attempted: urlArray.length,
        debug: {
          total_links_found: articleLinks.size,
          processed: urlArray.length
        }
      }, { status: 404 })
    }
    
    return NextResponse.json({
      success: true,
      articles,
      count: articles.length,
      attempted: urlArray.length,
      timestamp: new Date().toISOString(),
      source: 'Inven Global LoL Section',
      cache_updated: true
    })
    
  } catch (error) {
    console.error('❌ Erro crítico no scraping:', error)
    
    // Retornar cache se disponível
    if (cachedArticles.length > 0) {
      console.log('🔄 Retornando dados do cache devido ao erro')
      return NextResponse.json({
        success: true,
        articles: cachedArticles,
        count: cachedArticles.length,
        cached: true,
        error: `Erro no scraping: ${error.message}`,
        timestamp: new Date().toISOString()
      })
    }
    
    return NextResponse.json({
      success: false,
      error: 'Falha completa no scraping',
      message: error.message,
      articles: [],
      count: 0,
      timestamp: new Date().toISOString()
    }, { status: 500 })
  }
}

// GET para informações
export async function GET() {
  return NextResponse.json({
    message: 'API de Scraping Automatizado - Inven Global LoL',
    endpoint: 'POST /api/scrape-news',
    description: 'Extrai automaticamente as notícias mais recentes da seção LoL do Inven Global',
    features: [
      'Monitoramento automático do Inven Global',
      'Cache inteligente com cooldown',
      'Múltiplos seletores para máxima compatibilidade',
      'Extração de título, conteúdo, imagem e metadados',
      'Rate limiting para evitar bloqueios',
      'Sistema de fallback robusto',
      'Limpeza automática de conteúdo'
    ],
    target_url: 'https://www.invenglobal.com/lol',
    cache_cooldown: `${SCRAPE_COOLDOWN / 1000}s`,
    max_articles: 10,
    current_cache: {
      articles: cachedArticles.length,
      last_update: lastScrapeTime > 0 ? new Date(lastScrapeTime).toISOString() : null
    }
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
