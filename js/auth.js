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

// Elementos do DOM
const userSection = document.getElementById('user-section');
const userInfo = document.getElementById('userInfo');
const userAvatar = document.getElementById('userAvatar');
const userName = document.getElementById('userName');
const loginBtn = document.getElementById('login-btn');
const logoutBtn = document.getElementById('logout-btn');
const loginModal = document.getElementById('login-modal');
const closeModal = document.getElementById('close-modal');
const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');
const googleLoginBtn = document.getElementById('google-login');
const modalTabs = document.querySelectorAll('.modal-tab');
const tabContents = document.querySelectorAll('.tab-content');

// Verificar se todos os elementos do DOM existem
if (!userSection || !userInfo || !userAvatar || !userName || !loginBtn || !logoutBtn || !loginModal || !closeModal || !loginForm || !registerForm || !googleLoginBtn) {
    console.error("Erro: Um ou mais elementos do DOM não foram encontrados.");
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

// Monitorar estado de autenticação
auth.onAuthStateChanged(user => {
    console.log("onAuthStateChanged disparado:", user ? "Usuário logado" : "Usuário não logado");
    if (user) {
        // Usuário logado
        console.log("Usuário logado:", user.email);
        userSection.classList.remove('loading');
        userSection.classList.add('logged-in');
        userInfo.classList.add('logged-in');
        userName.textContent = user.displayName || user.email || "Usuário";
        userAvatar.src = user.photoURL || 'https://via.placeholder.com/32';
        loginBtn.style.display = 'none'; // Garante que o botão de login seja oculto
    } else {
        // Usuário não logado
        console.log("Usuário não logado");
        userSection.classList.remove('loading');
        userSection.classList.remove('logged-in');
        userInfo.classList.remove('logged-in');
        userName.textContent = '';
        userAvatar.src = '';
        loginBtn.style.display = 'block'; // Garante que o botão de login seja exibido
    }
});

// Login com email e senha
loginForm.addEventListener('submit', e => {
    e.preventDefault();
    clearErrors();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    loginBtn.classList.add('btn-loading');
    
    auth.signInWithEmailAndPassword(email, password)
        .then(() => {
            console.log("Login bem-sucedido");
            loginModal.style.display = 'none';
            loginForm.reset();
            loginBtn.classList.remove('btn-loading');
        })
        .catch(error => {
            loginBtn.classList.remove('btn-loading');
            console.error("Erro no login:", error.code, error.message);
            if (error.code === 'auth/user-not-found') {
                showError('login-email-error', 'Usuário não encontrado.');
            } else if (error.code === 'auth/wrong-password') {
                showError('login-password-error', 'Senha incorreta.');
            } else {
                showError('login-password-error', 'Erro ao fazer login: ' + error.message);
            }
        });
});

// Registro com email e senha
registerForm.addEventListener('submit', e => {
    e.preventDefault();
    clearErrors();
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    
    auth.createUserWithEmailAndPassword(email, password)
        .then(() => {
            console.log("Registro bem-sucedido");
            loginModal.style.display = 'none';
            registerForm.reset();
        })
        .catch(error => {
            console.error("Erro no registro:", error.code, error.message);
            if (error.code === 'auth/email-already-in-use') {
                showError('register-email-error', 'Email já está em uso.');
            } else if (error.code === 'auth/weak-password') {
                showError('register-password-error', 'A senha deve ter pelo menos 6 caracteres.');
            } else {
                showError('register-password-error', 'Erro ao registrar: ' + error.message);
            }
        });
});

// Login com Google
googleLoginBtn.addEventListener('click', () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider)
        .then(() => {
            console.log("Login com Google bem-sucedido");
            loginModal.style.display = 'none';
        })
        .catch(error => {
            console.error("Erro no login com Google:", error.code, error.message);
            showError('login-password-error', 'Erro ao fazer login com Google: ' + error.message);
        });
});

// Logout
logoutBtn.addEventListener('click', () => {
    auth.signOut()
        .then(() => {
            console.log("Logout bem-sucedido");
        })
        .catch(error => {
            console.error("Erro ao fazer logout:", error.message);
            alert('Erro ao fazer logout: ' + error.message);
        });
});

// Abrir/fechar modal
loginBtn.addEventListener('click', () => {
    loginModal.style.display = 'block';
    console.log("Modal de login aberto");
});

closeModal.addEventListener('click', () => {
    loginModal.style.display = 'none';
    clearErrors();
    loginForm.reset();
    registerForm.reset();
    console.log("Modal de login fechado");
});

window.addEventListener('click', e => {
    if (e.target === loginModal) {
        loginModal.style.display = 'none';
        clearErrors();
        loginForm.reset();
        registerForm.reset();
        console.log("Modal de login fechado clicando fora");
    }
});
