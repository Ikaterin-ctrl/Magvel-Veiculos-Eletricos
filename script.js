document.addEventListener("DOMContentLoaded", function () {
    const servicosSection = document.getElementById('servicos');
    const quadrados = document.querySelectorAll('.quadrado');

    // Cores dos quadrados
    const colors = ['green-lime', 'dark-gray', 'dark-gray', 'green-lime', 'green-lime', 'dark-gray'];
    let currentIndex = 0;
    let intervalId;

    // Efeito dos quadrados
    const resetQuadrados = () => {
        quadrados.forEach(quadrado => {
            quadrado.classList.remove('green-lime', 'dark-gray', 'active');
        });
    };

    const activateQuadrados = () => {
        quadrados[currentIndex].classList.add(colors[currentIndex]);
        quadrados[currentIndex].classList.add('active');

        if (currentIndex > 0) {
            quadrados[currentIndex - 1].classList.remove(colors[currentIndex - 1]);
            quadrados[currentIndex - 1].classList.remove('active');
        } else {
            quadrados[quadrados.length - 1].classList.remove(colors[quadrados.length - 1]);
            quadrados[quadrados.length - 1].classList.remove('active');
        }

        currentIndex++;

        if (currentIndex >= quadrados.length) {
            currentIndex = 0;
            clearInterval(intervalId);
            resetQuadrados();
            setTimeout(startEffect, 5000); // Espera 5 segundos antes de reiniciar
        }
    };

    const startEffect = () => {
        intervalId = setInterval(activateQuadrados, 100); // Muda a cada 100ms
    };

    const handleScroll = () => {
        const rect = servicosSection.getBoundingClientRect();
        if (rect.top <= window.innerHeight && rect.bottom >= 0) {
            startEffect();
            window.removeEventListener('scroll', handleScroll);
        }
    };

    // Inicializa o efeito de quadrados
    window.addEventListener('scroll', handleScroll);
});
