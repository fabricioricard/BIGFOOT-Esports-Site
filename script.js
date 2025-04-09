// Configuração do Snowstorm
if (typeof snowStorm !== 'undefined') {
    snowStorm.targetElement = document.querySelector('.hero-section');
    snowStorm.snowColor = '#fff';
    snowStorm.flakesMaxActive = 96;
    snowStorm.useTwinkleEffect = true;
    snowStorm.animationInterval = 35;
    snowStorm.snowCharacter = '❄';
    snowStorm.vMaxY = 5;
    snowStorm.vMaxX = 2;
}

// Função para copiar a chave PIX
function copyPixKey() {
    const key = document.getElementById('pix-key');
    if (key) {
        navigator.clipboard.writeText(key.textContent).then(() => {
            alert('Chave PIX copiada com sucesso!');
        }).catch(() => {
            alert('Erro ao copiar chave PIX.');
        });
    }
}

// Modal de Login
const loginBtn = document.getElementById('login-btn');
const loginModal = document.getElementById('login-modal');
const closeModal = document.getElementById('close-modal');

if (loginBtn && loginModal && closeModal) {
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
}

const loginForm = document.getElementById('login-form');
if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Login realizado com sucesso! (Funcionalidade de exemplo)');
        loginModal.style.display = 'none';
    });
}

// Fechar a Caixa de Doação
const closeDonation = document.getElementById('close-donation');
const donationBox = document.getElementById('donation-box');

if (closeDonation && donationBox) {
    closeDonation.addEventListener('click', () => {
        donationBox.style.display = 'none';
    });
}

// Rolagem Suave para Links com #
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

// Dropdown funcional por clique
document.querySelectorAll('.dropdown > a').forEach(button => {
    button.addEventListener('click', function (e) {
        e.preventDefault();
        const parent = this.parentElement;

        // Fecha todos os outros dropdowns
        document.querySelectorAll('.dropdown.open').forEach(drop => {
            if (drop !== parent) drop.classList.remove('open');
        });

        // Alterna o dropdown atual
        parent.classList.toggle('open');
    });
});

// Efeito de Digitação na Hero Section
const typewriterText = document.querySelector('.typewriter');
if (typewriterText) {
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
}

// Animação de Contagem para Estatísticas
const statsNumbers = document.querySelectorAll('.stat-number');
const statsSection = document.querySelector('.stats-section');

if (statsNumbers.length && statsSection) {
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
}

// Carrossel de Eventos
const eventsCarousel = document.querySelector('.events-carousel');
const events = document.querySelectorAll('.events-content');
const prevEventBtn = document.getElementById('prev-event');
const nextEventBtn = document.getElementById('next-event');

if (eventsCarousel && events.length && prevEventBtn && nextEventBtn) {
    let currentEvent = 0;

    nextEventBtn.addEventListener('click', () => {
        currentEvent = (currentEvent + 1) % events.length;
        eventsCarousel.style.transform = `translateX(-${currentEvent * 100}%)`;
    });

    prevEventBtn.addEventListener('click', () => {
        currentEvent = (currentEvent - 1 + events.length) % events.length;
        eventsCarousel.style.transform = `translateX(-${currentEvent * 100}%)`;
    });
}

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
if (header) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// Botão Voltar ao Topo
const backToTopBtn = document.getElementById('back-to-top');
if (backToTopBtn) {
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
}

// Formulários
document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Formulário enviado com sucesso!');
    });
});
