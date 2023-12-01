// script.js para generar un carrusel de imagenes de gatitos tiernos

$(document).ready(function () {
    // Abrir la ventana modal al hacer clic en la imagen
    $(".cat-image").click(function () {
      $(".modal").fadeIn();
    });
  
    // Cerrar la ventana modal al hacer clic en el botón de cerrar
    $(".close-modal").click(function () {
      $(".modal").fadeOut();
    });
  
    // Cerrar la ventana modal al hacer clic fuera de ella
    $(window).click(function (e) {
      if ($(e.target).hasClass("modal")) {
        $(".modal").fadeOut();
      }
    });
  });


  // script para Preservacion

// Función para abrir enlaces en una nueva ventana
function openLink(url) {
    window.open(url, '_blank');
}

  