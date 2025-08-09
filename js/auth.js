// Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAV8x3oA2D3UO5niAmwo88U9Of3hj7VNaQ",
  authDomain: "bigfoot-esports.firebaseapp.com",
  projectId: "bigfoot-esports",
  storageBucket: "bigfoot-esports.firebasestorage.app",
  messagingSenderId: "868767435883",
  appId: "1:868767435883:web:f90f8d3d5bfd66e933752e",
  measurementId: "G-S26ZFJRD3M"
};

// Inicializar Firebase
try {
    firebase.initializeApp(firebaseConfig);
    console.log("Firebase inicializado com sucesso");
} catch (error) {
    console.error("Erro ao inicializar Firebase:", error);
}

const auth = firebase.auth();
const db = firebase.firestore();

// ===== SISTEMA DE AUTENTICAÇÃO GLOBAL =====
class BigFootAuth {
    constructor() {
        this.currentUser = null;
        this.isInitialized = false;
        this.listeners = [];
        this.initPromise = new Promise((resolve) => {
            this.initResolve = resolve;
        });
        
        // Inicializa o listener de autenticação
        this.init();
    }

    init() {
        // Monitorar estado de autenticação
        auth.onAuthStateChanged(user => {
            console.log("onAuthStateChanged disparado:", user ? "Usuário logado" : "Usuário não logado");
            
            this.currentUser = user;
            
            if (!this.isInitialized) {
                this.isInitialized = true;
                this.initResolve();
                console.log("Sistema de autenticação inicializado");
            }
            
            // Atualizar UI principal
            this.updateMainUI(user);
            
            // Notificar todos os listeners
            this.notifyListeners(user);
        });
    }

    // Aguarda a inicialização do Firebase Auth
    async waitForInit() {
        return this.initPromise;
    }

    // Verifica se o usuário está logado (sincrono)
    isLoggedIn() {
        return this.currentUser !== null;
    }

    // Verifica se o usuário está logado (aguarda inicialização)
    async isLoggedInAsync() {
        await this.waitForInit();
        return this.isLoggedIn();
    }

    // Obtém o usuário atual
    getCurrentUser() {
        return this.currentUser;
    }

    // Obtém o usuário atual (aguarda inicialização)
    async getCurrentUserAsync() {
        await this.waitForInit();
        return this.getCurrentUser();
    }

    // Adiciona listener para mudanças de autenticação
    addAuthListener(callback) {
        this.listeners.push(callback);
        
        // Se já inicializado, chama imediatamente
        if (this.isInitialized) {
            callback(this.currentUser);
        }
        
        // Retorna função para remover o listener
        return () => {
            this.listeners = this.listeners.filter(l => l !== callback);
        };
    }

    // Notifica todos os listeners
    notifyListeners(user) {
        this.listeners.forEach(callback => {
            try {
                callback(user);
            } catch (error) {
                console.error("Erro no listener de autenticação:", error);
            }
        });
    }

    // Atualiza a UI principal (navbar)
    updateMainUI(user) {
        const userSection = document.getElementById('user-section');
        const userInfo = document.getElementById('userInfo');
        const userAvatar = document.getElementById('userAvatar');
        const userName = document.getElementById('userName');
        const loginBtn = document.getElementById('login-btn');
        
        if (!userSection || !userInfo || !userAvatar || !userName || !loginBtn) {
            console.warn("Elementos da UI principal não encontrados");
            return;
        }

        if (user) {
            // Usuário logado
            console.log("Atualizando UI - Usuário logado:", user.email);
            userSection.classList.remove('loading');
            userSection.classList.add('logged-in');
            userInfo.classList.add('logged-in');
            userName.textContent = user.displayName || user.email || "Usuário";
            userAvatar.src = user.photoURL || 'https://via.placeholder.com/32';
            loginBtn.style.display = 'none';
        } else {
            // Usuário não logado
            console.log("Atualizando UI - Usuário não logado");
            userSection.classList.remove('loading');
            userSection.classList.remove('logged-in');
            userInfo.classList.remove('logged-in');
            userName.textContent = '';
            userAvatar.src = '';
            loginBtn.style.display = 'block';
        }
    }

