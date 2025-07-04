// Adicionamos um único 'listener' que espera a página carregar por completo.
document.addEventListener('DOMContentLoaded', function() {

  /* ================================================================== */
  /* ANIMAÇÕES DE ENTRADA (UM ÚNICO OBSERVER OTIMIZADO)                */
  /* ================================================================== */

  // Opções para o nosso "olheiro"
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15 // Ativa quando 15% do elemento estiver visível
  };

  // Criamos um único "olheiro" para todas as animações
  const universalObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      // Quando um elemento entra na tela...
      if (entry.isIntersecting) {
        
        // Se for um card de serviço (classe .quadrado)...
        if (entry.target.classList.contains('quadrado')) {
          entry.target.classList.add('active'); // Adiciona a classe para a animação de entrada
          entry.target.classList.add('shine-on-scroll'); // Adiciona a classe para o brilho no mobile
        } 
        // Se for qualquer outra seção com a classe .animar...
        else if (entry.target.classList.contains('animar')) {
          entry.target.classList.add('section-visible'); // Adiciona a classe de fade-in
        }
        
        // Paramos de "olhar" para o elemento para a animação não repetir
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Mandamos o "olheiro" observar todos os elementos que têm a classe '.animar'
  document.querySelectorAll('.animar').forEach(element => {
    universalObserver.observe(element);
  });
  // E também observar todos os cards de serviço '.quadrado'
  document.querySelectorAll('.quadrado').forEach(element => {
    universalObserver.observe(element);
  });


  /* ================================================================== */
  /* INICIALIZAÇÃO DOS CARROSSÉIS (SWIPERJS)                             */
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
      disableOnInteraction: false,
    },
    loop: true,
  });

  // Carrossel 2: Peças
  const swiperParts = new Swiper(".mySwiperParts", {
    effect: "slide",
    slidesPerView: 1, // Começa com 1 no mobile
    spaceBetween: 30,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },
    loop: true,
    // Define como ele se comporta em telas maiores
    breakpoints: {
      640: { slidesPerView: 2, spaceBetween: 20 },
      768: { slidesPerView: 3, spaceBetween: 40 },
      1024: { slidesPerView: 4, spaceBetween: 50 },
    }
  });


  /* ================================================================== */
  /* HORÁRIO DE ATENDIMENTO DINÂMICO                                    */
  /* ================================================================== */
  const officeHoursEl = document.getElementById('office-hours');
  if (officeHoursEl) {
    const today = new Date().getDay();
    const currentHour = new Date().getHours();
    const isOpen = (today >= 1 && today <= 5) && (currentHour >= 8 && currentHour < 16);

    if (isOpen) {
      officeHoursEl.innerHTML = '<strong>Aberto agora:</strong> Atendendo até as 16:00';
      officeHoursEl.style.color = '#3A7D44';
    } else {
      officeHoursEl.innerHTML = '<strong>Fechado agora:</strong> Atendemos de Seg a Sex, das 08:00 às 16:00';
      officeHoursEl.style.color = '#c0392b';
    }
  }

});