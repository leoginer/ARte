// Configuración de los marcadores
// Cada objeto en el array representa un marcador con su ID, video, modelo 3D, audio, y efecto asociado
const cuadros = [
  { markerId: "marcador0", videoId: "videoTexture-marcador0", modelId: "model-marcador0", audioId: "audio-marcador0", effect: "float" },
  { markerId: "marcador1", videoId: "videoTexture-marcador1", modelId: "model-marcador1", audioId: "audio-marcador1", effect: "scale" },
  // Agrega aquí más marcadores (hasta 15)
];

// Iteramos sobre cada marcador configurado
cuadros.forEach(({ markerId, videoId, modelId, audioId, effect }) => {
  // Selección del marcador en la escena basado en su atributo `url`
  const marker = document.querySelector(`a-nft[url*="${markerId}"]`);

  // Referencias a los elementos del DOM (video, modelo 3D, audio)
  const video = document.getElementById(videoId);
  const model = document.getElementById(modelId);
  const audio = document.getElementById(audioId);

  // Controla si el marcador está visible en el momento
  let markerVisible = false;

  // Evento: El marcador es detectado por la cámara
  marker.addEventListener("markerFound", () => {
    console.log(`Marcador detectado: ${markerId}`);
    markerVisible = true;
    video.play(); // Reproduce el video asociado
  });

  // Evento: El marcador se pierde de vista
  marker.addEventListener("markerLost", () => {
    console.log(`Marcador perdido: ${markerId}`);
    markerVisible = false;
    video.pause(); // Pausa el video
    video.currentTime = 0; // Reinicia el video al principio
    model.setAttribute("visible", "false"); // Oculta el modelo 3D
    if (audio.components && audio.components.sound) {
      audio.components.sound.stopSound(); // Detiene el audio
    }
  });

  // Evento: Cuando el video termina de reproducirse
  video.addEventListener("ended", () => {
    if (markerVisible) {
      console.log(`Video terminado: ${videoId}`);
      model.setAttribute("visible", "true"); // Muestra el modelo 3D
      if (audio.components && audio.components.sound) {
        audio.components.sound.playSound(); // Reproduce el audio asociado
      }
    }
  });

  // Evento: Interacción con el modelo 3D (por ejemplo, clic)
  model.addEventListener("click", () => {
    console.log(`Modelo 3D interactuado: ${modelId}`);
    // Aplica un efecto dependiendo de la configuración
    switch (effect) {
      case "float":
        model.setAttribute("animation__float", {
          property: "position",
          to: "0 1.1 0",
          dur: 1000,
          dir: "alternate",
          loop: false,
        });
        break;

      case "scale":
        model.setAttribute("animation__scale", {
          property: "scale",
          to: "0.7 0.7 0.7",
          dur: 200,
          dir: "alternate",
          loop: false,
        });
        break;

      // Agrega más efectos según sea necesario
      default:
        console.warn(`Efecto desconocido: ${effect}`);
        break;
    }
  });
});

// Logs generales para todos los marcadores (si son necesarios fuera del bucle)
document.querySelectorAll("a-nft").forEach(marker => {
  marker.addEventListener("markerFound", () => {
    console.log(`Marcador detectado globalmente: ${marker.getAttribute('url')}`);
  });

  marker.addEventListener("markerLost", () => {
    console.log(`Marcador perdido globalmente: ${marker.getAttribute('url')}`);
  });
});
