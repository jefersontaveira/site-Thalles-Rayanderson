// Efeito de Header ao rolar
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.style.padding = '15px 0';
        header.style.boxShadow = '0 10px 30px rgba(0,0,0,0.5)';
    } else {
        header.style.padding = '30px 0';
        header.style.boxShadow = 'none';
    }
});

// ---------- Filtragem Simples do Portfólio ----------------------------------------------
const filterBtns = document.querySelectorAll('.filter-btn');
const projects = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remover classe ativa
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');

        projects.forEach(project => {
            if (filter === 'all' || project.getAttribute('data-category') === filter) {
                project.style.display = 'block';
                setTimeout(() => project.style.opacity = '1', 10);
            } else {
                project.style.opacity = '0';
                setTimeout(() => project.style.display = 'none', 400);
            }
        });
    });
});


// -------- REGRA DE VER MAIS PORJETOS --------------------------------------------------------
let visibleCount = 6;
let currentFilter = 'all';

function updatePortfolioVisibility() {
    const projects = document.querySelectorAll('.project-card');
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    
    // 1. Filtrar projetos baseados na categoria
    let filteredProjects = Array.from(projects).filter(project => {
        if (currentFilter === 'all') return true;
        return project.getAttribute('data-category') === currentFilter;
    });

    // 2. Esconder todos primeiro
    projects.forEach(p => {
        p.style.display = 'none';
        p.classList.remove('fade-in');
    });

    // 3. Mostrar apenas os projetos dentro do limite visibleCount
    const toShow = filteredProjects.slice(0, visibleCount);
    toShow.forEach(p => {
        p.style.display = 'block';
        p.classList.add('fade-in');
    });

    // 4. Regra do Botão: Se o total filtrado for maior que o visível, mostra o botão
    if (filteredProjects.length > visibleCount) {
        loadMoreBtn.classList.remove('hidden');
    } else {
        loadMoreBtn.classList.add('hidden');
    }
}

// Evento de Clique nos Filtros
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        // Resetar para 6 projetos ao trocar de filtro
        visibleCount = 6;
        currentFilter = this.getAttribute('data-filter');
        
        // Atualizar classe ativa nos botões
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');

        updatePortfolioVisibility();
    });
});

// Evento de Clique no "Ver Mais"
document.getElementById('loadMoreBtn').addEventListener('click', function() {
    visibleCount += 3; // Adiciona mais 3
    updatePortfolioVisibility();
});

// Inicializar a tela
document.addEventListener('DOMContentLoaded', updatePortfolioVisibility);



// ---------------- DEPOIMENTOS -------------------------------------------------------------------
const carousel = document.querySelector('.testimonial-carousel');
const cards = document.querySelectorAll('.testimonial-card');
let currentIndex = 0;

// Variáveis para o Touch (Mobile)
let touchStartX = 0;
let touchEndX = 0;

function updateCarousel() {
    cards.forEach((card, index) => {
        card.classList.remove('active', 'prev', 'next');
        card.onclick = null; // Limpa eventos antigos para evitar conflitos

        if (index === currentIndex) {
            card.classList.add('active');
        } else if (index === (currentIndex - 1 + cards.length) % cards.length) {
            card.classList.add('prev');
            // REGRA 1: Clicar no card da esquerda volta
            card.onclick = () => movePrev();
        } else if (index === (currentIndex + 1) % cards.length) {
            card.classList.add('next');
            // REGRA 1: Clicar no card da direita avança
            card.onclick = () => moveNext();
        }
    });
}

function moveNext() {
    currentIndex = (currentIndex + 1) % cards.length;
    updateCarousel();
}

function movePrev() {
    currentIndex = (currentIndex - 1 + cards.length) % cards.length;
    updateCarousel();
}

// Botões de Navegação
document.getElementById('nextBtn').addEventListener('click', moveNext);
document.getElementById('prevBtn').addEventListener('click', movePrev);

// --- SUPORTE PARA TOUCH (Deslizar o dedo) ---
carousel.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
}, {passive: true});

carousel.addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX;
    handleGesture();
}, {passive: true});

function handleGesture() {
    const swipedThreshold = 50; // Sensibilidade do deslize
    if (touchEndX < touchStartX - swipedThreshold) {
        moveNext(); // Deslizou para a esquerda -> Próximo
    }
    if (touchEndX > touchStartX + swipedThreshold) {
        movePrev(); // Deslizou para a direita -> Anterior
    }
}

// Inicializa
updateCarousel();



// Configurações para envio do formulário.
const form = document.querySelector('form');
const btnForm = document.getElementById('btn_form');

form.addEventListener('submit', async (e) => {
    e.preventDefault(); // Impede o recarregamento da página
    
    // Altera o estado do botão para feedback visual
    const originalText = btnForm.innerText;
    btnForm.innerText = "ENVIANDO...";
    btnForm.style.opacity = "0.7";
    btnForm.disabled = true;

    const formData = new FormData(form);

    try {
        const response = await fetch(form.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });

        if (response.ok) {
            // Sucesso no envio
            btnForm.innerText = "MENSAGEM ENVIADA!";
            btnForm.style.backgroundColor = "#28a745"; // Cor verde para sucesso
            form.reset(); // Limpa os campos
            
            setTimeout(() => {
                btnForm.innerText = originalText;
                btnForm.style.backgroundColor = ""; // Volta para a cor original (var--primary)
                btnForm.style.opacity = "1";
                btnForm.disabled = false;
            }, 5000);
        } else {
            // Erro retornado pelo servidor
            throw new Error();
        }
    } catch (error) {
        // Erro de rede ou erro inesperado
        btnForm.innerText = "ERRO AO ENVIAR";
        btnForm.style.backgroundColor = "#dc3545"; // Cor vermelha para erro
        
        setTimeout(() => {
            btnForm.innerText = originalText;
            btnForm.style.backgroundColor = "";
            btnForm.style.opacity = "1";
            btnForm.disabled = false;
        }, 3000);
    }
});