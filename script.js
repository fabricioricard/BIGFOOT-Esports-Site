// Configuração do Snowstorm
snowStorm.targetElement = document.querySelector('.hero-section'); // Limita o efeito à seção hero
snowStorm.snowColor = '#fff'; // Cor dos flocos (branco)
snowStorm.flakesMaxActive = 96; // Máximo de flocos ativos
snowStorm.useTwinkleEffect = true; // Flocos piscam
snowStorm.animationInterval = 35; // Velocidade da animação (ms)
snowStorm.snowCharacter = '❄'; // Caractere de floco (emoji de neve)
snowStorm.vMaxY = 5; // Velocidade vertical máxima
snowStorm.vMaxX = 2; // Velocidade horizontal máxima

// Garante que os flocos de neve não afetem a altura do body
document.addEventListener('DOMContentLoaded', () => {
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        heroSection.style.position = 'relative'; // Garante que os flocos fiquem contidos
        heroSection.style.overflow = 'hidden'; // Evita que os flocos saiam da seção
    }
});

// Função para copiar a chave PIX
function copyPixKey() {
    const key = document.getElementById('pix-key').textContent;
    navigator.clipboard.writeText(key).then(() => {
        alert('Chave PIX copiada com sucesso!');
    }).catch(() => {
        alert('Erro ao copiar chave PIX.');
    });
}

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

// Controle de exibição da seção de doação
document.addEventListener("DOMContentLoaded", () => {
    const donationSection = document.querySelector(".donation-section");
    const closeDonationButton = document.getElementById("close-donation");

    // Verifica se o usuário já viu a seção de doação
    if (localStorage.getItem("donationSeen") === "true") {
        donationSection.remove(); // Remove a seção completamente
    } else {
        // Adiciona o evento de fechamento ao botão
        closeDonationButton.addEventListener("click", () => {
            donationSection.style.display = "none"; // Esconde a seção
            localStorage.setItem("donationSeen", "true"); // Marca como vista
        });
    }
});

// Roloagem Suave para Links com # apenas
const menuLinks = document.querySelectorAll('.nav-menu a');
menuLinks.forEach(anchor => {
    const href = anchor.getAttribute('href');
    if (href && href.startsWith('#')) {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
});

// Efeito de Digitação na Hero Section
const typewriterText = document.querySelector('.typewriter');
const text = typewriterText.textContent;
typewriterText.textContent = '';
let i = 0;

function typeWriter() {
    if (i < text.length) {
        typewriterText.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 100);
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
        const increment = target / 100;

        const updateCount = () => {
            if (count < target) {
                count += increment;
                number.textContent = Math.ceil(count);
                setTimeout(updateCount, 20);
            } else {
                number.textContent = target;
            }
        };
        updateCount();
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
});

document.getElementById('prev-event').addEventListener('click', () => {
    currentEvent = (currentEvent - 1 + events.length) % events.length;
    eventsCarousel.style.transform = `translateX(-${currentEvent * 100}%)`;
});

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

window.addEventListener('scroll', revealOnScroll);

// Efeito de Transparência no Cabeçalho ao Rolar
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
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

// Formulários
document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Formulário enviado com sucesso!');
    });
});
