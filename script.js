// Modal de Login
const loginBtn = document.getElementById('login-btn');
const loginModal = document.getElementById('login-modal');
const closeModal = document.getElementById('close-modal');

loginBtn.addEventListener('click', () => {
    loginModal.style.display = 'block';
});

closeModal.addEventListener('click', () => {
    loginModal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === loginModal) {
        loginModal.style.display = 'none';
    }
});

document.getElementById('login-form').addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Login realizado com sucesso! (Funcionalidade de exemplo)');
    loginModal.style.display = 'none';
});

// Fechar a Caixa de Doação
const closeDonation = document.getElementById('close-donation');
const donationBox = document.getElementById('donation-box');

closeDonation.addEventListener('click', () => {
    donationBox.style.display = 'none';
});

// Roloagem Suave para os Links do Menu
document.querySelectorAll('.nav-menu a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Scroll Reveal
const revealElements = document.querySelectorAll('.reveal');
const revealOnScroll = () => {
    revealElements.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const revealPoint = 100;

        if (elementTop < windowHeight - revealPoint) {
            element.classList.add('fade-in');
        }
    });
};

window.addEventListener('scroll', revealOnScroll);

// Botão Voltar ao Topo
const backToTopBtn = document.getElementById('back-to-top');
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTopBtn.style.display = 'block';
    } else {
        backToTopBtn.style.display = 'none';
    }
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Formulários
document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Formulário enviado com sucesso!');
    });
});
