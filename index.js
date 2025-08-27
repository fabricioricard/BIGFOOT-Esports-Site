// BIGFOOT Esports - Site gerado dinamicamente via JavaScript

class BigFootSite {
    constructor() {
        this.init();
    }

    init() {
        this.createDocumentStructure();
        this.injectStyles();
        this.loadExternalScripts();
        this.bindEvents();
    }

    createDocumentStructure() {
        // Configurar document head
        document.title = 'BIGFOOT Esports';
        
        // Meta tags
        const meta = [
            { name: 'charset', content: 'UTF-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1.0' }
        ];
        
        meta.forEach(m => {
            const metaEl = document.createElement('meta');
            if (m.name === 'charset') {
                metaEl.setAttribute('charset', m.content);
            } else {
                metaEl.setAttribute('name', m.name);
                metaEl.setAttribute('content', m.content);
            }
            document.head.appendChild(metaEl);
        });

        // Favicon
        const favicon = document.createElement('link');
        favicon.rel = 'icon';
        favicon.href = 'https://raw.githubusercontent.com/fabricioricard/BIGFOOT-Esports-Site/main/images/favicon.ico';
        favicon.type = 'image/x-icon';
        document.head.appendChild(favicon);

        // Google Fonts
        const fonts = document.createElement('link');
        fonts.href = 'https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&family=Montserrat:wght@600;800&family=Poppins:wght@400;600&display=swap';
        fonts.rel = 'stylesheet';
        document.head.appendChild(fonts);

        // Body padding-top
        document.body.style.paddingTop = '80px';

        // Criar estrutura principal
        document.body.innerHTML = this.generateHTML();
    }

    loadExternalScripts() {
        // Firebase Scripts
        const firebaseScripts = [
            'https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js',
            'https://www.gstatic.com/firebasejs/9.23.0/firebase-auth-compat.js',
            'https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore-compat.js',
            'https://www.gstatic.com/firebasejs/9.23.0/firebase-storage-compat.js'
        ];

        firebaseScripts.forEach(src => {
            const script = document.createElement('script');
            script.src = src;
            document.head.appendChild(script);
        });

        // Aguardar Firebase carregar e então inicializar
        setTimeout(() => {
            this.initializeFirebase();
        }, 1000);
    }

    initializeFirebase() {
        if (typeof firebase !== 'undefined') {
            // Configurar persistência do Firebase
            firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
                .then(() => {
                    console.log('Persistência configurada com sucesso');
                })
                .catch((error) => {
                    console.error('Erro ao configurar persistência:', error);
                });
            
            // Listener de mudanças de autenticação
            firebase.auth().onAuthStateChanged(user => {
                if (user) {
                    setTimeout(() => {
                        this.updateUIForLoggedIn(user);
                    }, 100);
                } else {
                    this.updateUIForLoggedOut();
                }
            });
        }
    }

