// Configuração do Snowstorm
snowStorm.targetElement = document.querySelector('.hero-section');
snowStorm.snowColor = '#fff';
snowStorm.flakesMaxActive = 50;
snowStorm.useTwinkleEffect = true;

// Botão para desativar Snowstorm
const toggleSnowBtn = document.createElement('button');
toggleSnowBtn.className = 'btn-secondary';
toggleSnowBtn.textContent = 'Desativar Neve';
toggleSnowBtn.style.position = 'absolute';
toggleSnowBtn.style.top = '10px';
toggleSnowBtn.style.right = '10px';
document.querySelector('.hero-section').appendChild(toggleSnowBtn);

toggleSnowBtn.addEventListener('click', () => {
    if (snowStorm.active) {
        snowStorm.stop();
        toggleSnowBtn.textContent = 'Ativar Neve';
    } else {
        snowStorm.start();
        toggleSnowBtn.textContent = 'Desativar Neve';
    }
});

// Função para copiar a chave PIX
function copyPixKey() {
    const key = document.getElementById('pix-key').textContent;
    navigator.clipboard.writeText(key).then(() => {
        alert('Chave PIX copiada!');
    }).catch(() => {
        alert('Erro ao copiar a chave PIX.');
    });
}

// Menu Hambúrguer
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');
menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Modal de Login
const loginBtn = document.getElementById('login-btn');
const loginModal = document.getElementById('login-modal');
const closeModal = document.getElementById('close-modal');

loginBtn.addEventListener('click', () => {
    loginModal.classList.add('active');
});

closeModal.addEventListener('click', () => {
    loginModal.classList.remove('active');
});

window.addEventListener('click', (e) => {
    if (e.target === loginModal) {
        loginModal.classList.remove('active');
    }
});

document.getElementById('login-form').addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Login enviado (exemplo)');
    loginModal.classList.remove('active');
});

// Modal de Doação
const donationToggle = document.querySelector('.donation-toggle');
const donationSection = document.getElementById('donation-section');
const closeDonation = document.getElementById('close-donation');

donationToggle.addEventListener('click', () => {
    donationSection.classList.add('active');
});

closeDonation.addEventListener('click', () => {
    donationSection.classList.remove('active');
});

donationSection.addEventListener('click', (e) => {
    if (e.target === donationSection) {
        donationSection.classList.remove('active');
    }
});

// Carrossel de Eventos
const eventsCarousel = document.querySelector('.events-carousel');
const events = document.querySelectorAll('.events-content');
let currentEvent = 0;

document.getElementById('next-event').addEventListener('click', () => {
    currentEvent = (currentEvent + 1) % events.length;
    eventsCarousel.style.transform = `translateX(-${currentEvent * 100}%)`;
});

document.getElementById('prev-event').addEventListener('click', () => {
    currentEvent = (currentEvent - 1 + events.length) % events.length;
    eventsCarousel.style.transform = `translateX(-${currentEvent * 100}%)`;
});

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

// Formulário de Contato
document.getElementById('contact-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email-contato').value;
    if (!email.includes('@')) {
        alert('Por favor, insira um email válido.');
        return;
    }
    alert('Mensagem enviada!');
});

// Formulário de Newsletter
document.getElementById('newsletter-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email-newsletter').value;
    if (!email.includes('@')) {
        alert('Por favor, insira um email válido.');
        return;
    }
    alert('Inscrito na newsletter!');
});
