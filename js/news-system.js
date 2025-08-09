// ===== SISTEMA DE NOTÍCIAS CORRIGIDO =====
class NewsSystem {
    constructor() {
        this.newsData = [];
        this.currentReadingTime = 0;
        this.readingTimer = null;
        this.scrollCheckInterval = null;
        this.currentArticle = null;
        this.retryCount = 0;
        this.maxRetries = 3;
        this.authListener = null;
        this.isInitialized = false;
        
        this.init();
    }

    async init() {
        try {
            // CORREÇÃO 1: Aguarda a inicialização do sistema de autenticação
            console.log("NewsSystem: Aguardando inicialização da autenticação...");
            
            if (window.bigFootAuth) {
                await window.bigFootAuth.waitForInit();
            } else {
                // Se bigFootAuth não existir ainda, aguarda um pouco e tenta novamente
                await this.waitForAuthSystem();
            }
            
            console.log("NewsSystem: Sistema de autenticação pronto");
            
            // CORREÇÃO 2: Configura listeners após a inicialização
            this.setupEventListeners();
            this.setupAuthListeners();
            
            // CORREÇÃO 3: Verifica o estado atual de autenticação
            await this.checkInitialAuthState();
            
            this.isInitialized = true;
            console.log("NewsSystem: Inicializado com sucesso");
            
        } catch (error) {
            console.error("NewsSystem: Erro na inicialização:", error);
            this.showError("Erro ao inicializar sistema de notícias");
        }
    }

    // CORREÇÃO 4: Método para aguardar o sistema de autenticação
    async waitForAuthSystem(maxAttempts = 50) {
        for (let i = 0; i < maxAttempts; i++) {
            if (window.bigFootAuth) {
                await window.bigFootAuth.waitForInit();
                return;
            }
            await new Promise(resolve => setTimeout(resolve, 100));
        }
        throw new Error("Sistema de autenticação não foi carregado");
    }

    // CORREÇÃO 5: Verifica estado inicial de autenticação
    async checkInitialAuthState() {
        try {
            const isLoggedIn = await window.bigFootAuth.isLoggedInAsync();
            const user = await window.bigFootAuth.getCurrentUserAsync();
            
            console.log("NewsSystem: Estado inicial de autenticação:", isLoggedIn ? "Logado" : "Não logado");
            
            if (isLoggedIn) {
                this.handleUserLogin(user);
            } else {
                this.handleUserLogout();
            }
        } catch (error) {
            console.error("NewsSystem: Erro ao verificar estado inicial:", error);
        }
    }

    // CORREÇÃO 6: Configura listeners de autenticação
    setupAuthListeners() {
        if (window.bigFootAuth) {
            this.authListener = window.bigFootAuth.addAuthListener((user) => {
                console.log("NewsSystem: Mudança de autenticação detectada:", user ? "Login" : "Logout");
                
                if (user) {
                    this.handleUserLogin(user);
                } else {
                    this.handleUserLogout();
                }
            });
        }
    }