    generateHTML() {
        return `
        <!-- Cabeçalho -->
        <header>
            <div class="header-container">
                <div class="logo">
                    <a href="/">
                        <img src="https://raw.githubusercontent.com/fabricioricard/BIGFOOT-Esports-Site/main/images/logo.jpg" alt="Logo BIGFOOT Esports" class="logo-jpg">
                        <span>BIGFOOT Esports</span>
                    </a>
                </div>
                <nav>
                    <ul class="nav-menu">
                        <li><a href="noticias-lol.html">📰 Notícias LoL</a></li>
                        <li><a href="loja.html">🛒 Loja</a></li>
                        <li><a href="lan-house.html">🖥️ Lan House</a></li>
                        <li><a href="doacao.html">💰 Doação</a></li>
                        <li><a href="equipe-lol.html">👥 Equipe LoL</a></li>
                    </ul>
                </nav>
                <div class="user-section" id="user-section">
                    <button id="login-btn" class="btn btn-primary login-btn">🔐 Login</button>
                    <div class="user-info" id="userInfo">
                        <div class="user-avatar-container" id="avatar-container">
                            <img id="userAvatar" class="user-avatar" src="https://raw.githubusercontent.com/fabricioricard/BIGFOOT-Esports-Site/main/images/default-avatar.png" alt="Avatar">
                            <div class="user-status" id="userStatus"></div>
                        </div>
                        <div class="user-details">
                            <div class="user-name-container">
                                <span id="userName" class="user-name gradient text-truncate">Username</span>
                                <button id="logout-btn-mini" class="btn-logout">Sair</button>
                            </div>
                            <span id="userLevel" class="user-level">Nível 1 • 0 pts</span>
                        </div>
                    </div>
                </div>
            </div>
        </header>

        <!-- Modal de Login/Registro -->
        <div id="login-modal" class="modal">
            <div class="modal-content">
                <span id="close-modal" class="modal-close">×</span>
                <div class="modal-header">
                    <h2>🎮 Bem-vindo!</h2>
                    <p>Faça login para acessar as notícias e ganhar pontos</p>
                </div>
                <div class="modal-body">
                    <div class="modal-tabs">
                        <div class="modal-tab active" data-tab="login">Login</div>
                        <div class="modal-tab" data-tab="register">Registro</div>
                    </div>
                    <div id="login-tab" class="tab-content active">
                        <form id="login-form">
                            <div class="form-group">
                                <label for="login-email">Email</label>
                                <input type="email" id="login-email" name="email" placeholder="seu@email.com" required>
                                <span id="login-email-error" class="error-text"></span>
                            </div>
                            <div class="form-group">
                                <label for="login-password">Senha</label>
                                <input type="password" id="login-password" name="password" placeholder="Sua senha" required>
                                <span id="login-password-error" class="error-text"></span>
                            </div>
                            <a href="#" id="forgot-password-link" class="text-primary text-right" style="display: block; font-size: 12px; margin-bottom: 15px;">Esqueci minha senha</a>
                            <button type="submit" class="btn btn-primary" style="width: 100%; margin-bottom: 15px;">🚀 Entrar</button>
                        </form>
                        <button id="google-login" class="btn-google">
                            <svg width="20" height="20" viewBox="0 0 24 24">
                                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.60 3.3-4.53 6.16-4.53z"/>
                            </svg>
                            Continuar com Google
                        </button>
                    </div>
                    <div id="register-tab" class="tab-content">
                        <form id="register-form">
                            <div class="form-group">
                                <label for="register-email">Email</label>
                                <input type="email" id="register-email" name="email" placeholder="seu@email.com" required>
                                <span id="register-email-error" class="error-text"></span>
                            </div>
                            <div class="form-group">
                                <label for="register-password">Senha</label>
                                <input type="password" id="register-password" name="password" placeholder="Mínimo 6 caracteres" required>
                                <span id="register-password-error" class="error-text"></span>
                            </div>
                            <button type="submit" class="btn btn-primary" style="width: 100%;">🎯 Criar Conta</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>

        <!-- Modal de Perfil -->
        <div id="profile-modal" class="modal">
            <div class="modal-content">
                <span id="close-profile-modal" class="modal-close">×</span>
                <div class="modal-header">
                    <h2>👤 Meu Perfil</h2>
                    <p>Informações da sua conta</p>
                </div>
                <div class="modal-body">
                    <div class="profile-info">
                        <div class="profile-avatar-section">
                            <img id="profile-avatar" class="profile-avatar" src="" alt="Avatar do perfil">
                            <button id="change-avatar-btn" class="btn btn-secondary btn-small">📷 Alterar Avatar</button>
                        </div>
                        
                        <div class="profile-details">
                            <div class="profile-field">
                                <span class="profile-field-label">Nome de usuário:</span>
                                <span id="profile-username" class="profile-field-value">Username</span>
                            </div>
                            <div class="profile-field">
                                <span class="profile-field-label">Email:</span>
                                <span id="profile-email" class="profile-field-value">user@email.com</span>
                            </div>
                            <div class="profile-field">
                                <span class="profile-field-label">Membro desde:</span>
                                <span id="profile-member-since" class="profile-field-value">Janeiro 2024</span>
                            </div>
                            <div class="profile-field">
                                <span class="profile-field-label">Status:</span>
                                <span class="profile-field-value" style="color: #48bb78;">🟢 Online</span>
                            </div>
                        </div>

                        <div class="stats-grid">
                            <div class="stat-card">
                                <h4 id="profile-level">1</h4>
                                <p>Nível</p>
                            </div>
                            <div class="stat-card">
                                <h4 id="profile-points">0</h4>
                                <p>Pontos</p>
                            </div>
                            <div class="stat-card">
                                <h4 id="profile-visits">1</h4>
                                <p>Visitas</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Input de arquivo oculto para upload de avatar -->
        <input type="file" id="avatar-file-input" accept="image/*" style="display: none;">

        <!-- Conteúdo Principal -->
        <main>
            <!-- Hero Section -->
            <section id="home" class="hero-section">
                <div class="hero-overlay"></div>
                <div class="hero-content">
                    <h1>Bem-vindo ao BIGFOOT</h1>
                    <p>Junte-se a nós e faça parte da evolução do esporte eletrônico!</p>
                    <div class="hero-buttons">
                        <a href="lan-house.html" class="btn btn-primary hover-effect">Conheça nossa Comunidade</a>
                    </div>
                </div>
            </section>

            <!-- Seção de Doação com QR Code -->
            <div class="donation-section floating" id="donation-box">
                <div class="donation-content">
                    <span id="close-donation" class="close">×</span>
                    <h1>Doação</h1>
                    <p>Contribua com o <strong>BIGFOOT Esports</strong> via <strong>PIX</strong>! Escaneie o QR Code abaixo e fortaleça nossa jornada.</p>
                    <img src="https://raw.githubusercontent.com/fabricioricard/BIGFOOT-Esports-Site/main/images/qrcode-pix.jpg" alt="QR Code para doação" class="qr-code">
                    <p style="margin-top: 10px; word-break: break-all; font-size: 14px; color: #ccc;">Chave PIX: <span id="pix-key">773f51bf-d4d9-48bc-9b26-812ed63618a8</span></p>
                    <button onclick="window.bigFootSite.copyPixKey()" class="btn btn-primary" style="margin-top: 10px; font-size: 14px; padding: 8px 16px;">Copiar chave PIX</button>
                    <a href="doacao.html" class="btn btn-primary hover-effect" style="display: block; margin-top: 12px; font-size: 14px; padding: 8px 16px; text-align: center;">Outras formas de doar</a>
                </div>
            </div>

            <!-- Seção de Estatísticas -->
            <section class="stats-section reveal">
                <h2>Nossos Números</h2>
                <div class="stats-content">
                    <div class="stat-item">
                        <h3 class="stat-number" data-target="50">50</h3>
                        <p>Membros na Comunidade</p>
                    </div>
                    <div class="stat-item">
                        <h3 class="stat-number" data-target="6">6</h3>
                        <p>Anos de História</p>
                    </div>
                </div>
            </section>

            <!-- Loja -->
            <section id="loja" class="shop-section reveal">
                <h2>Nossa Loja</h2>
                <div class="shop-items">
                    <div class="shop-item hover-effect">
                        <img src="https://raw.githubusercontent.com/fabricioricard/BIGFOOT-Esports-Site/main/images/image3.jpg" alt="Moletom" class="hover-zoom">
                        <p>Moletom BIGFOOT Confortável</p>
                        <p>R$ 120,00</p>
                    </div>
                    <div class="shop-item hover-effect">
                        <img src="https://raw.githubusercontent.com/fabricioricard/BIGFOOT-Esports-Site/main/images/image10.jpg" alt="Mouse" class="hover-zoom">
                        <p>Mouse Gamer Ergonômico</p>
                        <p>R$ 120,00</p>
                    </div>
                    <div class="shop-item hover-effect">
                        <img src="https://raw.githubusercontent.com/fabricioricard/BIGFOOT-Esports-Site/main/images/image6.jpg" alt="Meias" class="hover-zoom">
                        <p>Meias Estilosas BIGFOOT</p>
                        <p>R$ 20,00</p>
                    </div>
                    <div class="shop-item hover-effect">
                        <img src="https://raw.githubusercontent.com/fabricioricard/BIGFOOT-Esports-Site/main/images/image4.jpg" alt="Jaqueta" class="hover-zoom">
                        <p>Jaqueta Leve BIGFOOT</p>
                        <p>R$ 120,00</p>
                    </div>
                </div>
                <div class="shop-button-container">
                    <a href="loja.html" class="btn btn-primary hover-effect">Ver Loja Completa</a>
                </div>
            </section>

            <!-- Sobre a gente -->
            <section class="team-section reveal">
                <h2>Sobre a gente</h2>
                <div class="team-content">
                    <div class="team-text">
                        <p>A BIGFOOT Esports nasceu em 2019, quando montamos nosso primeiro time para disputar campeonatos amadores. O que começou como um projeto entre amigos rapidamente cresceu e se transformou em uma comunidade apaixonada por competição, superação e trabalho em equipe.</p>
                        <p>BIGFOOT Esports, o melhor ainda está por vir.</p>
                    </div>
                    <div class="team-image hover-effect">
                        <img src="https://raw.githubusercontent.com/fabricioricard/BIGFOOT-Esports-Site/main/images/equipe.jpg" alt="Time BIGFOOT" class="hover-zoom">
                    </div>
                </div>
            </section>

            <!-- Contato -->
            <section id="contato" class="contact-section reveal">
                <h2>Entre em Contato</h2>
                <p>Entre em contato com a BIGFOOT Esports! Estamos sempre prontos para ouvir você e responder suas perguntas sobre nossa comunidade.</p>
                <div class="contact-content">
                    <div class="contact-image">
                        <img src="https://raw.githubusercontent.com/fabricioricard/BIGFOOT-Esports-Site/main/images/foto1.jpg" alt="Contato" class="hover-zoom">
                    </div>
                    <form class="contact-form" action="https://formspree.io/f/meozrpvl" method="POST">
                        <input type="hidden" name="_next" value="index.html?status=success">
                        <div class="form-group">
                            <label for="nome-contato">Nome *</label>
                            <input type="text" id="nome-contato" name="nome" placeholder="Digite seu nome" required>
                        </div>
                        <div class="form-group">
                            <label for="sobrenome-contato">Sobrenome *</label>
                            <input type="text" id="sobrenome-contato" name="sobrenome" placeholder="Digite seu sobrenome" required>
                        </div>
                        <div class="form-group full-width">
                            <label for="email-contato">Email *</label>
                            <input type="email" id="email-contato" name="_replyto" placeholder="Digite seu email" required>
                        </div>
                        <div class="form-group full-width">
                            <label for="mensagem">Mensagem *</label>
                            <textarea id="mensagem" name="mensagem" placeholder="Digite sua mensagem aqui..." rows="5" required></textarea>
                        </div>
                        <button type="submit" class="btn btn-primary hover-effect">Enviar Mensagem</button>
                    </form>
                </div>
            </section>
        </main>

        <!-- Rodapé -->
        <footer class="reveal">
            <div class="footer-content">
                <div class="footer-left">
                    <p>BIGFOOT Esports</p>
                    <p>bigftesports@gmail.com</p>
                    <p>Brasil</p>
                </div>
                <div class="footer-right">
                    <a href="https://discord.gg/3aHhvgzGSz" class="social-icon hover-effect"><img src="https://raw.githubusercontent.com/fabricioricard/BIGFOOT-Esports-Site/main/images/dc.svg" alt="Discord"></a>
                    <a href="https://x.com/BFTesports" class="social-icon hover-effect"><img src="https://raw.githubusercontent.com/fabricioricard/BIGFOOT-Esports-Site/main/images/x.svg" alt="X"></a>
                    <a href="https://youtube.com/@BIGFOOTEsports" class="social-icon hover-effect"><img src="https://raw.githubusercontent.com/fabricioricard/BIGFOOT-Esports-Site/main/images/yt.svg" alt="YouTube"></a>
                </div>
            </div>
        </footer>

        <!-- Botão Voltar ao Topo -->
        <button id="back-to-top" class="back-to-top">⬆</button>
        `;
    }

