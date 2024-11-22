// app.js

// Este script gestiona los videos, modelos 3D, audios y la interacción con los marcadores.

document.addEventListener("DOMContentLoaded", function () {
  // Configuración para los 15 cuadros: incluye IDs, efectos personalizados y audio asociado
  const cuadros = [
    { markerId: "trex", videoId: "videoTexture-trex", modelId: "trex", audioId: "audio-trex", effect: "float" },
    { markerId: "marker0", videoId: "videoTexture0", modelId: "model0", audioId: "audio0", effect: "float" },
    { markerId: "marker1", videoId: "videoTexture1", modelId: "model1", audioId: "audio1", effect: "scale" },
    { markerId: "marker2", videoId: "videoTexture2", modelId: "model2", audioId: "audio2", effect: "bounce" },
    { markerId: "marker3", videoId: "videoTexture3", modelId: "model3", audioId: "audio3", effect: "spin" },
    { markerId: "marker4", videoId: "videoTexture4", modelId: "model4", audioId: "audio4", effect: "pulse" },
    { markerId: "marker5", videoId: "videoTexture5", modelId: "model5", audioId: "audio5", effect: "shake" },
    { markerId: "marker6", videoId: "videoTexture6", modelId: "model6", audioId: "audio6", effect: "flash" },
    { markerId: "marker7", videoId: "videoTexture7", modelId: "model7", audioId: "audio7", effect: "float" },
    { markerId: "marker8", videoId: "videoTexture8", modelId: "model8", audioId: "audio8", effect: "twist" },
    { markerId: "marker9", videoId: "videoTexture9", modelId: "model9", audioId: "audio9", effect: "grow_shrink" },
    { markerId: "marker10", videoId: "videoTexture10", modelId: "model10", audioId: "audio10", effect: "orbit" },
    { markerId: "marker11", videoId: "videoTexture11", modelId: "model11", audioId: "audio11", effect: "glow" },
    { markerId: "marker12", videoId: "videoTexture12", modelId: "model12", audioId: "audio12", effect: "zigzag" },
    { markerId: "marker13", videoId: "videoTexture13", modelId: "model13", audioId: "audio13", effect: "tilt" },
    { markerId: "marker14", videoId: "videoTexture14", modelId: "model14", audioId: "audio14", effect: "stretch" },
    { markerId: "marker15", videoId: "videoTexture15", modelId: "model15", audioId: "audio15", effect: "flip" },
  ];

  // Itera sobre cada cuadro para configurar eventos y comportamientos
  cuadros.forEach(({ markerId, videoId, modelId, audioId, effect }) => {
    // Referencias a los elementos del DOM
    const marker = document.getElementById(markerId);
    const video = document.getElementById(videoId);
    const model = document.getElementById(modelId);
    const audio = document.getElementById(audioId);

    let markerVisible = false; // Variable para controlar la visibilidad del marcador

    // Evento: cuando el marcador es detectado
    marker.addEventListener("markerFound", () => {
      markerVisible = true;
      video.play(); // Reproduce el video
    });

    // Evento: cuando el marcador es perdido
    marker.addEventListener("markerLost", () => {
      markerVisible = false;
      video.pause(); // Pausa el video
      video.currentTime = 0; // Reinicia el video al principio
      model.setAttribute("visible", "false"); // Oculta el modelo 3D
      audio.components.sound.stopSound(); // Detiene el audio si estaba reproduciéndose
    });

    // Evento: cuando el video termina
    video.addEventListener("ended", () => {
      if (markerVisible) {
        model.setAttribute("visible", "true"); // Muestra el modelo 3D
        audio.components.sound.playSound(); // Reproduce el audio
      }
    });

    // Interacción: cuando el usuario toca el modelo 3D
    model.addEventListener("click", () => {
      switch (effect) {
        case "scale":
          model.setAttribute("animation__scale", {
            property: "scale",
            to: "0.7 0.7 0.7",
            dur: 200,
            dir: "alternate",
            loop: false,
          });
          break;

        case "bounce":
          model.setAttribute("animation__bounce", {
            property: "position",
            to: "0 1.2 0",
            dur: 200,
            dir: "alternate",
            loop: false,
          });
          break;

        case "spin":
          model.setAttribute("animation__spin", {
            property: "rotation",
            to: "360 360 360",
            dur: 1000,
            loop: false,
          });
          break;

        case "pulse":
          model.setAttribute("animation__pulse", {
            property: "scale",
            to: "0.6 0.6 0.6",
            dur: 300,
            dir: "alternate",
            loop: false,
          });
          break;

        case "shake":
          model.setAttribute("animation__shake", {
            property: "position",
            to: "0.2 0 0",
            dur: 100,
            dir: "alternate",
            loop: 5,
          });
          break;

        case "flash":
          model.setAttribute("animation__flash", {
            property: "material.color",
            to: "#00FF00",
            dur: 200,
            dir: "alternate",
            loop: 3,
          });
          break;

        case "float":
          model.setAttribute("animation__float", {
            property: "position",
            to: "0 1.1 0",
            dur: 1000,
            dir: "alternate",
            loop: false,
          });
          break;

        case "twist":
          model.setAttribute("animation__twist", {
            property: "rotation",
            to: "15 360 0",
            dur: 800,
            loop: false,
          });
          break;

        case "grow_shrink":
          model.setAttribute("animation__grow_shrink", {
            property: "scale",
            to: "1.5 1.5 1.5",
            dur: 400,
            dir: "alternate",
            loop: false,
          });
          break;

        case "orbit":
          model.setAttribute("animation__orbit", {
            property: "position",
            to: "0.5 0 0.5",
            dur: 1000,
            dir: "alternate",
            loop: false,
          });
          break;

        case "glow":
          model.setAttribute("animation__glow", {
            property: "material.opacity",
            to: "0.8",
            dur: 300,
            dir: "alternate",
            loop: 3,
          });
          break;

        case "zigzag":
          model.setAttribute("animation__zigzag", {
            property: "position",
            to: "0.5 0 0",
            dur: 300,
            dir: "alternate",
            loop: 3,
          });
          break;

        case "tilt":
          model.setAttribute("animation__tilt", {
            property: "rotation",
            to: "15 15 0",
            dur: 500,
            loop: false,
          });
          break;

        case "stretch":
          model.setAttribute("animation__stretch", {
            property: "scale",
            to: "1.2 0.5 1.2",
            dur: 300,
            dir: "alternate",
            loop: false,
          });
          break;

        case "flip":
          model.setAttribute("animation__flip", {
            property: "rotation",
            to: "180 0 0",
            dur: 500,
            loop: false,
          });
          break;

        default:
          console.warn(`Efecto desconocido: ${effect}`);
          break;
      }
    });
  });
});