    setupEventListeners() {
        // Modal de artigo
        document.getElementById('closeBtn')?.addEventListener('click', () => this.closeArticle());
        
        const modal = document.getElementById('modal');
        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target.id === 'modal') this.closeArticle();
            });
        }
        
        document.addEventListener('keydown', (e) => {
            const modal = document.getElementById('modal');
            if (e.key === 'Escape' && modal && modal.style.display === 'block') {
                this.closeArticle();
            }
        });
    }

    // ===== INTEGRAÇÃO CORRIGIDA COM AUTH SYSTEM =====
    async handleUserLogin(user) {
        console.log("NewsSystem: Usuário logado, carregando notícias para:", user.email);
        try {
            await this.loadNews();
        } catch (error) {
            console.error("NewsSystem: Erro ao carregar notícias após login:", error);
        }
    }

    handleUserLogout() {
        console.log("NewsSystem: Usuário saiu, limpando notícias");
        this.stopReadingSession();
        this.newsData = [];
        
        const newsGrid = document.getElementById('newsGrid');
        if (newsGrid) {
            newsGrid.innerHTML = '';
        }
        
        this.showLoginRequired();
    }

    // ===== CARREGAMENTO DE NOTÍCIAS CORRIGIDO =====
    async loadNews() {
        try {
            // CORREÇÃO 7: Verificação correta de autenticação
            if (!window.bigFootAuth) {
                console.error("NewsSystem: Sistema de autenticação não encontrado");
                return;
            }

            const isLoggedIn = await window.bigFootAuth.isLoggedInAsync();
            
            if (!isLoggedIn) {
                console.log("NewsSystem: Usuário não autenticado");
                this.showLoginRequired();
                return;
            }

            console.log("NewsSystem: Carregando notícias...");
            this.showLoadingState();

            // CORREÇÃO 8: Simula carregamento de notícias (substitua pela sua API)
            const news = await this.fetchNews();
            this.newsData = news;
            this.renderNews();
            
        } catch (error) {
            console.error("NewsSystem: Erro ao carregar notícias:", error);
            this.showError("Erro ao carregar notícias");
            
            if (this.retryCount < this.maxRetries) {
                this.retryCount++;
                console.log(`NewsSystem: Tentativa ${this.retryCount}/${this.maxRetries}`);
                setTimeout(() => this.loadNews(), 2000);
            }
        }
    }

    // CORREÇÃO 9: Método para buscar notícias
    async fetchNews() {
        // Aqui você colocaria sua lógica real de API
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve([
                    {
                        id: 1,
                        title: "Worlds 2024: Grande Final",
                        summary: "Análise completa da grande final do campeonato mundial",
                        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
                        date: "2024-11-15",
                        author: "BIGFOOT Admin",
                        image: "https://via.placeholder.com/400x250",
                        readTime: 5
                    },
                    {
                        id: 2,
                        title: "Meta Atual: Champions OP",
                        summary: "Descubra quais champions estão dominando a rift",
                        content: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...",
                        date: "2024-11-20",
                        author: "Analista Pro",
                        image: "https://via.placeholder.com/400x250",
                        readTime: 3
                    },
                    {
                        id: 3,
                        title: "BIGFOOT no Cenário Competitivo",
                        summary: "Últimas novidades da nossa equipe nos torneios",
                        content: "Ut enim ad minim veniam, quis nostrud exercitation...",
                        date: "2024-11-25",
                        author: "BIGFOOT Esports",
                        image: "https://via.placeholder.com/400x250",
                        readTime: 4
                    }
                ]);
            }, 1000);
        });
    }

    // CORREÇÃO 10: Estados visuais melhorados
    showLoadingState() {
        const loadingState = document.getElementById('loadingState');
        if (loadingState) {
            loadingState.style.display = 'flex';
            loadingState.innerHTML = `
                <div style="text-align: center;">
                    <div class="spinner" style="
                        border: 4px solid #f3f3f3;
                        border-top: 4px solid #3498db;
                        border-radius: 50%;
                        width: 40px;
                        height: 40px;
                        animation: spin 2s linear infinite;
                        margin: 0 auto 1rem;
                    "></div>
                    <p>Carregando notícias...</p>
                </div>
                <style>
                    @keyframes spin {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                    }
                </style>
            `;
        }
    }

    showLoginRequired() {
        const newsGrid = document.getElementById('newsGrid');
        const loadingState = document.getElementById('loadingState');
        
        if (loadingState) {
            loadingState.style.display = 'none';
        }
        
        if (newsGrid) {
            newsGrid.innerHTML = `
                <div class="login-required-message" style="
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    min-height: 300px;
                    text-align: center;
                    background: #f8f9fa;
                    border-radius: 8px;
                    padding: 2rem;
                    margin: 2rem 0;
                ">
                    <h2 style="color: #495057; margin-bottom: 1rem;">🔒 Área Exclusiva</h2>
                    <p style="color: #6c757d; margin-bottom: 1.5rem; max-width: 500px; line-height: 1.6;">
                        As notícias são exclusivas para membros logados. Faça login para acessar 
                        as últimas novidades do cenário competitivo.
                    </p>
                    <button 
                        onclick="document.getElementById('login-btn')?.click()"
                        style="
                            background: linear-gradient(45deg, #007bff, #0056b3);
                            color: white;
                            padding: 0.75rem 1.5rem;
                            border: none;
                            border-radius: 5px;
                            cursor: pointer;
                            font-size: 1rem;
                            font-weight: bold;
                            transition: transform 0.2s ease;
                        "
                        onmouseover="this.style.transform = 'translateY(-2px)'"
                        onmouseout="this.style.transform = 'translateY(0)'"
                    >
                        Fazer Login
                    </button>
                </div>
            `;
        }
    }

    showError(message) {
        const newsGrid = document.getElementById('newsGrid');
        const loadingState = document.getElementById('loadingState');
        
        if (loadingState) {
            loadingState.style.display = 'none';
        }
        
        if (newsGrid) {
            newsGrid.innerHTML = `
                <div class="error-message" style="
                    background: #f8d7da;
                    color: #721c24;
                    border: 1px solid #f5c6cb;
                    border-radius: 4px;
                    padding: 1rem;
                    margin: 2rem 0;
                    text-align: center;
                ">
                    <h3>Erro</h3>
                    <p>${message}</p>
                    <button 
                        onclick="window.newsSystem?.loadNews()" 
                        style="
                            background: #dc3545;
                            color: white;
                            padding: 0.5rem 1rem;
                            border: none;
                            border-radius: 4px;
                            cursor: pointer;
                            margin-top: 0.5rem;
                        "
                    >
                        Tentar Novamente
                    </button>
                </div>
            `;
        }
    }

    renderNews() {
        const newsGrid = document.getElementById('newsGrid');
        const loadingState = document.getElementById('loadingState');
        
        if (loadingState) {
            loadingState.style.display = 'none';
        }
        
        if (!newsGrid || !this.newsData.length) return;

        const newsHTML = this.newsData.map(article => `
            <article class="news-card" onclick="window.newsSystem?.openArticle(${article.id})" style="
                background: white;
                border-radius: 8px;
                box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                overflow: hidden;
                cursor: pointer;
                transition: transform 0.2s ease, box-shadow 0.2s ease;
            " onmouseover="this.style.transform = 'translateY(-2px)'; this.style.boxShadow = '0 4px 8px rgba(0,0,0,0.15)'"
               onmouseout="this.style.transform = 'translateY(0)'; this.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)'">
                <img src="${article.image}" alt="${article.title}" style="
                    width: 100%;
                    height: 200px;
                    object-fit: cover;
                ">
                <div style="padding: 1rem;">
                    <h3 style="margin-bottom: 0.5rem; color: #333; font-size: 1.1rem;">${article.title}</h3>
                    <p style="color: #666; margin-bottom: 1rem; line-height: 1.4;">${article.summary}</p>
                    <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85rem; color: #888;">
                        <span>${article.author}</span>
                        <span>${article.readTime} min de leitura</span>
                    </div>
                </div>
            </article>
        `).join('');

        newsGrid.innerHTML = newsHTML;
        console.log(`NewsSystem: ${this.newsData.length} notícias renderizadas`);
    }

    openArticle(id) {
        const article = this.newsData.find(a => a.id === id);
        if (!article) return;

        this.currentArticle = article;
        
        const modal = document.getElementById('modal');
        const modalContent = document.getElementById('modalContent');
        
        if (modal && modalContent) {
            modalContent.innerHTML = `
                <h1>${article.title}</h1>
                <div class="article-meta" style="margin-bottom: 1rem; color: #666;">
                    <span>Por: ${article.author}</span> • 
                    <span>${new Date(article.date).toLocaleDateString('pt-BR')}</span> • 
                    <span>${article.readTime} min de leitura</span>
                </div>
                <img src="${article.image}" alt="${article.title}" style="width: 100%; margin-bottom: 1rem; border-radius: 4px;">
                <div class="article-content" style="line-height: 1.6;">
                    ${article.content}
                </div>
            `;
            
            modal.style.display = 'block';
            this.startReadingSession();
        }
    }

    closeArticle() {
        const modal = document.getElementById('modal');
        if (modal) {
            modal.style.display = 'none';
        }
        
        this.stopReadingSession();
        this.currentArticle = null;
    }

    startReadingSession() {
        this.currentReadingTime = 0;
        this.readingTimer = setInterval(() => {
            this.currentReadingTime++;
        }, 1000);
    }

    stopReadingSession() {
        if (this.readingTimer) {
            clearInterval(this.readingTimer);
            this.readingTimer = null;
        }
        this.currentReadingTime = 0;
    }

    // Cleanup quando a instância for destruída
    destroy() {
        if (this.authListener) {
            this.authListener();
        }
        this.stopReadingSession();
        if (this.scrollCheckInterval) {
            clearInterval(this.scrollCheckInterval);
        }
    }
}

// ===== INICIALIZAÇÃO =====
document.addEventListener('DOMContentLoaded', () => {
    // Aguarda um pouco para garantir que outros scripts foram carregados
    setTimeout(() => {
        if (!window.newsSystem) {
            console.log("NewsSystem: Inicializando...");
            window.newsSystem = new NewsSystem();
        }
    }, 200);
});

// Cleanup quando sair da página
window.addEventListener('beforeunload', () => {
    if (window.newsSystem) {
        window.newsSystem.destroy();
    }
});

console.log("NewsSystem: Script carregado");
