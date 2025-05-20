// Carrossel automático
const imagens = document.querySelectorAll('.carousel img');
let indice = 0;

function trocarImagem() {
  imagens[indice].classList.remove('active');
  indice = (indice + 1) % imagens.length;
  imagens[indice].classList.add('active');
}

setInterval(trocarImagem, 4000);

// Menu hamburguer responsivo
const menuToggle = document.getElementById('menu-toggle');
const navMenu = document.getElementById('nav-menu');

menuToggle.addEventListener('click', () => {
  navMenu.classList.toggle('active');
});