    injectStyles() {
        const style = document.createElement('style');
        style.textContent = `
        /* ===== 1. RESET & BASE STYLES ===== */
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        :root {
            /* Color Palette */
            --primary-gradient: linear-gradient(45deg, #667eea, #764ba2);
            --primary-color: #667eea;
            --secondary-color: #764ba2;
            --accent-color: #4a5568;
            --text-primary: #2d3748;
            --text-secondary: #4a5568;
            --text-muted: #718096;
            --background-main: #ffffff;
            --background-light: #f7fafc;
            --background-card: #ffffff;
            --border-color: #e2e8f0;
            --shadow-light: 0 2px 4px rgba(0, 0, 0, 0.1);
            --shadow-medium: 0 4px 8px rgba(0, 0, 0, 0.15);
            --shadow-heavy: 0 15px 40px rgba(0, 0, 0, 0.3);
            --shadow-primary: 0 5px 15px rgba(102, 126, 234, 0.3);
            
            /* Spacing */
            --spacing-xs: 4px;
            --spacing-sm: 8px;
            --spacing-md: 16px;
            --spacing-lg: 24px;
            --spacing-xl: 32px;
            --spacing-2xl: 48px;
            
            /* Border Radius */
            --radius-sm: 8px;
            --radius-md: 12px;
            --radius-lg: 15px;
            --radius-xl: 25px;
            --radius-full: 50px;
            
            /* Transitions */
            --transition-fast: 0.2s ease;
            --transition-normal: 0.3s ease;
            --transition-slow: 0.5s ease;
            
            /* Typography */
            --font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            --font-weight-normal: 400;
            --font-weight-medium: 500;
            --font-weight-semibold: 600;
            --font-weight-bold: 700;
            --font-sm: 14px;
        }

        body {
            font-family: var(--font-family);
            background-color: var(--background-main);
            color: var(--text-primary);
            line-height: 1.6;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
        }

        /* ===== 2. TYPOGRAPHY & FONTS ===== */
        .text-gradient {
            background: var(--primary-gradient);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }

        .text-truncate {
            white-space: nowrap;
            overflow: hidden;
        }

        .user-details {
            display: flex;
            flex-direction: column;
            min-width: 0;
            flex: 1;
            gap: 2px;
        }

        .user-name-container {
            display: flex;
            align-items: center;
            gap: 8px;
        }

        .user-name {
            font-family: var(--font-family);
            font-size: 15px;
            font-weight: var(--font-weight-semibold);
            color: var(--text-primary);
            line-height: 1.2;
            max-width: 150px;
            cursor: pointer;
            transition: all var(--transition-fast);
            position: relative;
        }

        .user-name:hover {
            color: var(--primary-color);
            transform: scale(1.02);
        }

        .user-info::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(102, 126, 234, 0.1), transparent);
            transition: left 0.5s ease;
        }

        .user-info:hover::before {
            left: 100%;
        }

        .user-info.logged-in {
            display: flex !important;
        }

        .user-info:hover {
            background: rgba(102, 126, 234, 0.05);
            transform: translateY(-3px);
            box-shadow: 0 12px 40px rgba(102, 126, 234, 0.25);
            border-color: rgba(102, 126, 234, 0.3);
        }

        /* Avatar Container with Status */
        .user-avatar-container {
            position: relative;
            flex-shrink: 0;
            cursor: pointer;
        }

        .user-avatar {
            width: 44px;
            height: 44px;
            border-radius: var(--radius-full);
            border: 3px solid transparent;
            background: var(--primary-gradient);
            background-clip: padding-box;
            box-shadow: 0 0 20px rgba(102, 126, 234, 0.4);
            object-fit: cover;
            transition: all var(--transition-normal);
            position: relative;
            cursor: pointer;
        }

        /* Fallback Avatar with Initials */
        .user-avatar.fallback {
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: var(--font-weight-bold);
            font-size: 16px;
            color: #ffffff;
            background: var(--primary-gradient);
            text-transform: uppercase;
        }

        .user-avatar:hover {
            transform: scale(1.1) rotate(5deg);
            box-shadow: 0 0 25px rgba(102, 126, 234, 0.6);
        }

        /* Online Status Indicator */
        .user-status {
            position: absolute;
            bottom: 2px;
            right: 2px;
            width: 14px;
            height: 14px;
            background: #48bb78;
            border: 3px solid #ffffff;
            border-radius: var(--radius-full);
            box-shadow: 0 0 10px rgba(72, 187, 120, 0.5);
            animation: pulse 2s infinite;
        }

        @keyframes pulse {
            0% {
                box-shadow: 0 0 0 0 rgba(72, 187, 120, 0.7);
            }
            70% {
                box-shadow: 0 0 0 10px rgba(72, 187, 120, 0);
            }
            100% {
                box-shadow: 0 0 0 0 rgba(72, 187, 120, 0);
            }
        }

        .user-name.gradient {
            background: var(--primary-gradient);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }

        /* User Level/Points Badge */
        .user-level {
            font-size: 11px;
            color: var(--text-muted);
            font-weight: var(--font-weight-medium);
            background: rgba(102, 126, 234, 0.1);
            padding: 2px 8px;
            border-radius: 10px;
            display: inline-block;
            margin-top: 2px;
        }

        /* Modal Styles */
        .modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.75);
            backdrop-filter: blur(5px);
            display: none;
            z-index: 1001;
            animation: modalFadeIn var(--transition-slow) ease;
        }

        .modal.show {
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .modal-content {
            background: var(--background-card);
            border-radius: var(--radius-lg);
            box-shadow: var(--shadow-heavy);
            max-width: 480px;
            width: 90%;
            max-height: 85vh;
            overflow-y: auto;
            padding: var(--spacing-xl);
            position: relative;
            animation: modalSlideIn var(--transition-slow) ease;
        }

        .modal-header {
            text-align: center;
            margin-bottom: var(--spacing-lg);
        }

        .modal-header h2 {
            font-family: 'Montserrat', sans-serif;
            font-size: 24px;
            font-weight: 800;
        }

        .modal-header p {
            font-size: 14px;
            color: var(--text-muted);
        }

        .modal-close {
            position: absolute;
            top: var(--spacing-md);
            right: var(--spacing-md);
            background: none;
            border: none;
            font-size: 24px;
            cursor: pointer;
            color: var(--text-muted);
            transition: color var(--transition-fast);
        }

        .modal-close:hover {
            color: var(--text-primary);
        }

        .modal-tabs {
            display: flex;
            margin-bottom: var(--spacing-xl);
            border-radius: var(--spacing-sm);
            background: var(--background-light);
            padding: 6px;
            position: relative;
        }

        .modal-tab {
            flex: 1;
            padding: var(--spacing-md);
            text-align: center;
            border-radius: var(--spacing-sm);
            cursor: pointer;
            transition: all var(--transition-normal);
            font-family: var(--font-family);
            font-weight: var(--font-weight-semibold);
            font-size: 14px;
            color: var(--text-secondary);
            position: relative;
            z-index: 2;
        }

        .modal-tab.active {
            background: var(--primary-color);
            color: #ffffff;
            transform: translateY(-1px);
        }

        .tab-content {
            display: none;
            animation: tabFadeIn var(--transition-normal) ease;
        }

        .tab-content.active {
            display: block;
        }

        .form-group {
            margin-bottom: var(--spacing-lg);
        }

        .form-group label {
            display: block;
            margin-bottom: var(--spacing-sm);
            font-weight: var(--font-weight-medium);
            color: var(--text-primary);
            font-size: 14px;
        }

        .form-group input {
            width: 100%;
            border: 2px solid var(--border-color);
            border-radius: var(--radius-md);
            font-size: 14px;
            font-family: var(--font-family);
            outline: none;
            padding: 14px var(--spacing-md);
            transition: all var(--transition-normal);
            background: var(--background-main);
        }

        .form-group input:focus {
            border-color: var(--primary-color);
            box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
            background: #ffffff;
        }

        .form-group input:invalid {
            border-color: var(--border-color);
        }

        .error-text {
            color: #e53e3e;
            font-size: 12px;
            margin-top: var(--spacing-xs);
            display: none;
            font-weight: var(--font-weight-medium);
        }

        .error-text.show {
            display: block;
            animation: errorSlideIn var(--transition-fast) ease;
        }

        /* Profile Modal Specific Styles */
        .profile-info {
            display: flex;
            flex-direction: column;
            gap: var(--spacing-md);
        }

        .profile-avatar-section {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: var(--spacing-sm);
        }

        .profile-avatar {
            width: 80px;
            height: 80px;
            border-radius: var(--radius-full);
            border: 3px solid var(--primary-color);
            object-fit: cover;
            box-shadow: var(--shadow-primary);
            transition: all var(--transition-normal);
        }

        .profile-avatar:hover {
            transform: scale(1.05);
            box-shadow: 0 0 20px rgba(102, 126, 234, 0.5);
        }

        .profile-details {
            display: grid;
            gap: var(--spacing-sm);
        }

        .profile-field {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: var(--spacing-xs) var(--spacing-sm);
            background: var(--background-light);
            border-radius: var(--radius-sm);
            border-left: 3px solid var(--primary-color);
        }

        .profile-field-label {
            font-weight: var(--font-weight-semibold);
            color: var(--text-secondary);
            font-size: 13px;
        }

        .profile-field-value {
            color: var(--text-primary);
            font-weight: var(--font-weight-medium);
            font-size: 13px;
            max-width: 200px;
            text-align: right;
            word-break: break-word;
        }

        .stats-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: var(--spacing-sm);
            margin-top: var(--spacing-md);
        }

        .stat-card {
            background: var(--primary-gradient);
            color: white;
            padding: var(--spacing-sm);
            border-radius: var(--radius-md);
            text-align: center;
            box-shadow: var(--shadow-primary);
        }

        .stat-card h4 {
            font-size: 18px;
            font-weight: var(--font-weight-bold);
            margin-bottom: 2px;
        }

        .stat-card p {
            font-size: 11px;
            opacity: 0.9;
        }

        /* ===== 5. HEADER STYLES ===== */
        header {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            background: rgba(255, 255, 255, 0.98);
            backdrop-filter: blur(12px);
            z-index: 1000;
            box-shadow: var(--shadow-light);
            border-bottom: 1px solid var(--border-color);
        }

        .header-container {
            max-width: 1400px;
            margin: 0 auto;
            padding: var(--spacing-sm) var(--spacing-lg);
            display: flex;
            align-items: center;
            justify-content: space-between;
            min-height: 60px;
        }

        .logo {
            display: flex;
            align-items: center;
            gap: var(--spacing-sm);
            flex-shrink: 0;
        }

        .logo a {
            display: flex;
            align-items: center;
            gap: var(--spacing-sm);
            text-decoration: none;
        }

        .logo-jpg {
            width: 48px;
            height: 48px;
            object-fit: contain;
            border-radius: 50%;
            transition: transform var(--transition-slow), filter var(--transition-normal);
        }

        .logo-jpg:hover {
            transform: scale(1.1);
            filter: brightness(1.2);
        }

        .logo span {
            margin: 0;
            font-family: 'Montserrat', sans-serif;
            font-size: 24px;
            font-weight: 800;
            letter-spacing: 1px;
            line-height: 1;
            background: var(--primary-gradient);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }

        nav {
            flex-grow: 1;
            display: flex;
            justify-content: center;
        }

        .nav-menu {
            display: flex;
            align-items: center;
            list-style: none;
            margin: 0;
            padding: 0;
            gap: var(--spacing-sm);
        }

        .nav-menu li a {
            display: flex;
            align-items: center;
            gap: var(--spacing-xs);
            white-space: nowrap;
            color: var(--text-secondary);
            font-family: var(--font-family);
            font-size: 16px;
            font-weight: var(--font-weight-semibold);
            text-decoration: none;
            transition: all var(--transition-normal);
            padding: var(--spacing-sm) var(--spacing-md);
            border-radius: var(--radius-xl);
        }

        .nav-menu li a:hover,
        .nav-menu li a.active {
            color: var(--primary-color);
            background: rgba(102, 126, 234, 0.1);
            transform: translateY(-2px);
        }

        .user-section {
            justify-content: flex-end;
            min-width: 200px;
            max-width: 450px;
            flex-shrink: 0;
            position: relative;
        }

        .login-btn {
            display: inline-flex;
        }

        .user-section.logged-in .login-btn {
            display: none;
        }

        .user-info {
            display: none;
        }

        .user-section.logged-in .user-info {
            display: flex;
        }

        /* ===== 6. HERO SECTION ===== */
        .hero-section {
            align-items: center;
            background: url('https://raw.githubusercontent.com/fabricioricard/BIGFOOT-Esports-Site/main/images/fundo.jpg') no-repeat center center/cover;
            background-attachment: scroll;
            color: #fff;
            display: flex;
            height: 100vh;
            justify-content: center;
            position: relative;
            text-align: center;
        }

        .hero-overlay {
            background: linear-gradient(135deg, rgba(0, 0, 0, 0.5), rgba(102, 126, 234, 0.2));
            height: 100%;
            left: 0;
            position: absolute;
            top: 0;
            width: 100%;
            z-index: 1;
        }

        .hero-content {
            background: rgba(0, 0, 0, 0.6);
            animation: fadeInUp 1.5s ease;
            border-radius: var(--radius-lg);
            box-shadow: var(--shadow-heavy);
            padding: var(--spacing-2xl);
            position: relative;
            z-index: 2;
        }

        .hero-content h1 {
            font-family: 'Montserrat', sans-serif;
            font-size: 64px;
            font-weight: 800;
            letter-spacing: 2px;
            margin-bottom: var(--spacing-md);
            text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
            text-transform: uppercase;
            animation: slideInLeft 1s ease-out;
        }

        .hero-content p {
            font-family: var(--font-family);
            font-size: 24px;
            font-weight: var(--font-weight-normal);
            margin-bottom: var(--spacing-lg);
            opacity: 0.9;
            animation: slideInRight 1s ease-out 0.3s;
            animation-fill-mode: both;
        }

        .hero-buttons {
            display: flex;
            justify-content: center;
            gap: var(--spacing-lg);
        }

        /* ===== 7. DONATION SECTION ===== */
        .donation-section {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            z-index: 10000;
            display: none;
        }

        .donation-section.floating {
            display: block;
        }

        .donation-section.hidden {
            display: none !important;
        }

        .donation-content {
            background: rgba(0, 0, 0, 0.9);
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-radius: var(--radius-lg);
            box-shadow: var(--shadow-heavy);
            padding: var(--spacing-xl);
            position: relative;
            color: #fff;
            text-align: center;
            min-width: 400px;
        }

        .donation-content h1 {
            font-family: 'Montserrat', sans-serif;
            font-size: 32px;
            font-weight: 800;
            margin-bottom: var(--spacing-md);
        }

        .donation-content p {
            font-family: var(--font-family);
            font-size: 16px;
            margin-bottom: var(--spacing-lg);
            color: #ccc;
        }

        .qr-code {
            border-radius: var(--radius-md);
            display: block;
            margin: 0 auto var(--spacing-lg);
            max-width: 200px;
            box-shadow: var(--shadow-light);
        }

        .close {
            color: #fff;
            cursor: pointer;
            font-size: 28px;
            position: absolute;
            right: var(--spacing-md);
            top: var(--spacing-sm);
            transition: color var(--transition-fast), transform var(--transition-normal);
        }

        .close:hover {
            transform: rotate(90deg);
        }

        /* ===== 8. STATS SECTION ===== */
        .stats-section {
            background: var(--primary-gradient);
            color: #fff;
            padding: var(--spacing-2xl) var(--spacing-md);
            text-align: center;
        }

        .stats-section h2 {
            font-family: 'Montserrat', sans-serif;
            font-size: 40px;
            font-weight: 800;
            margin-bottom: var(--spacing-xl);
            animation: fadeInDown 1s ease-out;
        }

        .stats-content {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: var(--spacing-xl);
        }

        .stat-item {
            background: rgba(255, 255, 255, 0.1);
            border-radius: var(--radius-lg);
            padding: var(--spacing-lg);
            text-align: center;
            transition: transform var(--transition-normal);
            width: 200px;
            animation: scaleIn 0.8s ease-out;
            animation-fill-mode: both;
        }

        .stat-item:nth-child(1) { animation-delay: 0.2s; }
        .stat-item:nth-child(2) { animation-delay: 0.4s; }

        .stat-item:hover {
            transform: translateY(-10px);
        }

        .stat-number {
            font-family: 'Montserrat', sans-serif;
            font-size: 48px;
            font-weight: 800;
            margin-bottom: var(--spacing-sm);
            display: block;
        }

        .stat-item p {
            font-family: var(--font-family);
            font-size: 16px;
            opacity: 0.9;
        }

        /* ===== 9. SHOP SECTION ===== */
        .shop-section {
            background: linear-gradient(135deg, var(--background-light), var(--background-main));
            padding: var(--spacing-2xl) var(--spacing-md);
            text-align: center;
        }

        .shop-section h2 {
            color: var(--primary-color);
            font-family: 'Montserrat', sans-serif;
            font-size: 40px;
            font-weight: 800;
            margin-bottom: var(--spacing-xl);
        }

        .shop-items {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: var(--spacing-lg);
        }

        .shop-item {
            background: var(--background-card);
            border-radius: var(--radius-lg);
            box-shadow: var(--shadow-light);
            padding: var(--spacing-lg);
            text-align: center;
            transition: all var(--transition-normal);
            width: 220px;
        }

        .shop-item:hover {
            box-shadow: var(--shadow-medium);
            transform: translateY(-10px);
        }

        .shop-item img {
            border-radius: var(--radius-md);
            height: 160px;
            margin-bottom: var(--spacing-md);
            object-fit: cover;
            width: 100%;
        }

        .shop-item p {
            color: var(--text-primary);
            font-family: var(--font-family);
            font-size: 16px;
            margin: var(--spacing-sm) 0;
        }

        .shop-item p:last-child {
            color: var(--primary-color);
            font-weight: var(--font-weight-semibold);
        }

        .shop-button-container {
            margin-top: var(--spacing-xl);
        }

        /* ===== 10. TEAM SECTION ===== */
        .team-section {
            background: linear-gradient(135deg, var(--background-main), var(--background-light));
            border-radius: var(--radius-lg);
            box-shadow: var(--shadow-light);
            margin: var(--spacing-lg);
            padding: var(--spacing-2xl) var(--spacing-md);
            text-align: center;
        }

        .team-section h2 {
            color: var(--primary-color);
            font-family: 'Montserrat', sans-serif;
            font-size: 40px;
            font-weight: 800;
            margin-bottom: var(--spacing-xl);
        }

        .team-content {
            align-items: center;
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: var(--spacing-xl);
        }

        .team-text {
            max-width: 450px;
        }

        .team-text p {
            color: var(--text-secondary);
            font-family: var(--font-family);
            font-size: 18px;
            margin-bottom: var(--spacing-lg);
        }

        .team-image img {
            height: auto;
            border-radius: var(--radius-lg);
            box-shadow: var(--shadow-light);
            max-width: 400px;
            width: 100%;
        }

        /* ===== 11. CONTACT SECTION ===== */
        .contact-section {
            box-shadow: var(--shadow-light);
            background: linear-gradient(135deg, var(--background-main), var(--background-light));
            border-radius: var(--radius-lg);
            margin: var(--spacing-lg) var(--spacing-lg) 0;
            padding: var(--spacing-2xl) var(--spacing-md);
            text-align: center;
        }

        .contact-section h2 {
            color: var(--primary-color);
            font-family: 'Montserrat', sans-serif;
            font-size: 40px;
            font-weight: 800;
            margin-bottom: var(--spacing-lg);
        }

        .contact-section p {
            color: var(--text-secondary);
            font-family: var(--font-family);
            font-size: 18px;
            margin-bottom: var(--spacing-lg);
        }

        .contact-content {
            align-items: center;
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: var(--spacing-xl);
        }

        .contact-image img {
            height: auto;
            border-radius: var(--radius-lg);
            box-shadow: var(--shadow-light);
            max-width: 400px;
            width: 100%;
        }

        .contact-form {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: var(--spacing-lg);
            max-width: 600px;
        }

        .form-group {
            display: flex;
            flex-direction: column;
        }

        .form-group.full-width {
            grid-column: 1 / -1;
        }

        .form-group label {
            font-weight: var(--font-weight-semibold);
            margin-bottom: var(--spacing-sm);
            color: var(--text-primary);
            font-size: 14px;
        }

        .form-group input,
        .form-group textarea {
            padding: 12px var(--spacing-md);
            border: 2px solid var(--border-color);
            border-radius: var(--radius-md);
            font-size: 14px;
            font-family: var(--font-family);
            transition: all var(--transition-normal);
            background-color: var(--background-main);
        }

        .form-group input:focus,
        .form-group textarea:focus {
            outline: none;
            border-color: var(--primary-color);
            box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
        }

        .form-group textarea {
            resize: vertical;
            min-height: 120px;
        }

        /* ===== 12. FOOTER ===== */
        footer {
            background: var(--primary-gradient);
            color: #fff;
            flex-shrink: 0;
            padding: var(--spacing-2xl) var(--spacing-md);
            text-align: center;
        }

        .footer-content {
            align-items: center;
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            margin: 0 auto;
            max-width: 1200px;
            gap: var(--spacing-lg);
        }

        .footer-left p {
            font-family: var(--font-family);
            font-size: 16px;
            margin: var(--spacing-sm) 0;
            opacity: 0.9;
        }

        .footer-right {
            display: flex;
            gap: var(--spacing-lg);
        }

        .social-icon img {
            height: 40px;
            width: 40px;
            transition: transform var(--transition-normal), filter var(--transition-normal);
        }

        .social-icon:hover img {
            filter: brightness(1.3);
            transform: scale(1.2);
        }

        /* ===== 13. BACK TO TOP BUTTON ===== */
        .back-to-top {
            background: var(--primary-gradient);
            border: none;
            border-radius: var(--radius-full);
            bottom: var(--spacing-lg);
            box-shadow: var(--shadow-light);
            color: #fff;
            cursor: pointer;
            display: none;
            font-size: 24px;
            height: 50px;
            position: fixed;
            right: var(--spacing-lg);
            transition: all var(--transition-normal);
            width: 50px;
            z-index: 1000;
        }

        .back-to-top:hover {
            transform: scale(1.2);
        }

        /* ===== 14. ANIMATIONS & EFFECTS ===== */
        .reveal {
            opacity: 0;
            transform: translateY(50px);
            transition: all 0.8s ease-out;
        }

        .reveal.visible {
            opacity: 1;
            transform: translateY(0);
        }

        .hover-zoom {
            transition: transform var(--transition-slow), filter var(--transition-normal);
        }

        .hover-zoom:hover {
            filter: brightness(1.1);
            transform: scale(1.05);
        }

        .hover-effect {
            transition: all var(--transition-normal);
        }

        .hover-effect:hover {
            transform: translateY(-5px);
        }

        @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }

        @keyframes modalFadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }

        @keyframes modalSlideIn {
            from { opacity: 0; transform: translateY(30px) scale(0.95); }
            to { opacity: 1; transform: translateY(0) scale(1); }
        }

        @keyframes tabFadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }

        @keyframes errorSlideIn {
            from { opacity: 0; transform: translateX(-10px); }
            to { opacity: 1; transform: translateX(0); }
        }

        @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
        }

        @keyframes slideInLeft {
            from { opacity: 0; transform: translateX(-30px); }
            to { opacity: 1; transform: translateX(0); }
        }

        @keyframes slideInRight {
            from { opacity: 0; transform: translateX(30px); }
            to { opacity: 1; transform: translateX(0); }
        }

        @keyframes fadeInDown {
            from { opacity: 0; transform: translateY(-30px); }
            to { opacity: 1; transform: translateY(0); }
        }

        @keyframes scaleIn {
            from { opacity: 0; transform: scale(0.9); }
            to { opacity: 1; transform: scale(1); }
        }

        html {
            scroll-behavior: smooth;
        }

        *:focus-visible {
            outline: 2px solid var(--primary-color);
            outline-offset: 2px;
        }

        /* ===== 15. RESPONSIVE DESIGN ===== */
        @media (max-width: 1024px) {
            .container {
                padding: 0 var(--spacing-lg);
            }
        }

        @media (max-width: 768px) {
            :root {
                --spacing-xl: 24px;
                --spacing-2xl: 32px;
            }

            header {
                padding: var(--spacing-xs) var(--spacing-md);
            }

            .header-container {
                flex-direction: column;
                gap: var(--spacing-sm);
                padding: var(--spacing-sm) var(--spacing-md);
            }

            nav {
                flex-direction: column;
                gap: var(--spacing-sm);
            }

            .nav-menu {
                flex-wrap: wrap;
                justify-content: center;
                gap: var(--spacing-sm);
            }

            .user-section {
                justify-content: center;
                min-width: unset;
                max-width: 100%;
                padding: var(--spacing-sm) 0;
            }

            .user-info {
                max-width: 320px;
            }

            .user-name {
                font-size: 13px;
                max-width: 140px;
            }

            .user-avatar {
                width: 38px;
                height: 38px;
            }

            .hero-section {
                height: 70vh;
                background-attachment: scroll;
            }

            .hero-content {
                padding: var(--spacing-lg);
            }

            .hero-content h1 {
                font-size: 36px;
            }

            .hero-content p {
                font-size: 18px;
            }

            .team-content,
            .contact-content {
                flex-direction: column;
                gap: var(--spacing-lg);
            }

            .contact-form {
                grid-template-columns: 1fr;
            }

            .form-group.full-width {
                grid-column: 1;
            }

            .footer-content {
                flex-direction: column;
                align-items: center;
            }

            .donation-content {
                min-width: 0;
                max-width: 90vw;
                padding: var(--spacing-lg) var(--spacing-md);
            }

            .user-name-container {
                flex-direction: column;
                align-items: flex-start;
                gap: 4px;
            }

            .btn-logout {
                margin-left: 0;
                align-self: flex-start;
            }
        }

        @media (max-width: 480px) {
            .modal-content {
                width: 95%;
                max-height: 90vh;
                padding: var(--spacing-md);
            }
            
            .profile-avatar {
                width: 70px;
                height: 70px;
            }
            
            .profile-field {
                flex-direction: column;
                align-items: flex-start;
                gap: var(--spacing-xs);
            }
            
            .profile-field-value {
                max-width: 100%;
                text-align: left;
            }
            
            .stats-grid {
                grid-template-columns: repeat(3, 1fr);
                gap: var(--spacing-xs);
            }
            
            .stat-card {
                padding: var(--spacing-xs);
            }
            
            .stat-card h4 {
                font-size: 16px;
            }
            
            .stat-card p {
                font-size: 10px;
            }
        }

        /* ===== 16. UTILITIES ===== */
        .d-none { display: none !important; }
        .d-block { display: block !important; }
        .d-flex { display: flex !important; }
        .d-grid { display: grid !important; }

        .align-items-center { align-items: center !important; }
        .align-items-start { align-items: flex-start !important; }
        .align-items-end { align-items: flex-end !important; }
        .justify-content-center { justify-content: center !important; }
        .justify-content-between { justify-content: space-between !important; }
        .justify-content-start { justify-content: flex-start !important; }
        .justify-content-end { justify-content: flex-end !important; }

        .m-0 { margin: 0 !important; }
        .mt-1 { margin-top: var(--spacing-xs) !important; }
        .mt-2 { margin-top: var(--spacing-sm) !important; }
        .mt-3 { margin-top: var(--spacing-md) !important; }
        .mt-4 { margin-top: var(--spacing-lg) !important; }
        .mb-1 { margin-bottom: var(--spacing-xs) !important; }
        .mb-2 { margin-bottom: var(--spacing-sm) !important; }
        .mb-3 { margin-bottom: var(--spacing-md) !important; }
        .mb-4 { margin-bottom: var(--spacing-lg) !important; }

        .p-0 { padding: 0 !important; }
        .pt-1 { padding-top: var(--spacing-xs) !important; }
        .pt-2 { padding-top: var(--spacing-sm) !important; }
        .pt-3 { padding-top: var(--spacing-md) !important; }
        .pt-4 { padding-top: var(--spacing-lg) !important; }
        .pb-1 { padding-bottom: var(--spacing-xs) !important; }
        .pb-2 { padding-bottom: var(--spacing-sm) !important; }
        .pb-3 { padding-bottom: var(--spacing-md) !important; }
        .pb-4 { padding-bottom: var(--spacing-lg) !important; }

        .text-center { text-align: center !important; }
        .text-left { text-align: left !important; }
        .text-right { text-align: right !important; }

        .text-primary { color: var(--primary-color) !important; }
        .text-secondary { color: var(--text-secondary) !important; }
        .text-muted { color: var(--text-muted) !important; }

        .rounded { border-radius: var(--radius-sm) !important; }
        .rounded-lg { border-radius: var(--radius-lg) !important; }
        .rounded-full { border-radius: var(--radius-full) !important; }

        .shadow-sm { box-shadow: var(--shadow-light) !important; }
        .shadow-md { box-shadow: var(--shadow-medium) !important; }
        .shadow-lg { box-shadow: var(--shadow-heavy) !important; }

        .gpu-accelerated {
            transform: translateZ(0);
            will-change: transform;
        }

        .sr-only {
            position: absolute;
            width: 1px;
            height: 1px;
            padding: 0;
            margin: -1px;
            overflow: hidden;
            clip: rect(0, 0, 0, 0);
            white-space: nowrap;
            border: 0;
        }

        @media print {
            .modal,
            .btn,
            .user-section {
                display: none !important;
            }

            .news-card {
                break-inside: avoid;
                box-shadow: none;
                border: 1px solid #ccc;
            }
        }

        @media (prefers-reduced-motion: reduce) {
            *,
            *::before,
            *::after {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
                scroll-behavior: auto !important;
            }
        }

        @keyframes slideInRight {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOutRight {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
        `;
        document.head.appendChild(style);
    }

