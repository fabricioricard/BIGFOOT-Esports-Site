if (typeof NewsSystem === 'undefined') {
    class NewsSystem {
        constructor(containerId) {
            this.container = document.getElementById(containerId);
            this.posts = [];
            this.loading = false;
            this.cache = {
                posts: [],
                lastFetch: 0,
                cacheDuration: 5 * 60 * 1000 // 5 minutos
            };

            if (!this.container) {
                console.error(`Container com ID '${containerId}' não encontrado`);
                return;
            }

            this.init();
        }

        async init() {
            console.log('Inicializando NewsSystem');
            await this.loadNews();
            this.render();

            // Atualiza as notícias a cada 5 minutos
            setInterval(() => {
                this.loadNews();
            }, this.cache.cacheDuration);
        }

        async fetchWithRetry(url, options, retries = 3, delay = 1000) {
            for (let i = 0; i < retries; i++) {
                try {
                    console.log(`Tentativa ${i + 1} para ${url}`);
                    const response = await fetch(url, options);
                    if (response.ok) return response;
                    throw new Error(`Erro: ${response.status} ${response.statusText}`);
                } catch (error) {
                    if (i < retries - 1) {
                        console.log(`Tentativa ${i + 1} falhou, retrying após ${delay * (i + 1)}ms...`);
                        await new Promise(resolve => setTimeout(resolve, delay * (i + 1)));
                    } else {
                        throw error;
                    }
                }
            }
        }

        async loadNews(attempt = 1, maxAttempts = 3) {
            if (this.loading) {
                console.log('Carregamento em andamento, ignorando nova tentativa');
                return;
            }

            // Verifica cache
            if (this.cache.posts.length > 0 && Date.now() - this.cache.lastFetch < this.cache.cacheDuration) {
                console.log('Usando notícias do cache');
                this.posts = this.cache.posts;
                this.hideLoading();
                this.render();
                return;
            }

            this.loading = true;
            this.showLoading();

            try {
                let response;
                try {
                    console.log(`Tentativa ${attempt} de buscar notícias de /api/news`);
                    response = await this.fetchWithRetry('/api/news', {
                        headers: {
                            'Accept': 'application/json'
                        }
                    }, 3, 1000);
                    const data = await response.json();
                    console.log('Resposta da API local:', data);
                    if (!data.success) throw new Error(data.error || 'Erro desconhecido na API');
                    this.posts = data.posts || [];
                    console.log('Notícias carregadas da API local:', this.posts.length);
                } catch (apiError) {
                    console.warn('Falha na API local:', apiError.message);
                    if (attempt < maxAttempts) {
                        console.log(`Tentando novamente em ${attempt}s...`);
                        await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
                        return this.loadNews(attempt + 1, maxAttempts);
                    }
                    console.log('Usando Reddit diretamente como fallback');
                    this.posts = await this.fetchRedditDirectly();
                }

                if (this.posts.length === 0) {
                    throw new Error('Nenhuma notícia retornada pela API ou Reddit');
                }

                this.cache.posts = this.posts;
                this.cache.lastFetch = Date.now();
                this.hideLoading();
                this.render();
                // Atualiza contagem de notícias na seção hero
                const heroNewsCount = document.getElementById('heroNewsCount');
                if (heroNewsCount) {
                    heroNewsCount.textContent = this.posts.length;
                } else {
                    console.warn('Elemento heroNewsCount não encontrado');
                }

            } catch (error) {
                console.error('Erro ao carregar notícias:', error.stack);
                this.hideLoading();
                this.showError(`Não foi possível carregar as notícias: ${error.message}. Tente novamente mais tarde.`);
            } finally {
                this.loading = false;
            }
        }

        async fetchRedditDirectly() {
            try {
                console.log('Buscando notícias diretamente do Reddit');
                const response = await this.fetchWithRetry('https://www.reddit.com/r/leagueoflegends/new.json?limit=10', {
                    headers: {
                        'User-Agent': 'LeagueNewsBot/1.0'
                    }
                }, 3, 1000);
                const data = await response.json();
                console.log('Dados do Reddit recebidos:', !!data.data);
                if (!data.data || !data.data.children) {
                    throw new Error('Formato de dados do Reddit inválido');
                }

                const posts = data.data.children.map(post => {
                    const postData = post.data;
                    let imageUrl = null;
                    if (postData.preview?.images?.length > 0) {
                        imageUrl = postData.preview.images[0].source.url.replace(/&amp;/g, '&');
                    } else if (postData.thumbnail && !['self', 'default', 'nsfw'].includes(postData.thumbnail)) {
                        imageUrl = postData.thumbnail;
                    } else if (postData.url?.match(/\.(jpg|png|gif)$/)) {
                        imageUrl = postData.url;
                    }

                    return {
                        id: postData.id,
                        title: postData.title || 'Sem título',
                        text: postData.selftext || postData.title || 'Sem conteúdo',
                        imageUrl,
                        link: `https://reddit.com${postData.permalink}`,
                        author: postData.author || 'Anônimo',
                        score: postData.score || 0,
                        comments: postData.num_comments || 0,
                        created: new Date(postData.created_utc * 1000).toISOString(),
                        subreddit: postData.subreddit || 'leagueoflegends',
                        postHint: postData.post_hint || '',
                        isVideo: postData.is_video || false,
                        domain: postData.domain || ''
                    };
                });

                console.log('Notícias carregadas do Reddit:', posts.length);
                return posts;
            } catch (error) {
                console.error('Erro ao buscar do Reddit:', error.stack);
                return [];
            }
        }

        showLoading() {
            const loadingState = document.getElementById('loadingState');
            if (loadingState) {
                loadingState.classList.add('show');
            } else {
                console.warn('Elemento loadingState não encontrado, usando fallback');
                this.container.innerHTML = `
                    <div class="loading-state">
                        <div class="loading-spinner"></div>
                        <div class="loading-text">Carregando notícias...</div>
                    </div>
                `;
            }
        }

        hideLoading() {
            const loadingState = document.getElementById('loadingState');
            if (loadingState) {
                loadingState.classList.remove('show');
            }
        }

        showError(message) {
            const errorState = document.getElementById('errorState');
            if (errorState) {
                errorState.querySelector('p').textContent = message;
                errorState.classList.add('show');
            } else {
                console.warn('Elemento errorState não encontrado, usando fallback');
                this.container.innerHTML = `
                    <div class="error-state">
                        <h3>⚠️ Oops! Algo deu errado</h3>
                        <p>${message}</p>
                        <button onclick="window.newsSystem.loadNews()" class="btn btn-primary">🔄 Tentar Novamente</button>
                    </div>
                `;
            }
        }

        hideError() {
            const errorState = document.getElementById('errorState');
            if (errorState) {
                errorState.classList.remove('show');
            }
        }

        formatDate(dateString) {
            const date = new Date(dateString);
            const now = new Date();
            const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));

            if (diffInHours < 1) {
                const diffInMinutes = Math.floor((now - date) / (1000 * 60));
                return `${diffInMinutes}min atrás`;
            } else if (diffInHours < 24) {
                return `${diffInHours}h atrás`;
            } else {
                const diffInDays = Math.floor(diffInHours / 24);
                return `${diffInDays}d atrás`;
            }
        }

        truncateText(text, maxLength = 150) {
            if (text.length <= maxLength) return text;
            return text.substring(0, maxLength).trim() + '...';
        }

        showArticleModal(post) {
            const modal = document.getElementById('modal');
            const modalTitle = document.getElementById('modalTitle');
            const modalContent = document.getElementById('modalContent');
            const modalMeta = document.getElementById('modalMeta');
            const articleSource = document.getElementById('articleSource');

            if (!modal || !modalTitle || !modalContent || !modalMeta || !articleSource) {
                console.warn('Elementos do modal não encontrados:', {
                    modal: !!modal,
                    modalTitle: !!modalTitle,
                    modalContent: !!modalContent,
                    modalMeta: !!modalMeta,
                    articleSource: !!articleSource
                });
                return;
            }

            modalTitle.textContent = post.title;
            modalContent.textContent = post.text || 'Conteúdo não disponível.';
            modalMeta.innerHTML = `
                <span>📅 ${this.formatDate(post.created)}</span>
                <span>⏱️ ${Math.ceil(post.text.length / 200)} min de leitura</span>
            `;
            articleSource.innerHTML = `<p>📰 Fonte: <a href="${post.link}" target="_blank" rel="noopener">Reddit</a></p>`;
            modal.classList.add('show');
            document.body.style.overflow = 'hidden';

            // Track article reading for rewards
            if (window.bigFootAuth?.isLoggedIn()) {
                const articleId = post.id;
                if (!window.bigFootAuth.readArticles.includes(articleId)) {
                    window.bigFootAuth.updateUserData({
                        points: window.bigFootAuth.points + 50,
                        articlesRead: window.bigFootAuth.articlesRead + 1,
                        readArticles: [...window.bigFootAuth.readArticles, articleId],
                        totalReadingTime: window.bigFootAuth.totalReadingTime + Math.ceil(post.text.length / 200) * 60
                    });
                }
            }
        }

        render(posts = this.posts) {
            this.hideError();
            this.hideLoading();

            if (posts.length === 0) {
                console.warn('Nenhuma notícia para renderizar');
                this.container.innerHTML = `
                    <div class="news-empty">
                        <p>Não há notícias disponíveis no momento. Tente novamente mais tarde.</p>
                        <button onclick="window.newsSystem.loadNews()" class="btn btn-primary">Tentar novamente</button>
                    </div>
                `;
                return;
            }

            const newsHTML = posts.map(post => `
                <article class="news-item" data-post-id="${post.id}" onclick="window.newsSystem.showArticleModal(${JSON.stringify(post)})">
                    <div class="news-content">
                        ${post.imageUrl ? `
                            <div class="news-image">
                                <img src="${post.imageUrl}" alt="${post.title}" loading="lazy" />
                            </div>
                        ` : ''}
                        <div class="news-text">
                            <h3 class="news-title">
                                <a href="${post.link}" target="_blank" rel="noopener noreferrer" onclick="event.stopPropagation()">
                                    ${post.title}
                                </a>
                            </h3>
                            <p class="news-excerpt">
                                ${this.truncateText(post.text)}
                            </p>
                            <div class="news-meta">
                                <span class="news-author">por u/${post.author}</span>
                                <span class="news-time">${this.formatDate(post.created)}</span>
                                <span class="news-stats">
                                    <span class="score">↑ ${post.score}</span>
                                    <span class="comments">💬 ${post.comments}</span>
                                </span>
                            </div>
                        </div>
                    </div>
                </article>
            `).join('');

            this.container.innerHTML = `
                <div class="news-header">
                    <h2>Últimas do League of Legends</h2>
                    <button onclick="window.newsSystem.loadNews()" class="refresh-btn" ${this.loading ? 'disabled' : ''}>
                        🔄 Atualizar
                    </button>
                </div>
                <div class="news-list">
                    ${newsHTML}
                </div>
            `;
        }
    }

    document.addEventListener('DOMContentLoaded', () => {
        const container = document.getElementById('news-container');
        if (container) {
            window.newsSystem = new NewsSystem('news-container');
        } else {
            console.error('Contêiner news-container não encontrado no DOM');
        }
    });

    // Exportação para módulos, se necessário
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = NewsSystem;
    }
}

console.log("news-system.js carregado");
