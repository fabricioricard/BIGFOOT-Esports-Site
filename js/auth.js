console.log("auth.js carregado");

const firebaseConfig = {
    apiKey: "AIzaSyAV8x3oA2D3UO5niAmwo88U9Of3hj7VNaQ",
    authDomain: "bigfoot-esports.firebaseapp.com",
    projectId: "bigfoot-esports",
    storageBucket: "bigfoot-esports.appspot.com",
    messagingSenderId: "868767435883",
    appId: "1:868767435883:web:f90f8d3d5bfd66e933752e",
    measurementId: "G-S26ZFJRD3M"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
    console.log("Firebase inicializado");
}

console.log("window.firebase.auth():", firebase.auth());