    bindEvents() {
        // Aguardar o DOM estar pronto
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setupEventListeners());
        } else {
            this.setupEventListeners();
        }
    }

    setupEventListeners() {
        // Elementos DOM
        this.loginBtn = document.getElementById('login-btn');
        this.loginModal = document.getElementById('login-modal');
        this.closeModal = document.getElementById('close-modal');
        this.profileModal = document.getElementById('profile-modal');
        this.closeProfileModal = document.getElementById('close-profile-modal');
        this.userSection = document.getElementById('user-section');
        this.userInfo = document.getElementById('userInfo');
        this.logoutBtnMini = document.getElementById('logout-btn-mini');
        this.modalTabs = document.querySelectorAll('.modal-tab');
        this.tabContents = document.querySelectorAll('.tab-content');
        this.avatarContainer = document.getElementById('avatar-container');
        this.avatarFileInput = document.getElementById('avatar-file-input');
        this.userName = document.getElementById('userName');
        this.changeAvatarBtn = document.getElementById('change-avatar-btn');

        // Event listeners principais
        if (this.loginBtn) this.loginBtn.addEventListener('click', () => this.openLoginModal());
        if (this.closeModal) this.closeModal.addEventListener('click', () => this.closeLoginModal());
        if (this.closeProfileModal) this.closeProfileModal.addEventListener('click', () => this.closeProfileModalFn());
        if (this.logoutBtnMini) this.logoutBtnMini.addEventListener('click', () => this.logout());
        if (this.userName) this.userName.addEventListener('click', () => this.openProfileModal());

        // Modal tabs
        this.modalTabs.forEach(tab => {
            tab.addEventListener('click', () => this.switchTab(tab.dataset.tab));
        });

        // Forms
        const loginForm = document.getElementById('login-form');
        const registerForm = document.getElementById('register-form');
        const googleLogin = document.getElementById('google-login');
        const forgotPasswordLink = document.getElementById('forgot-password-link');

        if (loginForm) loginForm.addEventListener('submit', (e) => this.handleLogin(e));
        if (registerForm) registerForm.addEventListener('submit', (e) => this.handleRegister(e));
        if (googleLogin) googleLogin.addEventListener('click', () => this.handleGoogleLogin());
        if (forgotPasswordLink) {
            forgotPasswordLink.addEventListener('click', (e) => {
                e.preventDefault();
                this.showNotification('Funcionalidade de redefinição de senha em desenvolvimento.', 'info');
            });
        }

        // Avatar upload
        if (this.changeAvatarBtn) {
            this.changeAvatarBtn.addEventListener('click', () => {
                if (this.avatarFileInput) this.avatarFileInput.click();
            });
        }
        if (this.avatarFileInput) {
            this.avatarFileInput.addEventListener('change', (e) => this.handleAvatarUpload(e));
        }

        // Fechar modais clicando fora
        if (this.loginModal) {
            this.loginModal.addEventListener('click', (e) => {
                if (e.target === this.loginModal) this.closeLoginModal();
            });
        }
        if (this.profileModal) {
            this.profileModal.addEventListener('click', (e) => {
                if (e.target === this.profileModal) this.closeProfileModalFn();
            });
        }

        // Animações de scroll
        this.setupScrollAnimations();

        // Botão voltar ao topo
        this.setupBackToTop();

        // Smooth scroll
        this.setupSmoothScroll();

        // Doação
        this.setupDonationBox();
    }

    setupScrollAnimations() {
        const animateOnScroll = () => {
            const reveals = document.querySelectorAll('.reveal');
            reveals.forEach(reveal => {
                const windowHeight = window.innerHeight;
                const elementTop = reveal.getBoundingClientRect().top;
                const elementVisible = 150;
                if (elementTop < windowHeight - elementVisible) {
                    reveal.classList.add('visible');
                }
            });
        };

        window.addEventListener('scroll', animateOnScroll);
        animateOnScroll();
    }

    setupBackToTop() {
        const backToTop = document.getElementById('back-to-top');
        if (backToTop) {
            window.addEventListener('scroll', () => {
                if (window.pageYOffset > 300) {
                    backToTop.style.display = 'block';
                } else {
                    backToTop.style.display = 'none';
                }
            });

            backToTop.addEventListener('click', () => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }
    }

    setupSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                const href = this.getAttribute('href');
                if (href !== '#' && href.startsWith('#')) {
                    e.preventDefault();
                    const target = document.querySelector(href);
                    if (target) {
                        target.scrollIntoView({
                            behavior: 'smooth'
                        });
                    }
                }
            });
        });
    }

    setupDonationBox() {
        const donationBox = document.getElementById('donation-box');
        const closeDonation = document.getElementById('close-donation');
        
        if (closeDonation && donationBox) {
            closeDonation.addEventListener('click', () => {
                donationBox.classList.add('hidden');
            });
        }
        
        // Auto-fechar após 10 segundos
        setTimeout(() => {
            if (donationBox && !donationBox.classList.contains('hidden')) {
                donationBox.classList.add('hidden');
            }
        }, 10000);
    }

    // Utility Methods
    copyPixKey() {
        const key = document.getElementById('pix-key')?.textContent;
        if (key && navigator.clipboard) {
            navigator.clipboard.writeText(key).then(() => {
                this.showNotification('Chave PIX copiada com sucesso! 📋', 'success');
            }).catch(() => {
                this.showNotification('Erro ao copiar chave PIX.', 'error');
            });
        }
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        const colors = {
            success: 'linear-gradient(45deg, #48bb78, #38a169)',
            error: 'linear-gradient(45deg, #e53e3e, #c53030)',
            info: 'linear-gradient(45deg, #667eea, #764ba2)'
        };
        
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${colors[type] || colors.info};
            color: white;
            padding: 15px 20px;
            border-radius: 10px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.3);
            z-index: 10000;
            font-family: 'Poppins', sans-serif;
            font-weight: 600;
            animation: slideInRight 0.5s ease-out;
            max-width: 300px;
        `;
        notification.textContent = message;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.5s ease-in';
            setTimeout(() => notification.remove(), 500);
        }, 4000);
    }

    validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // Modal Methods
    openLoginModal() {
        if (this.loginModal) {
            this.loginModal.classList.add('show');
            document.body.style.overflow = 'hidden';
        }
    }

    closeLoginModal() {
        if (this.loginModal) {
            this.loginModal.classList.remove('show');
            document.body.style.overflow = '';
            this.clearLoginErrors();
            
            const loginForm = document.getElementById('login-form');
            const registerForm = document.getElementById('register-form');
            if (loginForm) loginForm.reset();
            if (registerForm) registerForm.reset();
        }
    }

    openProfileModal() {
        if (typeof firebase !== 'undefined' && firebase.auth().currentUser) {
            const user = firebase.auth().currentUser;
            this.updateProfileModal(user);
            if (this.profileModal) {
                this.profileModal.classList.add('show');
                document.body.style.overflow = 'hidden';
            }
        }
    }

    closeProfileModalFn() {
        if (this.profileModal) {
            this.profileModal.classList.remove('show');
            document.body.style.overflow = '';
        }
    }

    switchTab(tabName) {
        this.modalTabs.forEach(tab => tab.classList.remove('active'));
        this.tabContents.forEach(content => content.classList.remove('active'));
        
        const targetTab = document.querySelector(`[data-tab="${tabName}"]`);
        const targetContent = document.getElementById(`${tabName}-tab`);
        
        if (targetTab) targetTab.classList.add('active');
        if (targetContent) targetContent.classList.add('active');
    }

    clearLoginErrors() {
        const errors = [
            'login-email-error',
            'login-password-error',
            'register-email-error',
            'register-password-error'
        ];
        
        errors.forEach(id => {
            const element = document.getElementById(id);
            if (element) element.classList.remove('show');
        });
    }

    // Authentication Methods
    handleLogin(e) {
        e.preventDefault();
        
        if (typeof firebase === 'undefined') {
            this.showNotification('Firebase não está carregado. Tente novamente.', 'error');
            return;
        }

        const email = document.getElementById('login-email')?.value;
        const password = document.getElementById('login-password')?.value;
        const emailError = document.getElementById('login-email-error');
        const passwordError = document.getElementById('login-password-error');

        this.clearLoginErrors();

        if (!this.validateEmail(email)) {
            if (emailError) {
                emailError.textContent = 'Por favor, insira um e-mail válido';
                emailError.classList.add('show');
            }
            return;
        }
        if (!password) {
            if (passwordError) {
                passwordError.textContent = 'Por favor, insira uma senha';
                passwordError.classList.add('show');
            }
            return;
        }

        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(userCredential => {
                const user = userCredential.user;
                this.updateUIForLoggedIn(user);
                this.closeLoginModal();
                this.showNotification(`👋 Bem-vindo de volta, ${user.displayName || user.email.split('@')[0]}!`, 'success');
            })
            .catch(error => {
                if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
                    if (passwordError) {
                        passwordError.textContent = 'E-mail ou senha incorretos';
                        passwordError.classList.add('show');
                    }
                } else {
                    this.showNotification('Erro ao fazer login: ' + error.message, 'error');
                }
            });
    }

    handleRegister(e) {
        e.preventDefault();
        
        if (typeof firebase === 'undefined') {
            this.showNotification('Firebase não está carregado. Tente novamente.', 'error');
            return;
        }

        const email = document.getElementById('register-email')?.value;
        const password = document.getElementById('register-password')?.value;
        const emailError = document.getElementById('register-email-error');
        const passwordError = document.getElementById('register-password-error');

        this.clearLoginErrors();

        if (!this.validateEmail(email)) {
            if (emailError) {
                emailError.textContent = 'Por favor, insira um e-mail válido';
                emailError.classList.add('show');
            }
            return;
        }
        if (password.length < 6) {
            if (passwordError) {
                passwordError.textContent = 'A senha deve ter pelo menos 6 caracteres';
                passwordError.classList.add('show');
            }
            return;
        }

        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(userCredential => {
                const user = userCredential.user;
                const avatarUrl = this.generateAvatar(user.email);
                user.updateProfile({ photoURL: avatarUrl }).then(() => {
                    this.updateUIForLoggedIn(user);
                    this.closeLoginModal();
                    this.showNotification(`🎉 Bem-vindo à BIGFOOT Esports, ${user.email.split('@')[0]}! Sua conta foi criada com sucesso!`, 'success');
                });
            })
            .catch(error => {
                if (error.code === 'auth/email-already-in-use') {
                    if (emailError) {
                        emailError.textContent = 'Este e-mail já está registrado';
                        emailError.classList.add('show');
                    }
                } else {
                    this.showNotification('Erro ao criar conta: ' + error.message, 'error');
                }
            });
    }

    handleGoogleLogin() {
        if (typeof firebase === 'undefined') {
            this.showNotification('Firebase não está carregado. Tente novamente.', 'error');
            return;
        }

        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider)
            .then(result => {
                const user = result.user;
                this.updateUIForLoggedIn(user);
                this.closeLoginModal();
                this.showNotification(`👋 Bem-vindo, ${user.displayName || user.email.split('@')[0]}!`, 'success');
            })
            .catch(error => {
                this.showNotification('Erro ao fazer login com Google: ' + error.message, 'error');
            });
    }

    handleAvatarUpload(e) {
        const file = e.target.files[0];
        if (!file) return;

        if (!file.type.startsWith('image/')) {
            this.showNotification('Por favor, selecione um arquivo de imagem', 'error');
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            this.showNotification('A imagem deve ter menos de 5MB', 'error');
            return;
        }

        const user = firebase?.auth()?.currentUser;
        if (!user) {
            this.showNotification('Usuário não autenticado. Faça login novamente.', 'error');
            return;
        }

        this.showNotification('Processando seu avatar personalizado...', 'info');

        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const img = new Image();
        
        img.onload = () => {
            const size = 200;
            canvas.width = size;
            canvas.height = size;
            
            const { width, height } = img;
            let sourceX = 0, sourceY = 0, sourceSize;
            
            if (width > height) {
                sourceSize = height;
                sourceX = (width - height) / 2;
            } else {
                sourceSize = width;
                sourceY = (height - width) / 2;
            }
            
            ctx.fillStyle = '#f0f0f0';
            ctx.fillRect(0, 0, size, size);
            ctx.drawImage(img, sourceX, sourceY, sourceSize, sourceSize, 0, 0, size, size);
            
            const resizedImageData = canvas.toDataURL('image/jpeg', 0.9);
            const storageKey = `custom_avatar_${user.uid}`;
            
            try {
                localStorage.setItem(storageKey, resizedImageData);
                const verification = localStorage.getItem(storageKey);
                
                if (verification === resizedImageData) {
                    this.updateAllAvatarElements(resizedImageData);
                    this.showNotification('✅ Avatar personalizado salvo com sucesso!', 'success');
                    if (this.avatarFileInput) this.avatarFileInput.value = '';
                } else {
                    throw new Error('Falha na verificação do localStorage');
                }
            } catch (error) {
                console.error('❌ Erro ao salvar avatar:', error);
                this.showNotification('Erro ao salvar avatar. Tente novamente.', 'error');
            }
        };
        
        img.onerror = () => {
            this.showNotification('Erro ao processar a imagem', 'error');
        };
        
        const reader = new FileReader();
        reader.onload = (event) => {
            img.src = event.target.result;
        };
        reader.onerror = () => {
            this.showNotification('Erro ao ler o arquivo', 'error');
        };
        reader.readAsDataURL(file);
    }

    updateAllAvatarElements(avatarUrl) {
        const headerAvatar = document.getElementById('userAvatar');
        if (headerAvatar) {
            headerAvatar.src = avatarUrl;
            headerAvatar.classList.remove('fallback');
        }
        
        const profileAvatar = document.getElementById('profile-avatar');
        if (profileAvatar) {
            profileAvatar.src = avatarUrl;
        }
    }

    getUserAvatar(user) {
        if (!user) return this.generateAvatar('default');
        
        // Avatar personalizado tem prioridade
        const customAvatar = localStorage.getItem(`custom_avatar_${user.uid}`);
        if (customAvatar && customAvatar.startsWith('data:image/')) {
            return customAvatar;
        }
        
        // Avatar do Google
        if (user.photoURL && user.photoURL.startsWith('http') && !user.photoURL.includes('dicebear')) {
            return user.photoURL;
        }
        
        // Avatar gerado
        return this.generateAvatar(user.email);
    }

    updateUIForLoggedIn(user) {
        if (this.userSection) this.userSection.classList.add('logged-in');
        
        const username = user.displayName || user.email.split('@')[0];
        const userNameEl = document.getElementById('userName');
        if (userNameEl) {
            userNameEl.textContent = username;
            userNameEl.classList.add('gradient');
        }
        
        const avatarUrl = this.getUserAvatar(user);
        this.updateAllAvatarElements(avatarUrl);
        
        // Stats persistentes
        let userLevel = localStorage.getItem(`level_${user.uid}`) || Math.floor(Math.random() * 10) + 1;
        let userPoints = localStorage.getItem(`points_${user.uid}`) || Math.floor(Math.random() * 1000);
        
        if (!localStorage.getItem(`level_${user.uid}`)) {
            localStorage.setItem(`level_${user.uid}`, userLevel);
            localStorage.setItem(`points_${user.uid}`, userPoints);
        }
        
        const userLevelEl = document.getElementById('userLevel');
        if (userLevelEl) userLevelEl.textContent = `Nível ${userLevel} • ${userPoints} pts`;
        
        console.log(`UI atualizada para usuário: ${username}`);
    }

    updateUIForLoggedOut() {
        if (this.userSection) this.userSection.classList.remove('logged-in');
        
        const userNameEl = document.getElementById('userName');
        const userAvatarEl = document.getElementById('userAvatar');
        const userLevelEl = document.getElementById('userLevel');
        
        if (userNameEl) {
            userNameEl.textContent = 'Usuário';
            userNameEl.classList.remove('gradient');
        }
        if (userAvatarEl) {
            userAvatarEl.src = 'https://api.dicebear.com/7.x/avataaars/svg?seed=default&backgroundColor=e5e7eb';
            userAvatarEl.classList.remove('fallback');
        }
        if (userLevelEl) userLevelEl.textContent = 'Visitante';
        
        this.clearLoginErrors();
        
        console.log('UI atualizada para usuário deslogado');
    }

    updateProfileModal(user) {
        if (!user) return;

        const username = user.displayName || user.email.split('@')[0];
        const avatarUrl = this.getUserAvatar(user);
        
        const elements = {
            'profile-avatar': { src: avatarUrl },
            'profile-username': { textContent: username },
            'profile-email': { textContent: user.email }
        };
        
        Object.assign(element, elements[id]);
            }
        });

        // Data de criação da conta
        const creationDate = user.metadata.creationTime;
        const formattedDate = creationDate
            ? new Date(creationDate).toLocaleDateString('pt-BR', { year: 'numeric', month: 'long' })
            : 'Data não disponível';
        
        const memberSinceEl = document.getElementById('profile-member-since');
        if (memberSinceEl) memberSinceEl.textContent = formattedDate;

        // Estatísticas persistentes
        const userLevel = localStorage.getItem(`level_${user.uid}`) || 1;
        const userPoints = localStorage.getItem(`points_${user.uid}`) || 0;
        const userVisits = localStorage.getItem(`visits_${user.uid}`) || 1;

        const statsElements = {
            'profile-level': userLevel,
            'profile-points': userPoints,
            'profile-visits': userVisits
        };
        
        Object.keys(statsElements).forEach(id => {
            const element = document.getElementById(id);
            if (element) element.textContent = statsElements[id];
        });
        
        console.log(`Modal de perfil atualizado para ${username}`);
    }

    logout() {
        if (typeof firebase !== 'undefined') {
            firebase.auth().signOut()
                .then(() => {
                    this.updateUIForLoggedOut();
                    this.showNotification('👋 Até logo! Você foi desconectado com sucesso.', 'info');
                })
                .catch(error => {
                    this.showNotification('Erro ao fazer logout: ' + error.message, 'error');
                });
        }
    }

    generateAvatar(email) {
        const seed = email.split('@')[0];
        const styles = ['avataaars', 'micah', 'adventurer', 'big-smile'];
        const style = styles[Math.floor(Math.random() * styles.length)];
        const colors = ['b6e3f4', 'c0aede', 'ffb3ba', 'ffdfba', 'ffffba', 'baffc9'];
        const bgColor = colors[Math.floor(Math.random() * colors.length)];
        return `https://api.dicebear.com/7.x/${style}/svg?seed=${seed}&backgroundColor=${bgColor}`;
    }

    getInitials(name) {
        return name
            .split(' ')
            .map(word => word.charAt(0))
            .join('')
            .substring(0, 2)
            .toUpperCase();
    }
}

