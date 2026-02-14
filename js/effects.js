document.addEventListener("DOMContentLoaded", () => {
    gsap.registerPlugin(ScrollTrigger);

    // --- Timeline da HERO -----------------------------------------------
    const tlHero = gsap.timeline({ defaults: { ease: "expo.out", duration: 1.2 } });
    
    tlHero.from("#hero span", {
        y: 100,
        opacity: 0,
        delay: 0.2
    })
    .from("#hero h1", {
        y: 150,
        opacity: 0,
        skewY: 7, 
    }, "-=1.0") 
    .from("#hero p", {
        y: 50,
        opacity: 0,
    }, "-=0.8")
    .from("#cta-scroll", { 
        y: 20,
        opacity: 0,
        duration: 0.4, // Duração única e consistente
        clearProps: "all"
    }, "-=0.6");





    // --- SEÇÃO PORTFÓLIO ----------------------------------------------
    const cards = gsap.utils.toArray(".project-card");

    cards.forEach((card, i) => {
        const image = card.querySelector("img");

        const tlCard = gsap.timeline({ // Nome diferente para a timeline do card
            scrollTrigger: {
                trigger: card,
                start: "top 90%",
                toggleActions: "play none none none"
            }
        });

        tlCard.from(card, {
            duration: 1.2,
            y: 100,
            opacity: 0,
            rotationX: -20,
            rotationY: i % 2 === 0 ? 10 : -10,
            ease: "expo.out",
        })
        .to(image, {
            scale: 1,
            duration: 1.5,
            ease: "power2.out"
        }, "-=1"); 
    });





    // --- SEÇÃO PROCESSO (Timeline) -------------------------------------------------
    const tlProcesso = gsap.timeline({
        scrollTrigger: {
            trigger: "#processo",
            start: "top 70%", // Dispara quando a seção aparece 30% na tela
            toggleActions: "play none none none"
        }
    });

    // 1. Primeiro, "desenhamos" a linha conectora
    tlProcesso.to(".timeline", {
        "--linha-progresso": 1,
        duration: 1.5,
        ease: "power2.inOut"
    })

    // 2. Depois, fazemos os passos (steps) aparecerem em cascata
    .to(".step", {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.3, 
        ease: "back.out(1.7)" 
    }, "-=1"); 






    // --- SEÇÃO DEPOIMENTOS -------------------------------------------
    gsap.from("#depoimentos .section-title", {
        scrollTrigger: {
            trigger: "#depoimentos",
            start: "top 80%",
        },
        opacity: 0,
        y: 20,
        duration: 1,
        ease: "power2.out"
    });

    gsap.from(".carousel-container", {
        scrollTrigger: {
            trigger: ".carousel-container",
            start: "top 85%",
        },
        opacity: 0,
        scale: 0.98, // Um leve zoom in para dar profundidade
        duration: 1.2,
        ease: "power1.inOut"
    });
});