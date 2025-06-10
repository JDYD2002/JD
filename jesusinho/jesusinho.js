class JesusinhoBot extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = `<div id="bot-jesusinho" style="position: fixed; bottom: 20px; right: 20px; z-index: 9999;">
      <button id="falar-btn" style="padding: 10px; background: #00994d; color: white; border-radius: 50%; font-size: 20px;">🎤</button>
      <audio id="audio-player" style="display: none;"></audio>
    </div>`;
  }

  connectedCallback() {
    const baseURL = "https://jesus-mb25.onrender.com";
    const falarBtn = this.querySelector("#falar-btn");
    const audioPlayer = this.querySelector("#audio-player");

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    let recognition;

    async function falarTexto(texto) {
      try {
        const res = await fetch(`${baseURL}/tts`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ texto })
        });
        const data = await res.json();
        if (data.audio_b64) {
          audioPlayer.src = "data:audio/mp3;base64," + data.audio_b64;
          audioPlayer.style.display = "block";
          audioPlayer.play();
        } else {
          audioPlayer.style.display = "none";
        }
      } catch (err) {
        console.error("Erro ao converter texto em fala:", err);
      }
    }

    function falar() {
      if (!SpeechRecognition) {
        alert("Reconhecimento de voz não suportado no seu navegador.");
        return;
      }

      if (!recognition) {
        recognition = new SpeechRecognition();
        recognition.lang = "pt-BR";
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;

        recognition.onstart = () => {
          falarBtn.disabled = true;
          falarBtn.textContent = "🎙️ Gravando...";
        };

        recognition.onend = () => {
          falarBtn.disabled = false;
          falarBtn.textContent = "🎤";
        };

        recognition.onresult = async (event) => {
          const texto = event.results[0][0].transcript;
          console.log("Você disse:", texto);

          const resposta = await fetch(`${baseURL}/chat`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ texto })
          }).then(r => r.json());

          falarTexto(resposta.resposta);
        };

        recognition.onerror = (event) => {
          console.error("Erro no reconhecimento de voz:", event.error);
          falarBtn.disabled = false;
          falarBtn.textContent = "🎤";
        };
      }

      recognition.start();
    }

    falarBtn.addEventListener("click", falar);
  }
}

customElements.define("jesusinho-bot", JesusinhoBot);

