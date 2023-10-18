const fraseContainer = document.querySelector('.frase-container');

// Array de frases desde el archivo json
const frases = [];

// Variable para llevar el control de la frase actual
let fraseActualIndex = 0;

// Función para cargar frases desde un archivo json
const frasesJson = "frases.json";
console.log("Solicitando JSON desde:", frasesJson);
function cargarFrasesDesdeArchivo() {
    fetch('./frases.json') // ruta a tu archivo json (dos archivos: .\frases.json para desarrollo local, .\scripts\frases.json para deploy github pages)
        .then(response => response.json())
        .then(data => {
            data.forEach(item => {
                frases.push(item.frase);
            });

            // Iniciar el carrusel
            iniciarCarrusel();
        })
        .catch(error => console.error('Error al cargar las frases:', error));
}

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
    setInterval(mostrarSiguienteFrase, 10000); // Cambia la frase cada 7 segundos (7000 milisegundos)
}

cargarFrasesDesdeArchivo();