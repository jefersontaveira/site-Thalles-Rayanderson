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