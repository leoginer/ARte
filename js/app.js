// Configuración de los marcadores
const cuadros = [
  { markerId: "marcador0", videoId: "videoTexture-marcador0", modelId: "model-marcador0", audioId: "audio-marcador0", effect: "float" },
  { markerId: "marcador1", videoId: "videoTexture-marcador1", modelId: "model-marcador1", audioId: "audio-marcador1", effect: "scale" },
  // Agrega aquí más marcadores si es necesario
];

// Iteramos sobre cada marcador configurado
cuadros.forEach(({ markerId, videoId, modelId, audioId, effect }) => {
  const marker = document.querySelector(`a-nft[url*="${markerId}"]`);
  const video = document.getElementById(videoId);
  const model = document.getElementById(modelId);
  const audio = document.getElementById(audioId);

  let markerVisible = false;
  let markerLostTimeout;

  // Log de inicialización
  console.log(`Configurando marcador: ${markerId}`);

  // Evento: Marcador detectado
  marker.addEventListener("markerFound", () => {
    console.log(`Marcador detectado: ${markerId}`);
    clearTimeout(markerLostTimeout);
    markerVisible = true;
    video.play();
    console.log(`Video ${videoId} reproduciéndose.`);
  });

  // Evento: Marcador perdido
  marker.addEventListener("markerLost", () => {
    console.log(`Marcador perdido: ${markerId}`);
    markerLostTimeout = setTimeout(() => {
      markerVisible = false;
      video.pause();
      video.currentTime = 0;
      console.log(`Video ${videoId} pausado y reiniciado.`);
      model.setAttribute("visible", "false");
      console.log(`Modelo ${modelId} oculto.`);
      if (audio.components && audio.components.sound) {
        audio.components.sound.stopSound();
        console.log(`Audio ${audioId} detenido.`);
      }
    }, 500);
  });

  // Evento: Video finalizado
  video.addEventListener("ended", () => {
    if (markerVisible) {
      console.log(`Video terminado: ${videoId}`);
      model.setAttribute("visible", "true");
      console.log(`Modelo ${modelId} visible.`);
      if (audio.components && audio.components.sound) {
        audio.components.sound.playSound();
        console.log(`Audio ${audioId} reproduciéndose.`);
      }
    }
  });

  // Evento: Interacción con el modelo
  model.addEventListener("click", () => {
    console.log(`Modelo interactuado: ${modelId}`);
    switch (effect) {
      case "float":
        model.setAttribute("animation", "property: position; to: 0 1.2 -2; dur: 1000; dir: alternate;");
        console.log("Efecto 'float' aplicado.");
        break;
      case "scale":
        model.setAttribute("animation", "property: scale; to: 1 1 1; dur: 500; dir: alternate;");
        console.log("Efecto 'scale' aplicado.");
        break;
      default:
        console.warn(`Efecto desconocido: ${effect}`);
    }
  });

  // Log para asegurar que el audio se reproduce después de una interacción explícita
  document.addEventListener("click", () => {
    if (audio.components && audio.components.sound) {
      audio.components.sound.playSound();
      console.log(`Audio ${audioId} activado por interacción.`);
    }
  }, { once: true });
});

// Logs generales para todos los marcadores
document.querySelectorAll("a-nft").forEach(marker => {
  marker.addEventListener("markerFound", () => {
    console.log(`Marcador detectado globalmente: ${marker.getAttribute('url')}`);
  });

  marker.addEventListener("markerLost", () => {
    console.log(`Marcador perdido globalmente: ${marker.getAttribute('url')}`);
  });
});

