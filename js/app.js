const cuadros = [
  { markerId: "marcador0", videoId: "videoTexture-marcador0", modelId: "model-marcador0", audioId: "audio-marcador0", effect: "float" }
];

cuadros.forEach(({ markerId, videoId, modelId, audioId, effect }) => {
  const marker = document.querySelector(`a-nft[url*="${markerId}"]`);
  const video = document.getElementById(videoId);
  const model = document.getElementById(modelId);
  const audio = document.getElementById(audioId);

  let markerVisible = false;

  console.log(`Configurando marcador: ${markerId}`);

  marker.addEventListener("markerFound", () => {
    console.log(`Marcador detectado: ${markerId}`);
    markerVisible = true;

    video.play().then(() => {
      console.log(`Video ${videoId} reproduciéndose.`);
    }).catch(err => {
      console.error(`Error al reproducir el video ${videoId}:`, err);
    });
  });

  marker.addEventListener("markerLost", () => {
    console.log(`Marcador perdido: ${markerId}`);
    markerVisible = false;

    video.pause();
    video.currentTime = 0;
    console.log(`Video ${videoId} pausado y reiniciado.`);
    
    model.setAttribute("visible", "false");
    if (audio.components && audio.components.sound) {
      audio.components.sound.stopSound();
      console.log(`Audio ${audioId} detenido.`);
    }
  });

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

  model.addEventListener("click", () => {
    console.log(`Modelo interactuado: ${modelId}`);
    switch (effect) {
      case "float":
        model.setAttribute("animation", "property: position; to: 0 1.2 -2; dur: 1000; dir: alternate;");
        console.log("Efecto 'float' aplicado.");
        break;
      case "scale":
        model.setAttribute("animation", "property: scale; to: 1.5 1.5 1.5; dur: 500; dir: alternate;");
        console.log("Efecto 'scale' aplicado.");
        break;
      default:
        console.warn(`Efecto desconocido: ${effect}`);
    }
  });
});


