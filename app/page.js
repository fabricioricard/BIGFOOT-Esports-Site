"use client";
import React, { useState, useEffect } from 'react';

const NewsSystem = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [debugInfo, setDebugInfo] = useState('');
  const [selectedNews, setSelectedNews] = useState(null);
  const [lastUpdate, setLastUpdate] = useState(null);
  const [apiStatus, setApiStatus] = useState(null);
  const [autoRefreshActive, setAutoRefreshActive] = useState(true);
  const [lastAutoCheck, setLastAutoCheck] = useState(null);

  // URL da API - CORRIGIDA para sempre usar /api
  const API_BASE_URL = '/api';

  // Função para buscar notícias da API
  const fetchNewsFromAPI = async () => {
    try {
      setDebugInfo('Carregando notícias da API...');
      
      const response = await fetch(`${API_BASE_URL}/news`, {
        headers: {
          'Cache-Control': 'no-cache'
        }
      });
      
      if (!response.ok) {
        throw new Error(`Erro HTTP: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.success) {
        // CORRIGIDO: usar data.data em vez de data.news
        const articles = data.data || [];
        setDebugInfo(`✅ ${articles.length} notícias carregadas da API!`);
        return articles;
      } else {
        throw new Error(data.error || 'Erro desconhecido da API');
      }
      
    } catch (error) {
      setDebugInfo(`❌ Erro: ${error.message}`);
      // Fallback para dados locais se a API falhar
      return getFallbackNews();
    }
  };

  // Função para obter status da API
  const fetchAPIStatus = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/news/status`);
      if (response.ok) {
        const data = await response.json();
        setApiStatus(data.status);
      }
    } catch (error) {
      console.log('Status da API não disponível');
      setApiStatus({ cache_loaded: false, healthy: false });
    }
  };

  // Função para executar workflow completo - CORRIGIDA
  const runWorkflow = async () => {
    try {
      setDebugInfo('🔄 Executando workflow completo...');
      setLoading(true);
      
      const response = await fetch(`${API_BASE_URL}/update-news`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      
      if (!response.ok) {
        throw new Error(`Erro HTTP: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.success) {
        setDebugInfo(`✅ Workflow concluído! ${data.stats.scraped} processados, ${data.stats.translated} traduzidos`);
        
        // Recarregar notícias após workflow
        setTimeout(() => {
          loadNews();
        }, 2000);
        
        return true;
      } else {
        throw new Error(data.error || 'Workflow falhou');
      }
    } catch (error) {
      setDebugInfo(`❌ Erro no workflow: ${error.message}`);
      setError(`Erro ao executar workflow: ${error.message}`);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Dados de fallback caso a API não esteja disponível
  const getFallbackNews = () => {
    return [
      {
        id: 'fallback-1',
        title: "🦶 BigFoot eSports - Sistema Carregando",
        content: "O sistema está inicializando e buscando as notícias mais recentes do League of Legends. Execute o workflow completo para carregar as notícias do Inven Global traduzidas automaticamente.",
        url: "#",
        image_url: null,
        author: "Sistema BigFoot",
        date_published: new Date().toISOString(),
        source: "BigFoot eSports",
        translated: false
      }
    ];
  };

  const loadNews = async () => {
    setLoading(true);
    setError('');
    setDebugInfo('Iniciando busca por notícias...');
    
    try {
      const newsData = await fetchNewsFromAPI();
      setNews(newsData);
      setLastUpdate(new Date());
      setError('');
    } catch (err) {
      setError(`Erro ao carregar notícias: ${err.message}`);
      setDebugInfo('❌ Falha na busca automática');
      // Usar dados de fallback
      setNews(getFallbackNews());
    } finally {
      setLoading(false);
    }
  };

  // Sistema de auto-refresh simplificado
  useEffect(() => {
    // Carregamento inicial
    loadNews();
    fetchAPIStatus();
    
    // Atualizar status da API periodicamente
    const statusInterval = setInterval(fetchAPIStatus, 30000);
    
    // Auto-refresh das notícias se ativo
    let newsInterval;
    if (autoRefreshActive) {
      newsInterval = setInterval(() => {
        setLastAutoCheck(new Date());
        setDebugInfo('🔄 Auto-refresh verificando notícias...');
        loadNews();
      }, 5 * 60 * 1000); // 5 minutos
    }
    
    return () => {
      clearInterval(statusInterval);
      if (newsInterval) clearInterval(newsInterval);
    };
  }, [autoRefreshActive]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    
    if (diffMinutes < 1) {
      return 'Agora mesmo';
    } else if (diffMinutes < 60) {
      return `${diffMinutes} minuto${diffMinutes > 1 ? 's' : ''} atrás`;
    } else if (diffHours < 24) {
      return `${diffHours} hora${diffHours > 1 ? 's' : ''} atrás`;
    } else if (diffDays < 7) {
      return `${diffDays} dia${diffDays > 1 ? 's' : ''} atrás`;
    } else {
      return date.toLocaleDateString('pt-BR', { 
        day: '2-digit', 
        month: '2-digit', 
        year: 'numeric' 
      });
    }
  };

  const openModal = (newsItem) => {
    setSelectedNews(newsItem);
  };

  const closeModal = () => {
    setSelectedNews(null);
  };

  const getImageWithFallback = (imageUrl) => {
    return imageUrl || 'https://static.invenglobal.com/images/article/article_header.jpg';
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
              🦶 BIGFOOT ESPORTS
            </h1>
            <h2 className="text-2xl font-semibold mb-2 text-gray-200">SISTEMA DE NOTÍCIAS</h2>
            <p className="text-lg text-gray-300 mb-2">
              Notícias automáticas e traduzidas sobre League of Legends
            </p>
            <p className="text-sm text-gray-400">
              {new Date().toLocaleDateString('pt-BR', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center border border-white/20">
              <div className="text-3xl font-bold text-green-400 mb-2">
                {news.length}
              </div>
              <div className="text-gray-300">NOTÍCIAS</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center border border-white/20">
              <div className="text-3xl font-bold text-blue-400 mb-2">
                {lastUpdate ? lastUpdate.toLocaleTimeString('pt-BR', { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                }) : '--:--'}
              </div>
              <div className="text-gray-300">ÚLTIMA ATUALIZAÇÃO</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center border border-white/20">
              <div className="text-2xl mb-2">
                {apiStatus?.healthy ? '🟢' : '🔴'} {apiStatus?.healthy ? 'Online' : 'Offline'}
              </div>
              <div className="text-gray-300">API STATUS</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center border border-white/20">
              <div className="text-2xl mb-2">
                {autoRefreshActive ? '🟢 Ativo' : '🔴 Parado'}
              </div>
              <div className="text-gray-300">AUTO-REFRESH</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center border border-white/20">
              <div className="text-3xl font-bold text-orange-400 mb-2">
                5min
              </div>
              <div className="text-gray-300">INTERVALO</div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex flex-wrap gap-4 mb-8 justify-center">
            <button
              onClick={loadNews}
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2"
            >
              {loading ? '🔄' : '📱'} {loading ? 'Carregando...' : 'Recarregar Notícias'}
            </button>
            <button
              onClick={runWorkflow}
              disabled={loading}
              className="bg-green-600 hover:bg-green-700 disabled:bg-green-800 px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2"
            >
              🔄 Workflow Completo
            </button>
            <button
              onClick={() => setAutoRefreshActive(!autoRefreshActive)}
              className={`px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2 ${
                autoRefreshActive 
                  ? 'bg-red-600 hover:bg-red-700' 
                  : 'bg-green-600 hover:bg-green-700'
              }`}
            >
              {autoRefreshActive ? '⏸️ Pausar Auto-Refresh' : '▶️ Iniciar Auto-Refresh'}
            </button>
          </div>

          {/* API Status */}
          {apiStatus && (
            <div className={`border rounded-lg p-4 mb-6 text-center ${
              apiStatus.healthy 
                ? 'bg-green-500/20 border-green-500/30' 
                : 'bg-red-500/20 border-red-500/30'
            }`}>
              <p className={apiStatus.healthy ? 'text-green-300' : 'text-red-300'}>
                🔗 API: {apiStatus.healthy ? '✅ Online' : '❌ Offline'} | 
                Total: {apiStatus.total_news || 0} notícias | 
                Auto-Refresh: {autoRefreshActive ? '🟢 Ativo' : '🔴 Inativo'}
              </p>
              {apiStatus.last_update && (
                <p className="text-xs text-gray-200 mt-1">
                  Última atualização da API: {new Date(apiStatus.last_update).toLocaleString('pt-BR')}
                </p>
              )}
            </div>
          )}

          {/* Debug Info */}
          {debugInfo && (
            <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg p-4 mb-6 text-center">
              <p className="text-blue-300">🔍 Status: {debugInfo}</p>
              <p className="text-xs text-blue-200 mt-1">
                ✅ Sistema automatizado {autoRefreshActive ? 'ATIVO' : 'PARADO'} • 
                {lastAutoCheck && `Última verificação: ${lastAutoCheck.toLocaleTimeString('pt-BR')}`}
              </p>
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-4 mb-6">
              <div className="flex items-center gap-3">
                <span className="text-2xl">⚠️</span>
                <div>
                  <strong className="text-red-400">Erro no sistema</strong>
                  <p className="text-red-300 text-sm mt-1">{error}</p>
                </div>
                <button 
                  onClick={() => {
                    setError('');
                    loadNews();
                  }}
                  className="ml-auto bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-sm transition-colors"
                >
                  🔄 Tentar Novamente
                </button>
              </div>
            </div>
          )}

          {/* Loading */}
          {loading && (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400 mb-4"></div>
              <p className="text-gray-300">🔄 {debugInfo || 'Processando...'}</p>
            </div>
          )}

          {/* News Grid */}
          {!loading && news.length > 0 && (
            <div className="grid gap-8">
              {news.map((item, index) => (
                <div 
                  key={item.id || index} 
                  className="bg-white/10 backdrop-blur-sm rounded-xl overflow-hidden border border-white/20 hover:border-yellow-400/50 transition-all duration-300 hover:scale-[1.01] cursor-pointer"
                  onClick={() => openModal(item)}
                >
                  <div className="lg:flex">
                    {/* Imagem */}
                    <div className="lg:w-1/3">
                      <div className="h-80 lg:h-full bg-gradient-to-br from-yellow-500/20 to-orange-500/20 relative overflow-hidden">
                        <img 
                          src={getImageWithFallback(item.image_url)} 
                          alt={item.title || 'Notícia'}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.src = 'https://static.invenglobal.com/images/article/article_header.jpg';
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                        <div className="absolute top-4 left-4">
                          {item.translated ? (
                            <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold animate-pulse">
                              🌐 TRADUZIDO
                            </span>
                          ) : (
                            <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                              🇺🇸 ORIGINAL
                            </span>
                          )}
                        </div>
                        <div className="absolute bottom-4 left-4 right-4">
                          <div className="text-white text-sm font-medium">
                            📅 {formatDate(item.date_published)}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Conteúdo */}
                    <div className="lg:w-2/3 p-8">
                      <div className="flex items-center gap-2 mb-6">
                        <span className="text-sm text-yellow-400 font-medium">{item.source || 'Inven Global'}</span>
                        {item.author && (
                          <>
                            <span className="text-gray-500">•</span>
                            <span className="text-sm text-gray-400">{item.author}</span>
                          </>
                        )}
                        {item.translated && (
                          <span className="bg-green-500/20 text-green-300 px-2 py-1 rounded text-xs">
                            🌐 Traduzido
                          </span>
                        )}
                      </div>
                      
                      <h3 className="text-2xl font-bold mb-6 text-white leading-tight">
                        {item.title || 'Título não disponível'}
                      </h3>
                      
                      <p className="text-gray-300 mb-8 leading-relaxed text-lg">
                        {item.content && item.content.length > 400 
                          ? `${item.content.substring(0, 400)}...` 
                          : item.content || 'Clique para ver mais detalhes.'}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        {item.url && item.url !== '#' && (
                          <a 
                            href={item.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-yellow-400 hover:text-yellow-300 text-sm font-medium flex items-center gap-2 transition-colors"
                            onClick={(e) => e.stopPropagation()}
                          >
                            🔗 Artigo original
                          </a>
                        )}
                        <button className="bg-yellow-600/20 text-yellow-400 px-6 py-3 rounded-lg text-sm hover:bg-yellow-600/30 transition-colors">
                          📖 Ver detalhes
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Empty State */}
          {!loading && news.length === 0 && !error && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🦶</div>
              <h3 className="text-xl font-bold mb-2">BigFoot eSports - Sistema Pronto</h3>
              <p className="text-gray-400 mb-6">Execute o workflow completo para buscar as notícias mais recentes do Inven Global</p>
              <button 
                onClick={runWorkflow}
                className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-lg font-medium transition-colors"
                disabled={loading}
              >
                🔄 Executar Workflow Completo
              </button>
            </div>
          )}

          {/* Footer Info */}
          <div className="text-center mt-12 text-gray-400 text-sm">
            <p>🦶 <strong>BigFoot eSports</strong> - Sistema automatizado de notícias</p>
            <p className="mt-2">📡 Última sincronização: {lastUpdate ? lastUpdate.toLocaleString('pt-BR') : 'Aguardando...'}</p>
            {apiStatus && (
              <p className="mt-1">
                🔗 API: {apiStatus.healthy ? '🟢 Online' : '🔴 Offline'} | 
                Total: {apiStatus.total_news || 0} notícias | 
                Auto-Refresh: {autoRefreshActive ? '🟢 Ativo' : '🔴 Parado'}
              </p>
            )}
          </div>
        </div>

        {/* Modal */}
        {selectedNews && (
          <div 
            className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50"
            onClick={closeModal}
          >
            <div 
              className="bg-slate-800 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-yellow-400/30"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={getImageWithFallback(selectedNews.image_url)} 
                  alt={selectedNews.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-800 via-transparent to-transparent"></div>
                <button 
                  onClick={closeModal}
                  className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white text-2xl w-10 h-10 rounded-full flex items-center justify-center transition-colors"
                >
                  ×
                </button>
              </div>
              
              <div className="p-8">
                <div className="flex items-center gap-2 mb-6">
                  <span className="text-yellow-400 font-medium">{selectedNews.source || 'Inven Global'}</span>
                  <span className="text-gray-500">•</span>
                  <span className="text-gray-400">{formatDate(selectedNews.date_published)}</span>
                  {selectedNews.author && (
                    <>
                      <span className="text-gray-500">•</span>
                      <span className="text-gray-400">Por {selectedNews.author}</span>
                    </>
                  )}
                  {selectedNews.translated && (
                    <span className="bg-green-500/20 text-green-300 px-2 py-1 rounded text-xs ml-2">
                      🌐 Traduzido
                    </span>
                  )}
                </div>
                
                <h2 className="text-3xl font-bold mb-8 text-white leading-tight">
                  {selectedNews.title}
                </h2>
                
                <div className="text-gray-300 leading-relaxed mb-8 text-lg">
                  {selectedNews.content || 'Conteúdo não disponível. Acesse o artigo original para ler completo.'}
                </div>
                
                <div className="flex gap-4">
                  {selectedNews.url && selectedNews.url !== '#' && (
                    <a
                      href={selectedNews.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-yellow-600 hover:bg-yellow-700 px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2"
                    >
                      🔗 Ler artigo completo
                    </a>
                  )}
                  <button
                    onClick={closeModal}
                    className="bg-gray-600 hover:bg-gray-700 px-6 py-3 rounded-lg font-medium transition-colors"
                  >
                    Fechar
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default NewsSystem;
