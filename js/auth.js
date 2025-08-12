console.log("auth.js carregado");

// Configuração do Firebase (substitua pelos seus dados)
const firebaseConfig = {
  apiKey: "AIzaSyAV8x3oA2D3UO5niAmwo88U9Of3hj7VNaQ",
  authDomain: "bigfoot-esports.firebaseapp.com",
  projectId: "bigfoot-esports",
  storageBucket: "bigfoot-esports.appspot.com",
  messagingSenderId: "868767435883",
  appId: "1:868767435883:web:f90f8d3d5bfd66e933752e",
  measurementId: "G-S26ZFJRD3M"
};

// Inicializa Firebase se ainda não inicializado
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
  console.log("Firebase inicializado com sucesso");
} else {
  console.log("Firebase já estava inicializado");
}

// Referências para Auth e Firestore
const auth = firebase.auth();
const db = firebase.firestore();

// Classe simples para autenticação
class BigFootAuth {
  constructor() {
    this.currentUser = null;
    this.listeners = [];
    this.isInitialized = false;
    this.initPromise = new Promise(resolve => {
      this.initResolve = resolve;
    });
    this.init();
  }

  init() {
    auth.onAuthStateChanged(user => {
      console.log("onAuthStateChanged:", user ? `Usuário logado: ${user.email}` : "Nenhum usuário logado");
      this.currentUser = user;

      this.listeners.forEach(cb => {
        try { cb(user); } catch(e) { console.error("Erro listener auth:", e); }
      });

      if (!this.isInitialized) {
        this.isInitialized = true;
        this.initResolve();
      }
    });
  }

  waitForInit() {
    return this.initPromise;
  }

  isLoggedIn() {
    return this.currentUser !== null;
  }

  isLoggedInAsync() {
    return this.waitForInit().then(() => this.isLoggedIn());
  }

  getCurrentUser() {
    return this.currentUser;
  }

  getCurrentUserAsync() {
    return this.waitForInit().then(() => this.getCurrentUser());
  }

  addAuthListener(callback) {
    this.listeners.push(callback);
    if (this.isInitialized) callback(this.currentUser);
    return () => {
      this.listeners = this.listeners.filter(l => l !== callback);
    };
  }

  async loginWithEmail(email, password) {
    try {
      const result = await auth.signInWithEmailAndPassword(email, password);
      console.log("Login com email bem-sucedido:", result.user.email);
      return { success: true };
    } catch (error) {
      console.error("Erro login email:", error);
      return { success: false, error };
    }
  }

  async registerWithEmail(email, password) {
    try {
      const result = await auth.createUserWithEmailAndPassword(email, password);
      console.log("Registro com email bem-sucedido:", result.user.email);
      return { success: true };
    } catch (error) {
      console.error("Erro registro email:", error);
      return { success: false, error };
    }
  }

  async loginWithGoogle() {
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      const result = await auth.signInWithPopup(provider);
      console.log("Login com Google bem-sucedido:", result.user.email);
      return { success: true };
    } catch (error) {
      console.error("Erro login Google:", error);
      return { success: false, error };
    }
  }

  async logout() {
    try {
      await auth.signOut();
      console.log("Logout bem-sucedido");
      return { success: true };
    } catch (error) {
      console.error("Erro logout:", error);
      return { success: false, error };
    }
  }
}

// Instância global
const bigFootAuth = new BigFootAuth();
window.bigFootAuth = bigFootAuth;

console.log("BigFootAuth inicializado e disponível em window.bigFootAuth");
