// ===== SISTEMA DE NOTÍCIAS =====

class NewsSystem {
    constructor() {
        this.newsData = [];
        this.currentReadingTime = 0;
        this.readingTimer = null;
        this.scrollCheckInterval = null;
        this.currentArticle = null;
        this.retryCount = 0;
        this.maxRetries = 3;
        
        this.init();
    }

    init() {
        this.setupEventListeners();
    }

    setupEventListeners() {
        // Modal de artigo
        document.getElementById('closeBtn')?.addEventListener('click', () => this.closeArticle());
        document.getElementById('modal')?.addEventListener('click', (e) => {
            if (e.target.id === 'modal') this.closeArticle();
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && document.getElementById('modal').style.display === 'block') {
                this.closeArticle();
            }
        });
    }

    // ===== INTEGRAÇÃO COM AUTH SYSTEM =====
    handleUserLogin(user) {
        this.loadNews();
    }

    handleUserLogout() {
        this.stopReadingSession();
        this.newsData = [];
        document.getElementById('newsGrid').innerHTML = '';
    }

    // ===== CARREGAMENTO DE NOTÍCIAS =====
    async loadNews() {
        if (!window.authSystem?.isLoggedIn) return;
        
        document.getElementById('loadingState').style.display = 'flex';
