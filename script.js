// Configuração do Snowstorm
snowStorm.targetElement = document.querySelector('.hero-section');
snowStorm.snowColor = '#fff';
snowStorm.flakesMaxActive = 50; // Reduzido para melhor desempenho
snowStorm.useTwinkleEffect = true;
snowStorm.animationInterval = 50; // Menos atualizações por segundo
snowStorm.snowCharacter = '❄';
snowStorm.vMaxY = 5;
snowStorm.vMaxX = 2;

// Desativa Snowstorm em dispositivos móveis
if (/Mobi|Android/i.test(navigator.userAgent)) {
    snowStorm.stop();
}

// Botão para ativar/desativar Snowstorm
const toggleSnowBtn = document.createElement('button');
toggleSnowBtn.className = 'btn-secondary';
toggleSnowBtn.textContent = 'Desativar Neve';
toggleSnowBtn.style.position = 'absolute';
toggleSnowBtn.style.top = '20px';
toggleSnowBtn.style.right = '20px';
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
        alert('Chave PIX copiada com sucesso!');
    }).catch(() => {
        alert('Erro ao copiar a chave PIX. Tente novamente.');
    });
}

// Função debounce para otimizar eventos de scroll
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

// Menu Hambúrguer
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');
menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    menuToggle.setAttribute('aria-expanded', navMenu.classList.contains('active'));
});

// Modal de Login
const loginBtn = document.getElementById('login-btn');
const loginModal = document.getElementById('login-modal');
const closeModal = document.getElementById('close-modal');

loginBtn.addEventListener('click', () => {
    loginModal.style.display = 'block';
    document.getElementById('username').focus();
});

closeModal.addEventListener('click', () => {
    loginModal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === loginModal) {
        loginModal.style.display = 'none';
    }
});

// Validação do formulário de login
document.getElementById('login-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    if (username.length < 3 || password.length < 6) {
        alert('O usuário deve ter pelo menos 3 caracteres e a senha pelo menos 6 caracteres.');
        return;
    }
    alert('Login realizado com sucesso! (Funcionalidade de exemplo)');
    loginModal.style.display = 'none';
});

// Modal de Doação
const donationToggle = document.querySelector('.donation-toggle');
const donationSection = document.querySelector('.donation-section');
const closeDonation = document.getElementById('close-donation');

donationToggle.addEventListener('click', () => {
    donationSection.classList.add('active');
    closeDonation.focus();
});

closeDonation.addEventListener('click', () => {
    donationSection.classList.remove('active');
});

donationSection.addEventListener('click', (e) => {
    if (e.target === donationSection) {
        donationSection.classList.remove('active');
    }
});

// Roloagem Suave para Links com #
const menuLinks = document.querySelectorAll('.nav-menu a');
menuLinks.forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href.startsWith('#')) {
            e.preventDefault();
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
});

// Efeito de Digitação na Hero Section
const typewriterText = document.querySelector('.typewriter');
const text = typewriterText.textContent;
typewriterText.textContent = '';
let i = 0;
let isTyping = false;

function typeWriter() {
    if (isTyping) return;
    isTyping = true;
    if (i < text.length) {
        typewriterText.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 100);
    } else {
        isTyping = false;
    }
}
setTimeout(typeWriter, 500);

// Animação de Contagem para Estatísticas
const statsNumbers = document.querySelectorAll('.stat-number');
const statsSection = document.querySelector('.stats-section');

const animateStats = () => {
    statsNumbers.forEach(number => {
        const target = +number.getAttribute('data-target');
        let count = 0;
        const duration = 2000; // 2 segundos
        const startTime = performance.now();

        const updateCount = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            count = progress * target;
            number.textContent = Math.ceil(count);
            if (progress < 1) {
                requestAnimationFrame(updateCount);
            } else {
                number.textContent = target;
            }
        };
        requestAnimationFrame(updateCount);
    });
};

const statsObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
        animateStats();
        statsObserver.disconnect();
    }
}, { threshold: 0.5 });

statsObserver.observe(statsSection);

// Carrossel de Eventos
const eventsCarousel = document.querySelector('.events-carousel');
const events = document.querySelectorAll('.events-content');
let currentEvent = 0;

document.getElementById('next-event').addEventListener('click', () => {
    currentEvent = (currentEvent + 1) % events.length;
    eventsCarousel.style.transform = `translateX(-${currentEvent * 100}%)`;
    updateDots();
});

document.getElementById('prev-event').addEventListener('click', () => {
    currentEvent = (currentEvent - 1 + events.length) % events.length;
    eventsCarousel.style.transform = `translateX(-${currentEvent * 100}%)`;
    updateDots();
});

// Indicadores (dots) para o carrossel
const dotsContainer = document.createElement('div');
dotsContainer.className = 'carousel-dots';
document.querySelector('.events-section').appendChild(dotsContainer);

events.forEach((_, index) => {
    const dot = document.createElement('span');
    dot.className = 'carousel-dot';
    dot.addEventListener('click', () => {
        currentEvent = index;
        eventsCarousel.style.transform = `translateX(-${currentEvent * 100}%)`;
        updateDots();
    });
    dotsContainer.appendChild(dot);
});

function updateDots() {
    document.querySelectorAll('.carousel-dot').forEach((dot, index) => {
        dot.classList.toggle('active', index === currentEvent);
    });
}
updateDots();

/* Integração opcional com Swiper.js
const swiper = new Swiper('.events-carousel', {
    slidesPerView: 1,
    spaceBetween: 20,
    loop: true,
    autoplay: {
        delay: 5000,
        disableOnInteraction: false,
    },
    navigation: {
        nextEl: '#next-event',
        prevEl: '#prev-event',
    },
});
*/

// Scroll Reveal
const revealElements = document.querySelectorAll('.reveal');
const revealOnScroll = () => {
    revealElements.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const revealPoint = 100;

        if (elementTop < windowHeight - revealPoint && !element.classList.contains('visible')) {
            element.classList.add('visible');
        }
    });
};

// Efeito de Transparência no Cabeçalho e Botão Voltar ao Topo
const header = document.getElementById('header');
const backToTopBtn = document.getElementById('back-to-top');

window.addEventListener('scroll', debounce(() => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }

    if (window.scrollY > 300) {
        backToTopBtn.style.display = 'block';
    } else {
        backToTopBtn.style.display = 'none';
    }

    revealOnScroll();
}, 100));

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Validação do Formulário de Contato
document.querySelector('.contact-section form').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email-contato').value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Por favor, insira um email válido.');
        return;
    }
    alert('O formulário de contato foi enviado com sucesso. Entraremos em contato em breve!');
});

// Validação do Formulário de Newsletter
document.getElementById('newsletter-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email-newsletter').value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Por favor, insira um email válido para a newsletter.');
        return;
    }
    alert(`Obrigado por se inscrever, ${email}! Você receberá nossas novidades em breve.`);
    // Integre com Mailchimp ou outro serviço aqui
});

/* Autenticação real opcional com Firebase
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js';
import { getAuth, signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js';

const firebaseConfig = { // Suas credenciais };
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

document.getElementById('login-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    signInWithEmailAndPassword(auth, email, password)
        .then(() => {
            alert('Login bem-sucedido!');
            loginModal.style.display = 'none';
        })
        .catch((error) => {
            alert('Erro: ' + error.message);
        });
});
*/
