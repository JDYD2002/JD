document.addEventListener('DOMContentLoaded', () => {
  const imagens = document.querySelectorAll('.carousel img');
  const modal = document.getElementById("modal");
  const modalImg = document.getElementById("modal-img");
  const closeModal = document.querySelector(".close");
  const botoes = document.querySelectorAll('.carousel-btn');
  const btnPrev = botoes[0];
  const btnNext = botoes[1];

  let indice = 0;
  let intervalo;

  function mostrarImagem(i) {
    imagens.forEach(img => img.classList.remove('active'));
    imagens[i].classList.add('active');
    indice = i;
  }

  function trocarImagem() {
    indice = (indice + 1) % imagens.length;
    mostrarImagem(indice);
  }

  function iniciarCarrossel() {
    intervalo = setInterval(trocarImagem, 4000);
  }

  function pararCarrossel() {
    clearInterval(intervalo);
  }

  imagens.forEach((img, i) => {
    img.addEventListener('click', () => {
      pararCarrossel();
      modal.style.display = "block";
      modalImg.src = img.src;
    });
  });

  closeModal.onclick = () => {
    modal.style.display = "none";
    iniciarCarrossel();
  };

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
      iniciarCarrossel();
    }
  });

  iniciarCarrossel();

  function ajustarIndice(direcao) {
    pararCarrossel();
    if (direcao === 'anterior') {
      indice = (indice - 1 + imagens.length) % imagens.length;
    } else if (direcao === 'proxima') {
      indice = (indice + 1) % imagens.length;
    }
    mostrarImagem(indice);
    iniciarCarrossel();
  }

  btnPrev.addEventListener('click', () => ajustarIndice('anterior'));
  btnNext.addEventListener('click', () => ajustarIndice('proxima'));
});
