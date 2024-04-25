const fraseContainer = document.querySelector('.frase-container');

// Array de frases definido en el propio código
const frases = [
    "El misterio de la vida no es un problema a resolver, sino una realidad a experimentar - Duna, Frank Herbert",
    "Estar solo no tiene nada que ver con cuantas personas hay alrededor - Revolutionary Road, Richard Yates",
    "El hombre débil se vuelve fuerte cuando no tiene nada, porque sólo entonces puede sentir la locura de la desesperación - La compañía blanca, Arthur Conan Doyle",
    "Si buscas la perfección nunca estarás contento - Anna Karenina, Leon Tolstoy",
    "Mientras el corazón late, mientras el cuerpo y alma siguen juntos, no puedo admitir que cualquier criatura dotada de voluntad tiene necesidad de perder la esperanza en la vida - Viaje al centro de la tierra, Julio Verne",
    "Tengo esperanza o podría no vivir - La isla del doctor Moreau, H.G. Wells",
    "Llamo a la gente “rica” cuando son capaces de satisfacer las necesidades de su imaginación - El retrato de una dama, Henry James",
    "Luchar hasta el último aliento - Enrique VI, William Shakespeare",
  // Pueden agregar las frases que quieran o crean necesarias
];

// Variable para llevar el control de la frase actual
let fraseActualIndex = 0;

// Función para mostrar la siguiente frase en el carrusel con un efecto de desvanecimiento
function mostrarSiguienteFrase() {
    if (fraseActualIndex < frases.length) {
        fraseContainer.style.opacity = 0;
        setTimeout(() => {
            fraseContainer.textContent = frases[fraseActualIndex];
            fraseActualIndex++;
            // Después de establecer el contenido de la nueva frase, desvanécela de nuevo
            setTimeout(() => {
                fraseContainer.style.opacity = 1;
            }, 900); // 900 milisegundos (1 segundo) para que aparezca gradualmente
        }, 900); // 900 milisegundos (1 segundo) para que se desvanezca gradualmente
    } else {
        // Reiniciar desde la primera frase
        fraseActualIndex = 0;
        fraseContainer.style.opacity = 0;
        setTimeout(() => {
            fraseContainer.textContent = frases[fraseActualIndex];
            fraseActualIndex++;
            // Después de establecer el contenido de la nueva frase, desvanécela de nuevo
            setTimeout(() => {
                fraseContainer.style.opacity = 1;
            }, 900); // 900 milisegundos para que aparezca gradualmente
        }, 900); // 900 milisegundos para que se desvanezca gradualmente
    }
}

// Función para iniciar el carrusel
function iniciarCarrusel() {
    mostrarSiguienteFrase();
    setInterval(mostrarSiguienteFrase, 10000); // Cambia la frase cada 10 segundos (10000 milisegundos)
}

// Iniciar el carrusel
iniciarCarrusel();