    // Login com email e senha
    async loginWithEmail(email, password) {
        try {
            await auth.signInWithEmailAndPassword(email, password);
            return { success: true };
        } catch (error) {
            console.error("Erro no login:", error);
            return { success: false, error };
        }
    }

    // Registro com email e senha
    async registerWithEmail(email, password) {
        try {
            await auth.createUserWithEmailAndPassword(email, password);
            return { success: true };
        } catch (error) {
            console.error("Erro no registro:", error);
            return { success: false, error };
        }
    }

    // Login com Google
    async loginWithGoogle() {
        try {
            const provider = new firebase.auth.GoogleAuthProvider();
            await auth.signInWithPopup(provider);
            return { success: true };
        } catch (error) {
            console.error("Erro no login com Google:", error);
            return { success: false, error };
        }
    }

    // Logout
    async logout() {
        try {
            await auth.signOut();
            return { success: true };
        } catch (error) {
            console.error("Erro ao fazer logout:", error);
            return { success: false, error };
        }
    }
}

// Instância global do sistema de autenticação
const bigFootAuth = new BigFootAuth();

// Disponibiliza globalmente para outras páginas
window.bigFootAuth = bigFootAuth;

// ===== UI DE LOGIN/LOGOUT =====
document.addEventListener('DOMContentLoaded', () => {
    // Elementos do DOM
    const loginModal = document.getElementById('login-modal');
    const closeModal = document.getElementById('close-modal');
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const googleLoginBtn = document.getElementById('google-login');
    const modalTabs = document.querySelectorAll('.modal-tab');
    const tabContents = document.querySelectorAll('.tab-content');
    const loginBtn = document.getElementById('login-btn');
    const logoutBtn = document.getElementById('logout-btn');

    // Verificar se todos os elementos existem
    if (!loginModal || !closeModal || !loginForm || !registerForm || !googleLoginBtn) {
        console.error("Erro: Um ou mais elementos do modal não foram encontrados.");
        return;
    }

    // Função para alternar abas
    modalTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            modalTabs.forEach(t => t.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            tab.classList.add('active');
            document.getElementById(`${tab.dataset.tab}-tab`).classList.add('active');
            console.log(`Aba ${tab.dataset.tab} ativada`);
        });
    });

    // Função para limpar mensagens de erro
    function clearErrors() {
        document.querySelectorAll('.error-text').forEach(error => {
            error.style.display = 'none';
            error.textContent = '';
        });
    }

    // Função para mostrar erro
    function showError(elementId, message) {
        const errorElement = document.getElementById(elementId);
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.style.display = 'block';
        } else {
            console.error(`Elemento de erro ${elementId} não encontrado`);
        }
    }

    // Login com email e senha
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        clearErrors();
        
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;
        const submitBtn = loginForm.querySelector('button[type="submit"]');
        
        if (submitBtn) submitBtn.classList.add('btn-loading');
        
        const result = await bigFootAuth.loginWithEmail(email, password);
        
        if (submitBtn) submitBtn.classList.remove('btn-loading');
        
        if (result.success) {
            console.log("Login bem-sucedido");
            loginModal.style.display = 'none';
            loginForm.reset();
        } else {
            const error = result.error;
            if (error.code === 'auth/user-not-found') {
                showError('login-email-error', 'Usuário não encontrado.');
            } else if (error.code === 'auth/wrong-password') {
                showError('login-password-error', 'Senha incorreta.');
            } else {
                showError('login-password-error', 'Erro ao fazer login: ' + error.message);
            }
        }
    });

    // Registro com email e senha
    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        clearErrors();
        
        const email = document.getElementById('register-email').value;
        const password = document.getElementById('register-password').value;
        
        const result = await bigFootAuth.registerWithEmail(email, password);
        
        if (result.success) {
            console.log("Registro bem-sucedido");
            loginModal.style.display = 'none';
            registerForm.reset();
        } else {
            const error = result.error;
            if (error.code === 'auth/email-already-in-use') {
                showError('register-email-error', 'Email já está em uso.');
            } else if (error.code === 'auth/weak-password') {
                showError('register-password-error', 'A senha deve ter pelo menos 6 caracteres.');
            } else {
                showError('register-password-error', 'Erro ao registrar: ' + error.message);
            }
        }
    });

    // Login com Google
    if (googleLoginBtn) {
        googleLoginBtn.addEventListener('click', async () => {
            const result = await bigFootAuth.loginWithGoogle();
            
            if (result.success) {
                console.log("Login com Google bem-sucedido");
                loginModal.style.display = 'none';
            } else {
                showError('login-password-error', 'Erro ao fazer login com Google: ' + result.error.message);
            }
        });
    }

    // Logout
    if (logoutBtn) {
        logoutBtn.addEventListener('click', async () => {
            const result = await bigFootAuth.logout();
            
            if (!result.success) {
                alert('Erro ao fazer logout: ' + result.error.message);
            }
        });
    }

    // Abrir/fechar modal
    if (loginBtn) {
        loginBtn.addEventListener('click', () => {
            loginModal.style.display = 'block';
            console.log("Modal de login aberto");
        });
    }

    if (closeModal) {
        closeModal.addEventListener('click', () => {
            loginModal.style.display = 'none';
            clearErrors();
            loginForm.reset();
            registerForm.reset();
            console.log("Modal de login fechado");
        });
    }

    window.addEventListener('click', e => {
        if (e.target === loginModal) {
            loginModal.style.display = 'none';
            clearErrors();
            loginForm.reset();
            registerForm.reset();
            console.log("Modal de login fechado clicando fora");
        }
    });
});