// Instanciar e tornar globalmente acessível
window.bigFootSite = new BigFootSite();

// Exemplo de como usar em um arquivo HTML:
/*
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>BIGFOOT Esports - JavaScript</title>
</head>
<body>
    <script src="bigfoot-site.js"></script>
</body>
</html>
*/keys(elements).forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                Object. hidden;
            text-overflow: ellipsis;
        }

        /* ===== 3. LAYOUT & COMPONENTS ===== */
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 var(--spacing-md);
        }

        .btn {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: var(--spacing-sm);
            font-family: var(--font-family);
            font-weight: var(--font-weight-semibold);
            text-decoration: none;
            border: none;
            cursor: pointer;
            transition: all var(--transition-normal);
            outline: none;
            position: relative;
            overflow: hidden;
        }

        .btn-primary {
            background: var(--primary-gradient);
            color: #ffffff;
            padding: 14px 28px;
            border-radius: var(--radius-full);
            box-shadow: var(--shadow-primary);
            font-size: 14px;
        }

        .btn-primary:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
        }

        .btn-primary:active {
            transform: translateY(0);
        }

        .btn-secondary {
            background: transparent;
            color: var(--primary-color);
            border: 2px solid var(--primary-color);
            padding: 8px 16px;
            border-radius: var(--radius-full);
            font-size: 14px;
        }

        .btn-secondary:hover {
            background: var(--primary-color);
            color: #ffffff;
            transform: translateY(-1px);
        }

        .btn-small {
            padding: 6px 12px;
            font-size: 12px;
            border-radius: var(--radius-full);
        }

        .btn-logout {
            background: #e53e3e;
            color: white;
            border: none;
            padding: 4px 8px;
            border-radius: var(--radius-sm);
            font-size: 10px;
            margin-left: 8px;
            transition: all var(--transition-fast);
        }

        .btn-logout:hover {
            background: #c53030;
            transform: scale(1.05);
        }

        .btn-google {
            background: #ffffff;
            color: var(--text-primary);
            border: 2px solid var(--border-color);
            padding: 14px 28px;
            border-radius: var(--radius-full);
            display: flex;
            align-items: center;
            gap: 10px;
            width: 100%;
            justify-content: center;
            font-size: 14px;
        }

        .btn-google:hover {
            background: var(--background-light);
            transform: translateY(-2px);
        }

        .btn-loading {
            opacity: 0.7;
            cursor: not-allowed;
            pointer-events: none;
        }

        .btn-loading::after {
            content: '';
            position: absolute;
            width: 16px;
            height: 16px;
            border: 2px solid rgba(255, 255, 255, 0.3);
            border-top-color: #ffffff;
            border-radius: 50%;
            animation: spin 1s linear infinite;
        }

        /* ===== 4. IMPROVED AVATAR SYSTEM ===== */
        .user-section {
            display: flex;
            align-items: center;
            gap: var(--spacing-sm);
            flex-shrink: 0;
        }

        .user-info {
            display: flex;
            align-items: center;
            gap: var(--spacing-md);
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(15px);
            border: 2px solid rgba(102, 126, 234, 0.1);
            border-radius: var(--radius-xl);
            padding: var(--spacing-sm) var(--spacing-lg);
            transition: all var(--transition-normal);
            max-width: 400px;
            box-shadow: 0 8px 32px rgba(102, 126, 234, 0.15);
            position: relative;
            overflow:
