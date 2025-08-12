// ===== CONFIGURAÇÃO E INICIALIZAÇÃO DO FIREBASE =====
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, signOut, setPersistence, browserLocalPersistence } from "firebase/auth";
import { getFirestore, collection, doc, getDoc, setDoc } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAV8x3oA2D3UO5niAmwo88U9Of3hj7VNaQ",
    authDomain: "bigfoot-esports.firebaseapp.com",
    projectId: "bigfoot-esports",
    storageBucket: "bigfoot-esports.firebasestorage.app", // Corrigido
    messagingSenderId: "868767435883",
    appId: "1:868767435883:web:f90f8d3d5bfd66e933752e",
    measurementId: "G-S26ZFJRD3M"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Configura persistência de autenticação
setPersistence(auth, browserLocalPersistence)
    .then(() => console.log("✅ Persistência configurada para local"))
    .catch(error => console.error("❌ Erro ao configurar persistência:", error.code, error.message));

console.log("✅ Firebase inicializado com sucesso");
console.log("📂 auth.js carregado");

// ===== SISTEMA DE AUTENTICAÇÃO GLOBAL =====
class BigFootAuth {
    constructor() {
        this.currentUser = null;
        this.points = 0;
        this.articlesRead = 0;
        this.totalReadingTime = 0;
        this.readArticles = [];
        this.isInitialized = false;
        this.listeners = [];
        this.initPromise = new Promise((resolve) => {
            this.initResolve = resolve;
        });

        this.init();
    }

    init() {
        onAuthStateChanged(auth, async (user) => {
            console.log("🔄 onAuthStateChanged:", user ? `Usuário logado: ${user.email}` : "Usuário não logado", { uid: user ? user.uid : null });
            this.currentUser = user;

            if (user) {
                try {
                    console.log('📡 Buscando dados do usuário no Firestore:', user.uid);
                    const docRef = doc(db, 'users', user.uid);
                    const docSnap = await getDoc(docRef);
                    console.log('📁 Resposta do Firestore:', { exists: docSnap.exists(), data: docSnap.data() });
                    if (docSnap.exists()) {
                        this.points = docSnap.data().points || 0;
                        this.articlesRead = docSnap.data().articlesRead || 0;
                        this.totalReadingTime = docSnap.data().totalReadingTime || 0;
                        this.readArticles = docSnap.data().readArticles || [];
                    } else {
                        console.log('🆕 Criando novo documento para usuário:', user.uid);
                        await setDoc(docRef, {
                            points: 0,
                            articlesRead: 0,
                            totalReadingTime: 0,
                            readArticles: []
                        });
                    }
                    this.notifyListeners(user);
                    this.updateRewardsUI();
                    this.updateStatsUI();
                } catch (error) {
                    console.error('❌ Erro ao acessar Firestore:', error.code, error.message);
                    this.notifyListeners(user);
                }
            } else {
                this.resetUserData();
                this.notifyListeners(user);
                this.updateRewardsUI();
                this.updateStatsUI();
            }

            if (!this.isInitialized) {
                this.isInitialized = true;
                this.initResolve();
                console.log("✅ Sistema de autenticação inicializado");
            }

            this.updateMainUI(user);
        });
    }

    resetUserData() {
        this.points = 0;
        this.articlesRead = 0;
        this.totalReadingTime = 0;
        this.readArticles = [];
    }

    async waitForInit() {
        return this.initPromise;
    }

    isLoggedIn() {
        return this.currentUser !== null;
    }

    async isLoggedInAsync() {
        await this.waitForInit();
        return this.isLoggedIn();
    }

    getCurrentUser() {
        return this.currentUser;
    }

    async getCurrentUserAsync() {
        await this.waitForInit();
        return this.getCurrentUser();
    }

    addAuthListener(callback) {
        this.listeners.push(callback);
        if (this.isInitialized) {
            callback(this.currentUser);
        }
        return () => {
            this.listeners = this.listeners.filter(l => l !== callback);
        };
    }

    notifyListeners(user) {
        this.listeners.forEach(callback => {
            try {
                callback(user);
            } catch (error) {
                console.error("❌ Erro no listener de autenticação:", error.code, error.message);
            }
        });
    }

    updateMainUI(user) {
        const userSection = document.getElementById('user-section');
        const userInfo = document.getElementById('userInfo');
        const userAvatar = document.getElementById('userAvatar');
        const userName = document.getElementById('userName');
        const loginBtn = document.getElementById('login-btn');
        const loginRequired = document.getElementById('loginRequired');
        const newsContainer = document.getElementById('news-container');

        if (!userSection || !userInfo || !userAvatar || !userName || !loginBtn || !loginRequired || !newsContainer) {
            console.warn("⚠️ Elementos da UI principal não encontrados:", {
                userSection: !!userSection,
                userInfo: !!userInfo,
                userAvatar: !!userAvatar,
                userName: !!userName,
                loginBtn: !!loginBtn,
                loginRequired: !!loginRequired,
                newsContainer: !!newsContainer
            });
            return;
        }

        if (user) {
            userSection.classList.remove('loading');
            userSection.classList.add('logged-in');
            userInfo.classList.add('logged-in');
            userName.textContent = user.displayName || user.email.split('@')[0] || "Usuário";
            userAvatar.src = user.photoURL || 'https://raw.githubusercontent.com/fabricioricard/BIGFOOT-Esports-Site/main/images/default-avatar.png';
            loginBtn.style.display = 'none';
            loginRequired.classList.add('hidden');
            newsContainer.classList.remove('hidden');
        } else {
            userSection.classList.remove('loading', 'logged-in');
            userInfo.classList.remove('logged-in');
            userName.textContent = '';
            userAvatar.src = 'https://raw.githubusercontent.com/fabricioricard/BIGFOOT-Esports-Site/main/images/default-avatar.png';
            loginBtn.style.display = 'inline-flex';
            loginRequired.classList.remove('hidden');
            newsContainer.classList.add('hidden');
        }
    }

    updateRewardsUI() {
        const rewardsPanel = document.getElementById('rewardsPanel');
        const pointsDisplay = document.getElementById('points');
        const heroUserPoints = document.getElementById('heroUserPoints');

        if (rewardsPanel && pointsDisplay && heroUserPoints) {
            if (this.currentUser) {
                rewardsPanel.classList.add('logged-in');
                pointsDisplay.textContent = this.points;
                heroUserPoints.textContent = this.points;
            } else {
                rewardsPanel.classList.remove('logged-in');
                pointsDisplay.textContent = '0';
                heroUserPoints.textContent = '0';
            }
        }
    }

    updateStatsUI() {
        const statsPanel = document.getElementById('statsPanel');
        const totalPoints = document.getElementById('totalPoints');
        const articlesRead = document.getElementById('articlesRead');
        const readingTime = document.getElementById('readingTime');

        if (statsPanel && totalPoints && articlesRead && readingTime) {
            if (this.currentUser) {
                statsPanel.classList.add('logged-in');
                totalPoints.textContent = this.points;
                articlesRead.textContent = this.articlesRead;
                readingTime.textContent = Math.round(this.totalReadingTime / 60);
            } else {
                statsPanel.classList.remove('logged-in');
                totalPoints.textContent = '0';
                articlesRead.textContent = '0';
                readingTime.textContent = '0';
            }
        }
    }

    async updateUserData(data) {
        if (!this.currentUser) {
            console.warn("⚠️ Nenhum usuário logado para atualizar dados");
            return;
        }
        try {
            const docRef = doc(db, 'users', this.currentUser.uid);
            await setDoc(docRef, data, { merge: true });
            this.points = data.points || this.points;
            this.articlesRead = data.articlesRead || this.articlesRead;
            this.totalReadingTime = data.totalReadingTime || this.totalReadingTime;
            this.readArticles = data.readArticles || this.readArticles;
            this.updateRewardsUI();
            this.updateStatsUI();
            console.log("✅ Dados do usuário atualizados com sucesso");
        } catch (error) {
            console.error("❌ Erro ao atualizar dados do usuário:", error.code, error.message);
        }
    }

    async loginWithEmail(email, password) {
        try {
            const result = await signInWithEmailAndPassword(auth, email, password);
            console.log("✅ Login com email bem-sucedido:", result.user.email);
            return { success: true, user: result.user };
        } catch (error) {
            console.error("❌ Erro no login com email:", error.code, error.message);
            return { success: false, error };
        }
    }

    async registerWithEmail(email, password) {
        try {
            const result = await createUserWithEmailAndPassword(auth, email, password);
            console.log("✅ Registro com email bem-sucedido:", result.user.email);
            return { success: true, user: result.user };
        } catch (error) {
            console.error("❌ Erro no registro com email:", error.code, error.message);
            return { success: false, error };
        }
    }

    async loginWithGoogle() {
        try {
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);
            console.log("✅ Login com Google bem-sucedido:", result.user.email);
            return { success: true, user: result.user };
        } catch (error) {
            console.error("❌ Erro no login com Google:", error.code, error.message);
            return { success: false, error };
        }
    }

    async logout() {
        try {
            await signOut(auth);
            console.log("✅ Logout bem-sucedido");
            return { success: true };
        } catch (error) {
            console.error("❌ Erro ao fazer logout:", error.code, error.message);
            return { success: false, error };
        }
    }
}

// Instância global
const bigFootAuth = new BigFootAuth();
window.bigFootAuth = bigFootAuth;

// Funções globais
window.isUserLoggedIn = async () => bigFootAuth.isLoggedInAsync();
window.getCurrentUser = async () => bigFootAuth.getCurrentUserAsync();
window.waitForAuth = () => bigFootAuth.waitForInit();
window.requireAuth = (callback) => {
    return async function () {
        const isLoggedIn = await bigFootAuth.isLoggedInAsync();
        if (isLoggedIn) {
            callback.apply(this, arguments);
        } else {
            console.log("⚠️ Usuário não autenticado");
            showLoginRequired();
        }
    };
};

function showLoginRequired() {
    const loginRequired = document.getElementById('loginRequired');
    if (loginRequired) {
        loginRequired.classList.remove('hidden');
    }
}

console.log("✅ Sistema de autenticação BigFoot carregado");
