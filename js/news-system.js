// Dados de exemplo para notícias
const demoNews = [
    {
        id: 1,
        title: "Worlds 2024: Análise das Semifinais e Previsões",
        summary: "As semifinais do Campeonato Mundial de League of Legends chegaram! Análise das estratégias das equipes, performances dos jogadores e previsões para as próximas partidas.",
        content: "As semifinais do Worlds 2024 chegaram, trazendo tensão e emoção incríveis para a cena competitiva de League of Legends. Após semanas de competição intensa, apenas quatro equipes permanecem de pé, cada uma com seus estilos únicos e estratégias que as trouxeram até aqui. A T1, atual campeã, continua mostrando por que é considerada uma das maiores equipes da história do League of Legends. Suas rotações de meio de jogo e habilidade em team fights têm sido excepcionais ao longo do torneio. A performance do Faker em campeões como Azir e LeBlanc tem sido fenomenal, lembrando a todos por que ele é chamado de o maior jogador de todos os tempos. Do outro lado, temos a Gen.G mostrando habilidade individual incrível e compreensão macro. Sua dupla de bot lane tem consistentemente superado os oponentes na fase de lanes, criando vantagens iniciais que traduzem em controle de objetivos. Os representantes europeus também provaram que a região ainda é competitiva no cenário mundial. Suas escolhas inovadoras e estratégias agressivas de early game pegaram muitas equipes desprevenidas. Finalmente, a última esperança da LPL continua demonstrando as características de team fight e skirmish da região. As próximas partidas prometem ser algumas das mais emocionantes que vimos este ano.",
        source: "r/leagueoflegends",
        url: "https://reddit.com/r/leagueoflegends",
        image: null,
        readTime: 5,
        points: 50,
        read: false
    },
    {
        id: 2,
        title: "Novo Campeão: Mago Misterioso do Vazio",
        summary: "Riot Games divulga teasers crípticos para o próximo campeão - parece ser um mago nascido do vazio com habilidades de manipulação da realidade. Lançamento esperado no próximo patch.",
        content: "A Riot Games começou sua misteriosa campanha de teaser do campeão, e a comunidade está fervilhando com teorias e especulações. O mais recente campeão parece estar conectado ao Vazio, aquela dimensão aterrorizante que ameaça consumir toda Runeterra. Com base nas imagens de teaser e mensagens crípticas, este novo campeão parece ser um mago com habilidades de manipulação da realidade que poderiam mudar fundamentalmente como pensamos sobre magia em League of Legends. A direção artística mostrada nos teasers sugere um campeão que existe parcialmente em nossa realidade e parcialmente no próprio Vazio. Esta posição única poderia se traduzir em um kit que manipula espaço e tempo, potencialmente oferecendo novas mecânicas que nunca vimos antes no jogo. Os jogadores estão especulando sobre habilidades que poderiam envolver teletransporte, fendas da realidade, ou até mesmo manipulação temporal. O design visual do campeão, pelo que podemos vislumbrar nos teasers sombrios, parece tanto elegante quanto aterrorizante. A paleta de cores parece misturar roxos profundos e pretos semelhantes ao vazio com azuis etéreos e brancos, sugerindo um ser preso entre dimensões.",
        source: "r/leagueoflegends",
        url: "https://reddit.com/r/leagueoflegends",
        image: null,
        readTime: 3,
        points: 50,
        read: false
    },
    {
        id: 3,
        title: "Patch 14.22: Análise do Meta e Mudanças nos ADCs",
        summary: "O patch mais recente traz mudanças significativas na itemização de ADC e vários ajustes de campeões. Jogadores profissionais compartilham suas opiniões sobre o meta em evolução.",
        content: "O Patch 14.22 trouxe algumas das mudanças mais significativas para a função de ADC que vimos durante toda a temporada, e o impacto já está sendo sentido em todos os níveis de jogo. As atualizações de itemização mudaram fundamentalmente como os marksmen abordam suas builds, com vários itens clássicos recebendo grandes reformulações e novas opções sendo introduzidas. As mudanças no Infinity Edge têm sido particularmente controversas, com sua passiva agora escalando diferentemente com chance de crítico. Este ajuste significa que os ADCs precisam reconsiderar seus caminhos de build, especialmente em termos de quando comprar seu terceiro item. Muitos jogadores profissionais notaram que o tradicional power spike de três itens agora se sente diferente, exigindo adaptações nos timings de team fight e controle de objetivos. As atualizações do Kraken Slayer também criaram dinâmicas interessantes nos padrões de trade da bot lane. O item agora fornece dano mais consistente contra tanks enquanto oferece melhor scaling para o late game. Isso tornou os supports tank mais viáveis enquanto simultaneamente tornou o posicionamento ainda mais crucial para jogadores de ADC.",
        source: "r/leagueoflegends",
        url: "https://reddit.com/r/leagueoflegends",
        image: null,
        readTime: 4,
        points: 50,
        read: false
    },
    {
        id: 4,
        title: "Arena Mode: Nova Temporada com Mudanças Épicas",
        summary: "O modo Arena retorna com uma nova temporada cheia de mudanças emocionantes, novos aumentos e mecânicas revisadas que prometem revolucionar a experiência de jogo.",
        content: "O modo Arena está de volta com uma nova temporada que promete ser a mais empolgante até agora! A Riot Games ouviu o feedback da comunidade e implementou mudanças significativas que abordam muitas das preocupações dos jogadores. As novas mecânicas incluem um sistema de draft revisado que permite mais estratégia na seleção de campeões, além de novos aumentos que podem mudar completamente o rumo das partidas. Um dos destaques desta temporada são os aumentos épicos - modificações poderosas que aparecem apenas nos rounds finais e podem transformar completamente seu campeão. Imagine um Yasuo que pode usar seu ultimate em qualquer inimigo, ou uma Jinx cujos foguetes explodem em cadeia! Essas mecânicas criam momentos únicos e emocionantes que mantêm cada partida fresca e imprevisível. O sistema de matchmaking também foi refinado para garantir partidas mais equilibradas, especialmente nos rankings mais altos. Os desenvolvedores implementaram um novo algoritmo que considera não apenas seu MMR atual, mas também seu histórico de performance com diferentes tipos de composições de equipe.",
        source: "r/leagueoflegends",
        url: "https://reddit.com/r/leagueoflegends",
        image: null,
        readTime: 4,
        points: 50,
        read: false
    },
    {
        id: 5,
        title: "CBLOL 2025: Novas Equipes e Transferências Surpreendentes",
        summary: "O cenário competitivo brasileiro se prepara para 2025 com transferências bombásticas e novas organizações entrando no CBLOL. Confira todas as mudanças confirmadas.",
        content: "O CBLOL 2025 promete ser uma das temporadas mais competitivas e emocionantes da história do League of Legends brasileiro! Com o período de transferências em pleno vapor, já tivemos várias movimentações surpreendentes que estão mudando completamente o cenário competitivo nacional. Uma das maiores surpresas foi a entrada de duas novas organizações no circuito principal, trazendo investimento fresco e novos talentos para o cenário. A FURIA, conhecida por seu sucesso em outros esports, finalmente fez sua estreia no LoL brasileiro com um roster que promete balançar as estruturas. Eles conseguiram contratar alguns dos jogadores mais promissores da região, incluindo dois imports coreanos que já têm experiência em ligas maiores. As transferências também revelaram algumas surpresas nos times já estabelecidos. A paiN Gaming fez uma reforma quase completa de seu roster, mantendo apenas o jungler que foi fundamental para suas conquistas recentes. Já a LOUD apostou em uma mistura de veteranos experientes com jovens talentos vindos diretamente do cenário amateur, uma estratégia que pode render frutos inesperados.",
        source: "r/leagueoflegends",
        url: "https://reddit.com/r/leagueoflegends",
        image: null,
        readTime: 4,
        points: 50,
        read: false
    },
    {
        id: 6,
        title: "Briar: Guia Completo para Dominar a Jungle",
        summary: "A campeã vampira continua dominando a jungle em todos os elos. Aprenda as melhores builds, runas e estratégias para maximizar seu potencial com Briar.",
        content: "Briar estabeleceu-se firmemente como uma das junglers mais dominantes do meta atual, e por boas razões! Sua combinação única de sustain, dano e mobilidade a torna uma pick versátil que pode se adaptar a diferentes composições e estilos de jogo. O segredo para dominar com Briar está em entender seus power spikes e como aproveitar sua passiva ao máximo. Sua mecânica de Frenesi é o que a diferencia de outros campeões, permitindo plays agressivos que poucos outros junglers conseguem executar. Para a build, o caminho mais eficiente atualmente é começar com Machado do Caçador, seguido de Hidra Titânica como primeiro item principal. Este item sinergia perfeitamente com seu kit, oferecendo tanto o waveclear necessário para farming rápido quanto o dano em área para team fights. O segundo item varia dependendo da situação do jogo - Couraça do Defunto contra equipes com muito dano físico, ou Força da Natureza contra composições heavy AP. As runas mais eficazes são Conquistador como principal, oferecendo sustain adicional e dano escalonado, complementado por Triunfo, Lenda: Tenacidade e Golpe de Misericórdia. Na árvore secundária, Osso Revestido e Crescimento Excessivo proporcionam a survivability necessária para as trocas prolongadas.",
        source: "r/leagueoflegends",
        url: "https://reddit.com/r/leagueoflegends",
        image: null,
        readTime: 4,
        points: 50,
        read: false
    }
];

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
            console.log("NewsSystem: Aguardando inicialização da autenticação...");
            
            if (window.bigFootAuth) {
                await window.bigFootAuth.waitForInit();
            } else {
                await this.waitForAuthSystem();
            }
            
            console.log("NewsSystem: Sistema de autenticação pronto");
            
            this.setupEventListeners();
            this.setupAuthListeners();
            await this.checkInitialAuthState();
            
            this.isInitialized = true;
            console.log("NewsSystem: Inicializado com sucesso");
        } catch (error) {
            console.error("NewsSystem: Erro na inicialização:", error);
            this.showError("Erro ao inicializar sistema de notícias");
        }
    }

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
            this.handleUserLogout();
        }
    }

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
        const modal = document.getElementById('modal');
        const closeBtn = document.getElementById('closeBtn');
        
        closeBtn?.addEventListener('click', () => this.closeArticle());
        
        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target.id === 'modal') this.closeArticle();
            });
        }
        
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal?.style.display === 'block') {
                this.closeArticle();
            }
        });
    }

    async handleUserLogin(user) {
        console.log("NewsSystem: Usuário logado, carregando notícias para:", user.email);
        try {
            const doc = await firebase.firestore().collection('users').doc(user.uid).get();
            if (doc.exists) {
                window.bigFootAuth.points = doc.data().points || 0;
                window.bigFootAuth.articlesRead = doc.data().articlesRead || 0;
                window.bigFootAuth.totalReadingTime = doc.data().totalReadingTime || 0;
                window.bigFootAuth.readArticles = doc.data().readArticles || [];
            }
            await this.loadNews();
        } catch (error) {
            console.error("NewsSystem: Erro ao carregar notícias após login:", error);
            this.showError("Erro ao carregar notícias");
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

    async loadNews() {
        try {
            if (!window.bigFootAuth) {
                console.error("NewsSystem: Sistema de autenticação não encontrado");
                this.showLoginRequired();
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

            this.newsData = demoNews.map(article => ({
                ...article,
                read: window.bigFootAuth.readArticles?.includes(article.id) || false
            }));
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

    showLoadingState() {
        const loadingState = document.getElementById('loadingState');
        const newsGrid = document.getElementById('newsGrid');
        const errorState = document.getElementById('errorState');
        
        if (loadingState) {
            loadingState.classList.add('show');
        }
        if (newsGrid) {
            newsGrid.classList.add('hidden');
        }
        if (errorState) {
            errorState.classList.remove('show');
        }
    }

    showLoginRequired() {
        const newsGrid = document.getElementById('newsGrid');
        const loadingState = document.getElementById('loadingState');
        const errorState = document.getElementById('errorState');
        const loginRequired = document.getElementById('loginRequired');
        
        if (loadingState) {
            loadingState.classList.remove('show');
        }
        if (errorState) {
            errorState.classList.remove('show');
        }
        if (newsGrid) {
            newsGrid.classList.add('hidden');
            newsGrid.innerHTML = '';
        }
        if (loginRequired) {
            loginRequired.classList.remove('hidden');
        }
    }

    showError(message) {
        const errorState = document.getElementById('errorState');
        const loadingState = document.getElementById('loadingState');
        const newsGrid = document.getElementById('newsGrid');
        
        if (loadingState) {
            loadingState.classList.remove('show');
        }
        if (newsGrid) {
            newsGrid.classList.add('hidden');
        }
        if (errorState) {
            errorState.classList.add('show');
            errorState.querySelector('p').textContent = message;
        }
    }

    renderNews() {
        const newsGrid = document.getElementById('newsGrid');
        const loadingState = document.getElementById('loadingState');
        
        if (loadingState) {
            loadingState.classList.remove('show');
        }
        if (newsGrid) {
            newsGrid.classList.remove('hidden');
        }
        
        if (!newsGrid || !this.newsData.length) return;

        newsGrid.innerHTML = this.newsData.map(article => {
            const placeholderEmojis = ['🎮', '⚔️', '🏆', '🎯', '💎', '🔥'];
            const emoji = placeholderEmojis[article.id % placeholderEmojis.length];
            return `
                <div class="news-card" onclick="window.newsSystem.openArticle(${article.id})">
                    <div class="reading-progress"></div>
                    <div class="news-image placeholder">${emoji}</div>
                    <div class="news-content">
                        <h3 class="news-title">${article.title}</h3>
                        <p class="news-excerpt">${article.summary}</p>
                        <div class="news-meta">
                            <span class="news-source">${article.source}</span>
                            <span class="reward-badge ${article.read ? 'read' : ''}">${article.read ? '✓ Lido' : `+${article.points} pts`}</span>
                        </div>
                    </div>
                </div>
            `;
        }).join('');

        console.log(`NewsSystem: ${this.newsData.length} notícias renderizadas`);
        document.getElementById('newsLoaded').textContent = this.newsData.length;
    }

    openArticle(id) {
        const article = this.newsData.find(a => a.id === id);
        if (!article) return;

        this.currentArticle = article;
        
        const modal = document.getElementById('modal');
        const modalTitle = document.getElementById('modalTitle');
        const modalContent = document.getElementById('modalContent');
        const articleSource = document.getElementById('articleSource');
        
        if (modal && modalTitle && modalContent && articleSource) {
            modalTitle.textContent = article.title;
            modalContent.innerHTML = `
                <div class="article-meta">
                    <span>Por: ${article.source}</span> • 
                    <span>${article.readTime} min de leitura</span>
                </div>
                <div class="article-content">${article.content}</div>
            `;
            articleSource.innerHTML = `<p>📰 Fonte: <a href="${article.url}" target="_blank" rel="noopener">Ver discussão no Reddit</a></p>`;
            
            modal.classList.add('show');
            modal.style.display = 'block';
            this.startReadingSession();
        }
    }

    startReadingSession() {
        this.currentReadingTime = 0;
        this.readingTimer = setInterval(() => {
            this.currentReadingTime++;
            this.updateReadingProgress();
        }, 100);
    }

    updateReadingProgress() {
        if (!this.currentArticle) return;

        const progressPercent = Math.min((this.currentReadingTime / 300) * 100, 100); // 30 segundos para completar
        
        const timerDisplay = document.getElementById('timerDisplay');
        const progressDisplay = document.getElementById('progressDisplay');
        const readingProgress = document.getElementById('readingProgress');
        
        if (timerDisplay && progressDisplay && readingProgress) {
            timerDisplay.textContent = `${Math.floor(this.currentReadingTime / 10)}s`;
            progressDisplay.textContent = `${Math.floor(progressPercent)}%`;
            readingProgress.style.width = `${progressPercent}%`;
        }
        
        if (progressPercent >= 100 && !this.currentArticle.read) {
            this.completeArticle(this.currentArticle);
        }
    }

    async completeArticle(article) {
        article.read = true;
        window.bigFootAuth.points = (window.bigFootAuth.points || 0) + article.points;
        window.bigFootAuth.articlesRead = (window.bigFootAuth.articlesRead || 0) + 1;
        window.bigFootAuth.totalReadingTime = (window.bigFootAuth.totalReadingTime || 0) + 0.5;
        window.bigFootAuth.readArticles = [...(window.bigFootAuth.readArticles || []), article.id];
        
        if (window.bigFootAuth.currentUser) {
            await window.bigFootAuth.updateUserData({
                points: window.bigFootAuth.points,
                articlesRead: window.bigFootAuth.articlesRead,
                totalReadingTime: window.bigFootAuth.totalReadingTime,
                readArticles: window.bigFootAuth.readArticles
            });
        }
        
        const notification = document.getElementById('notification');
        if (notification) {
            notification.textContent = `🎉 +${article.points} pontos! Artigo completado!`;
            notification.classList.add('show');
            setTimeout(() => notification.classList.remove('show'), 3000);
        }
        
        const card = document.querySelector(`[onclick="window.newsSystem.openArticle(${article.id})"]`);
        if (card) {
            const badge = card.querySelector('.reward-badge');
            if (badge) {
                badge.textContent = '✓ Lido';
                badge.classList.add('read');
            }
        }
        
        document.getElementById('totalPoints').textContent = window.bigFootAuth.points;
        document.getElementById('articlesRead').textContent = window.bigFootAuth.articlesRead;
        document.getElementById('readingTime').textContent = Math.floor(window.bigFootAuth.totalReadingTime);
        document.getElementById('points').textContent = window.bigFootAuth.points;
        document.getElementById('userPoints').textContent = `${window.bigFootAuth.points} pontos`;
    }

    stopReadingSession() {
        if (this.readingTimer) {
            clearInterval(this.readingTimer);
            this.readingTimer = null;
        }
        this.currentReadingTime = 0;
        
        const readingDot = document.getElementById('readingDot');
        const readingStatus = document.getElementById('readingStatus');
        const readingTimer = document.getElementById('readingTimer');
        
        if (readingDot && readingStatus && readingTimer) {
            readingDot.classList.remove('active');
            readingStatus.textContent = 'Parado';
            readingTimer.style.display = 'none';
        }
    }

    closeArticle() {
        const modal = document.getElementById('modal');
        if (modal) {
            modal.classList.remove('show');
            modal.style.display = 'none';
        }
        
        this.stopReadingSession();
        this.currentArticle = null;
    }

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

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        if (!window.newsSystem) {
            console.log("NewsSystem: Inicializando...");
            window.newsSystem = new NewsSystem();
        }
    }, 200);
});

// Cleanup
window.addEventListener('beforeunload', () => {
    if (window.newsSystem) {
        window.newsSystem.destroy();
    }
});

console.log("NewsSystem: Script carregado");
