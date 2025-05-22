document.addEventListener('DOMContentLoaded', () => {
  // Carrossel de imagens
  const imagens = document.querySelectorAll('.carousel img');
  const modal = document.getElementById("modal");
  const modalImg = document.getElementById("modal-img");
  const closeModal = document.querySelector(".close");
  const btnPrev = document.querySelector('.carousel-btn.prev');
  const btnNext = document.querySelector('.carousel-btn.next');

  // Carrossel de vídeos
  const videoSlides = document.querySelectorAll('.video-slide');
  const videoPrev = document.querySelector('.video-btn.prev');
  const videoNext = document.querySelector('.video-btn.next');

  // Versículo
  const btn = document.getElementById('btnToggleVersiculo');
  const conteudo = document.getElementById('conteudoVersiculo');

  // Versículo toggle
  if (btn && conteudo) {
    btn.addEventListener('click', () => {
      if (conteudo.style.display === 'none' || conteudo.style.display === '') {
        conteudo.style.display = 'block';
        btn.textContent = 'Esconder Versículo';
      } else {
        conteudo.style.display = 'none';
        btn.textContent = 'Versículo base';
      }
    });
  }

  // Controle do carrossel de vídeos
  let currentVideo = 0;

  function showVideo(index) {
    videoSlides.forEach(slide => slide.classList.remove('active'));
    if (videoSlides[index]) {
      videoSlides[index].classList.add('active');
    }
  }

  if (videoPrev && videoNext) {
    videoPrev.addEventListener('click', () => {
      currentVideo = (currentVideo - 1 + videoSlides.length) % videoSlides.length;
      showVideo(currentVideo);
    });

    videoNext.addEventListener('click', () => {
      currentVideo = (currentVideo + 1) % videoSlides.length;
      showVideo(currentVideo);
    });
  }

  if (videoSlides.length > 0) {
    showVideo(currentVideo);
  }

  // Carrossel de imagens
  let indice = 0;
  let intervalo = null;

  function mostrarImagem(i) {
    imagens.forEach(img => img.classList.remove('active'));
    if (imagens[i]) {
      imagens[i].classList.add('active');
    }
    indice = i;
  }

  function trocarImagem() {
    indice = (indice + 1) % imagens.length;
    mostrarImagem(indice);
  }

  function iniciarCarrossel() {
    pararCarrossel();
    intervalo = setInterval(trocarImagem, 4000);
  }

  function pararCarrossel() {
    if (intervalo) clearInterval(intervalo);
  }

  if (imagens.length > 0) {
    mostrarImagem(0);
    iniciarCarrossel();

    imagens.forEach((img) => {
      img.addEventListener('click', () => {
        pararCarrossel();
        modal.style.display = "block";
        modalImg.src = img.src;
      });
    });

    if (closeModal) {
      closeModal.onclick = () => {
        modal.style.display = "none";
        iniciarCarrossel();
      };
    }

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.style.display = "none";
        iniciarCarrossel();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && getComputedStyle(modal).display !== 'none') {
        modal.style.display = "none";
        iniciarCarrossel();
      }
    });

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

    if (btnPrev && btnNext) {
      btnPrev.addEventListener('click', () => ajustarIndice('anterior'));
      btnNext.addEventListener('click', () => ajustarIndice('proxima'));
    }
  }
});
