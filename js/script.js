// Menu responsivo
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('ativo');
});


document.querySelectorAll('.dropdown > a').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const submenu = link.nextElementSibling;
    submenu.classList.toggle('ativo');
  });
});

// =============================
// CARROSSEL DE IMAGENS
// =============================
const slides = document.querySelector('.slides');
const imagens = document.querySelectorAll('.slides img');
const anterior = document.querySelector('.anterior');
const proximo = document.querySelector('.proximo');

let indice = 0;

function mostrarSlide() {
  slides.style.transform = `translateX(${-indice * 100}%)`;
}

proximo.addEventListener('click', () => {
  indice = (indice + 1) % imagens.length;
  mostrarSlide();
});

anterior.addEventListener('click', () => {
  indice = (indice - 1 + imagens.length) % imagens.length;
  mostrarSlide();
});

// Troca automática a cada 5 segundos
setInterval(() => {
  indice = (indice + 1) % imagens.length;
  mostrarSlide();
}, 5000);
