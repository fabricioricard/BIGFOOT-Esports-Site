// Função para copiar a chave PIX
function copyPixKey() {
    const key = document.getElementById('pix-key').textContent;
    navigator.clipboard.writeText(key).then(() => {
        alert('Chave PIX copiada com sucesso!');
    }).catch(() => {
        alert('Erro ao copiar chave PIX.');
    });
}

// Inicializar Partículas na Hero Section
particlesJS('particles-js', {
    particles: {
        number: { value: 80, density: { enable: true, value_area: 800 } },
        color: { value: '#1a73e8' },
        shape: { type: 'circle' },
        opacity: { value: 0.5, random: false },
        size: { value: 3, random: true },
        line_linked: { enable: true, distance: 150, color: '#1a73e8', opacity: 0.4, width: 1 },
        move: { enable: true, speed: 6, direction: 'none', random: false, straight: false, out_mode: 'out', bounce: false }
    },
    interactivity: {
        detect_on: 'canvas',
        events: { onhover: { enable: true, mode: 'repulse' }, onclick: { enable: true, mode: 'push' }, resize: true },
        modes: { repulse: { distance: 100, duration: 0.4 }, push: { particles_nb: 4 } }
    },
    retina_detect: true
});

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

// Carregar Eventos Dinamicamente via API
const eventsCarousel = document.getElementById('events-carousel');
let eventsData = [];
let currentEvent = 0;

fetch('https://jsonplaceholder.typicode.com/posts?_limit=5')
    .then(response => response.json())
    .then(data => {
        eventsData = data.map((post, index) => ({
            title: post.title,
            description: post.body,
            image: `https://via.placeholder.com/700x300?text=Evento+${index + 1}`
        }));

        eventsData.forEach(event => {
            const eventDiv = document.createElement('div');
            eventDiv.classList.add('events-content');
            eventDiv.innerHTML = `
                <img src="${event.image}" alt="${event.title}" class="event-image hover-zoom" loading="lazy">
                <h3>${event.title}</h3>
                <p>${event.description}</p>
            `;
            eventsCarousel.appendChild(eventDiv);
        });

        // Inicializar controles do carrossel
        document.getElementById('next-event').addEventListener('click', () => {
            currentEvent = (currentEvent + 1) % eventsData.length;
            eventsCarousel.style.transform = `translateX(-${currentEvent * 100}%)`;
        });

        document.getElementById('prev-event').addEventListener('click', () => {
            currentEvent = (currentEvent - 1 + eventsData.length) % eventsData.length;
            eventsCarousel.style.transform = `translateX(-${currentEvent * 100}%)`;
        });
    })
    .catch(error => {
        console.error('Erro ao carregar eventos:', error);
        eventsCarousel.innerHTML = '<p>Erro ao carregar eventos. Tente novamente mais tarde.</p>';
    });

// Carregar Produtos Dinamicamente via API
const shopItems = document.getElementById('shop-items');

fetch('https://jsonplaceholder.typicode.com/photos?_limit=4')
    .then(response => response.json())
    .then(data => {
        data.forEach((product, index) => {
            const productDiv = document.createElement('div');
            productDiv.classList.add('shop-item', 'hover-effect');
            productDiv.innerHTML = `
                <img src="${product.thumbnailUrl}" alt="${product.title}" class="hover-zoom" loading="lazy">
                <p>${product.title}</p>
                <p>R$ ${(index + 1) * 30},00</p>
            `;
            shopItems.appendChild(productDiv);
        });
    })
    .catch(error => {
        console.error('Erro ao carregar produtos:', error);
        shopItems.innerHTML = '<p>Erro ao carregar produtos. Tente novamente mais tarde.</p>';
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