// ===== FUNÇÕES UTILITÁRIAS GLOBAIS =====

// Função para verificar autenticação (compatibilidade)
window.isUserLoggedIn = async () => {
    return await bigFootAuth.isLoggedInAsync();
};

// Função para obter usuário atual (compatibilidade)
window.getCurrentUser = async () => {
    return await bigFootAuth.getCurrentUserAsync();
};

// Função para aguardar carregamento da autenticação
window.waitForAuth = () => {
    return bigFootAuth.waitForInit();
};

// Middleware para páginas que precisam de autenticação
window.requireAuth = (callback) => {
    return async function() {
        const isLoggedIn = await bigFootAuth.isLoggedInAsync();
        if (isLoggedIn) {
            callback.apply(this, arguments);
        } else {
            console.log("Usuário não autenticado, redirecionando...");
            // Aqui você pode mostrar uma mensagem ou redirecionar
            showLoginRequired();
        }
    };
};

function showLoginRequired() {
    const container = document.getElementById('main-content') || document.body;
    const loginRequiredHTML = `
        <div class="login-required-overlay" style="
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.8);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 9999;
        ">
            <div style="
                background: white;
                padding: 2rem;
                border-radius: 8px;
                text-align: center;
                max-width: 400px;
                width: 90%;
            ">
                <h3>Login Necessário</h3>
                <p>Você precisa estar logado para acessar esta seção.</p>
                <button onclick="document.getElementById('login-btn').click(); document.querySelector('.login-required-overlay').remove();" 
                        style="
                            background: #007bff;
                            color: white;
                            padding: 0.5rem 1rem;
                            border: none;
                            border-radius: 4px;
                            cursor: pointer;
                        ">
                    Fazer Login
                </button>
                <button onclick="document.querySelector('.login-required-overlay').remove();" 
                        style="
                            background: #6c757d;
                            color: white;
                            padding: 0.5rem 1rem;
                            border: none;
                            border-radius: 4px;
                            cursor: pointer;
                            margin-left: 0.5rem;
                        ">
                    Fechar
                </button>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', loginRequiredHTML);
}

console.log("Sistema de autenticação BigFoot carregado");
