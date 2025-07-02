// Adicionamos um único 'listener' que espera a página carregar por completo.
// Isso evita erros e garante que todos os elementos do HTML estejam prontos.
document.addEventListener('DOMContentLoaded', function() {
/* ========================================================== */
/* ATIVADOR DA ANIMAÇÃO DOS CARDS DE SERVIÇO                  */
/* ========================================================== */

// 1. Selecionamos todos os cards que devem ser animados
const cardsDeServico = document.querySelectorAll('.quadrado');

// 2. Criamos o "olheiro" (Observer)
const cardObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    // 3. Quando um card entra na tela...
    if (entry.isIntersecting) {
      // ...adicionamos a classe '.active' para iniciar a animação do CSS
      entry.target.classList.add('active');
      // 4. E paramos de "olhar" para ele, para a animação não repetir
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.2 // A animação começa quando 20% do card estiver visível
});

// 5. Mandamos o "olheiro" observar cada um dos cards
cardsDeServico.forEach(card => {
  cardObserver.observe(card);
});
  /* ================================================================== */
  /* ANIMAÇÕES DE FADE-IN (MÉTODO OTIMIZADO)                            */
  /* ================================================================== */
  // Usaremos um único IntersectionObserver para animar todas as seções.
  // É muito mais eficiente para o navegador do que o antigo 'scroll listener'.

  const observerOptions = {
    root: null, // Observa em relação à viewport
    rootMargin: '0px',
    threshold: 0.1 // Ativa quando 10% do elemento estiver visível
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('section-visible'); // Adiciona a classe para o fade-in
        observer.unobserve(entry.target); // Para de observar o elemento depois que ele já apareceu
      }
    });
  }, observerOptions);

  // Seleciona todos os elementos que queremos animar e manda o observer "observá-los"
  const sectionsToAnimate = document.querySelectorAll('.servicos-prestados, .masonry-gallery, .masonry-gallery2, .interest-capture, .benefits, .social-proof, .contact-section');
  sectionsToAnimate.forEach(section => {
    observer.observe(section);
  });


/* ================================================================== */
/* INICIALIZAÇÃO DOS CARROSSÉIS (SWIPERJS) - CORREÇÃO PARA MOBILE     */
/* ================================================================== */

// Carrossel 1: Manutenções
const swiperMaintenance = new Swiper(".mySwiper", {
  effect: "fade",
  fadeEffect: { crossFade: true },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  autoplay: {
    delay: 5000,
    disableOnInteraction: false, // <-- GARANTA QUE ESTA LINHA ESTEJA AQUI
  },
  loop: true,
});

// Carrossel 2: Peças
const swiperParts = new Swiper(".mySwiperParts", {
  effect: "slide",
  slidesPerView: 1,
  spaceBetween: 30,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  autoplay: {
    delay: 4000,
    disableOnInteraction: false, // <-- E AQUI TAMBÉM
  },
  loop: true,
  breakpoints: {
    640: { slidesPerView: 2, spaceBetween: 20 },
    768: { slidesPerView: 3, spaceBetween: 40 },
    1024: { slidesPerView: 4, spaceBetween: 50 },
  }
});
  /* ================================================================== */
  /* HORÁRIO DE ATENDIMENTO DINÂMICO                                    */
  /* ================================================================== */
  // Esta função já estava ótima! Apenas a colocamos dentro do 'DOMContentLoaded'.
  const officeHoursEl = document.getElementById('office-hours');
  if (officeHoursEl) { // Boa prática: verificar se o elemento existe antes de usá-lo
    const today = new Date().getDay(); // 0 = Domingo, 1 = Segunda, ..., 6 = Sábado
    
    // Horário de funcionamento: Seg-Sex (1 a 5) das 08:00 às 16:00
    // Vamos considerar o horário atual para sermos mais precisos
    const currentHour = new Date().getHours();
    const isOpen = (today >= 1 && today <= 5) && (currentHour >= 8 && currentHour < 16);

    if (isOpen) {
      officeHoursEl.innerHTML = '<strong>Aberto agora:</strong> Atendendo até as 16:00';
      officeHoursEl.style.color = '#3A7D44'; // Verde, indicando "aberto"
    } else {
      officeHoursEl.innerHTML = '<strong>Fechado agora:</strong> Atendemos de Seg a Sex, das 08:00 às 16:00';
      officeHoursEl.style.color = '#c0392b'; // Vermelho, indicando "fechado"
    }
  }

});