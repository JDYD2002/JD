document.addEventListener('DOMContentLoaded', () => {
  // Elementos principais
  const imagens = document.querySelectorAll('.carousel img');
  const modal = document.getElementById("modal");
  const modalImg = document.getElementById("modal-img");
  const closeModalBtn = document.querySelector(".close"); // modal carrossel
  const btnPrev = document.querySelector('.carousel-btn.prev');
  const btnNext = document.querySelector('.carousel-btn.next');
  let videoIndex = 0;
  const videoSlides = document.querySelectorAll('.video-slide');
  const videoPrev = document.querySelector('.video-btn.prev');
  const videoNext = document.querySelector('.video-btn.next');

  const btnVersiculo = document.getElementById('btnToggleVersiculo');
  const conteudoVersiculo = document.getElementById('conteudoVersiculo');

  // Modal Jesusinho
  const btnJesusinho = document.getElementById('btn-jesusinho');
  const modalJesusinho = document.getElementById('modal-jesusinho');
  const closeModalBtnJesusinho = document.getElementById('close-modal');

  btnJesusinho.addEventListener('click', () => {
    modalJesusinho.style.display = 'flex';
  });

  closeModalBtnJesusinho.addEventListener('click', () => {
    modalJesusinho.style.display = 'none';
  });

  // Fechar modal Jesusinho ao clicar fora da área modal
  modalJesusinho.addEventListener('click', (event) => {
    if (event.target === modalJesusinho) {
      modalJesusinho.style.display = 'none';
    }
  });

  // --- Versículo toggle com aria e hidden ---
  if (btnVersiculo && conteudoVersiculo) {
    // Inicializa estado
    conteudoVersiculo.setAttribute('hidden', '');
    btnVersiculo.setAttribute('aria-expanded', 'false');

    btnVersiculo.addEventListener('click', () => {
      const isHidden = conteudoVersiculo.hasAttribute('hidden');
      if (isHidden) {
        conteudoVersiculo.removeAttribute('hidden');
        btnVersiculo.setAttribute('aria-expanded', 'true');
        btnVersiculo.textContent = 'Esconder Versículo';
        conteudoVersiculo.focus();
      } else {
        conteudoVersiculo.setAttribute('hidden', '');
        btnVersiculo.setAttribute('aria-expanded', 'false');
        btnVersiculo.textContent = 'Versículo base';
        btnVersiculo.focus();
      }
    });
  }

  // --- Controle do carrossel de vídeos ---
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

  // --- Carrossel de imagens ---
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

  // --- Modal do carrossel ---
  function openModal(img) {
    pararCarrossel();
    modalImg.src = img.src;
    modalImg.alt = img.alt;
    modal.classList.add('show');
    modal.removeAttribute('hidden');
    document.body.style.overflow = 'hidden'; // trava scroll da página
    modal.focus();
  }

  function closeModal() {
    modal.classList.remove('show');
    modal.setAttribute('hidden', '');
    modalImg.src = '';
    modalImg.alt = '';
    document.body.style.overflow = '';
    iniciarCarrossel();
  }

  if (imagens.length > 0) {
    mostrarImagem(0);
    iniciarCarrossel();

    imagens.forEach(img => {
      // Torna as imagens focáveis para acessibilidade
      img.setAttribute('tabindex', '0');

      img.addEventListener('click', () => openModal(img));

      img.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openModal(img);
        }
      });
    });

    if (closeModalBtn) {
      closeModalBtn.addEventListener('click', closeModal);
    }

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('show')) {
        closeModal();
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
