const menuMobile = document.getElementById('menu-mobile');
const navLinks = document.querySelector('.nav-links');
const links = document.querySelectorAll('.nav-links li');

function toggleMenu() {
    navLinks.classList.toggle('active');
    menuMobile.classList.toggle('active');
    
    // Animação opcional dos links entrando (Stagger)
    links.forEach((link, index) => {
        if (link.style.animation) {
            link.style.animation = '';
        } else {
            link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
        }
    });
}

menuMobile.addEventListener('click', toggleMenu);

// Fechar menu ao clicar em qualquer link
links.forEach(link => {
    link.addEventListener('click', () => {
        if (navLinks.classList.contains('active')) {
            toggleMenu();
        }
    });
});