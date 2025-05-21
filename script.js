// Carrossel
const imagens = document.querySelectorAll('.carousel img');
let indice = 0;

function trocarImagem() {
  imagens[indice].classList.remove('active');
  indice = (indice + 1) % imagens.length;
  imagens[indice].classList.add('active');
}

setInterval(trocarImagem, 4000);

// Modal
const modal = document.getElementById("modal");
const modalImg = document.getElementById("modal-img");
const closeModal = document.querySelector(".close");

imagens.forEach(img => {
  img.addEventListener('click', () => {
    modal.style.display = "block";
    modalImg.src = img.src;
  });
});

closeModal.onclick = () => {
  modal.style.display = "none";
};
