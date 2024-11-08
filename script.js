// Seleciona todos os elementos com a classe "quadrado"
const quadrados = document.querySelectorAll('.quadrado');

// Cria um IntersectionObserver para observar a entrada dos elementos na tela
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active'); // Adiciona a classe "active" quando o quadrado está visível
            observer.unobserve(entry.target); // Para de observar o quadrado após a ativação
        }
    });
}, {
    threshold: 0.5 // Ativa quando 50% do quadrado está visível
});

// Adiciona o observador para cada quadrado
quadrados.forEach(quadrado => observer.observe(quadrado));


