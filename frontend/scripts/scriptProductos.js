document.addEventListener("DOMContentLoaded", function () {
  const cardContainer = document.getElementById("cardContainer");
  const searchForm = document.getElementById("search-form");
  const searchInput = document.getElementById("search-input");


  // Cargar los datos desde el archivo JSON local
  const json = "books.json";
  console.log("Solicitando JSON desde:", json);
  fetch(json)
    .then(response => {
      return response.json()})
    .then(data => {
      allBooks = data;
      showBooks(allBooks);
    })
    .catch(error => console.error(error));

  // Función para mostrar los libros en la página
  function showBooks(books) {
    cardContainer.innerHTML = "";
    books.forEach(book => {
      const card = createCard(book);
      cardContainer.appendChild(card);
    });
  }

  // Manejar la búsqueda cuando se envía el formulario
  searchForm.addEventListener("submit", function (e) {
    e.preventDefault(); // Evitar el envío del formulario
    const searchTerm = searchInput.value.trim().toLowerCase();

    if (searchTerm === "") {
      // Si no se ingresa un término de búsqueda, mostrar todos los libros
      showBooks(allBooks);
    } else {
      // Filtrar libros por título
      const filteredBooks = allBooks.filter(book => {
        const titulo = book.titulo.toLowerCase();
        return titulo.includes(searchTerm);
      });

      if (filteredBooks.length === 0) {
        // Mostrar un mensaje si no se encontraron libros
        cardContainer.innerHTML = "<p>No se encontraron libros con esas palabras de búsqueda.</p>";
      } else {
        //Mostrar los libros filtrados
        showBooks(filteredBooks);
      }
    }
  });

  // Agregar un evento para escuchar cambios en el campo de búsqueda
  searchInput.addEventListener("input", function () {
    const searchTerm = searchInput.value.trim().toLowerCase();

    if (searchTerm === "") {
      // Si el campo de búsqueda está vacío, mostrar todos los libros
      showBooks(allBooks);
    }
  });

  // Función para mostrar libros
  function showBooks(books) {
    cardContainer.innerHTML = ""; // Limpiar resultados anteriores
    books.forEach(book => {
      const card = createCard(book);
      cardContainer.appendChild(card);
    });
  }

  // Función para crear una tarjeta de libro
  function createCard(bookInfo) {
    const card = document.createElement("div");
    card.classList.add("product-card");

    const cardContent = `
    <div class="card text-bg-secondary mb-1" style="max-width: 700px;">
  <div class="d-flex align-items-center">
    <div class="col-4">
      <img src="${bookInfo.portada}" alt="${bookInfo.titulo}" class="card-img-top">
    </div>
    <div class="col-8">
      <div class="card-body">
        <p id="title"><br>Título: ${bookInfo.titulo}</p>
        <p>Autor: ${bookInfo.autor || "Desconocido"}</p>
        <p>Categoría: ${bookInfo.categoria || "Desconocida"}</p>
        <p>Precio: $ ${bookInfo.precio}</p>
        <p class="stock">Stock: ${bookInfo.stock}</p>
        <button class="btn btn-dark" onclick="agregarAlCarrito('${bookInfo.titulo}')">Comprar</button>
        <a href="Descripcion.html?title=${encodeURIComponent(bookInfo.titulo)}" class="btn btn-light">Resumen</a>
      </div>
    </div>
  </div>
</div>

    `;

    card.innerHTML = cardContent;
    card.setAttribute("data-title", bookInfo.titulo);
    return card;
  }
});

window.addEventListener('scroll', function () {
  var button = document.querySelector('.ir-arriba');
  if (window.scrollY > 200) {
    button.style.display = 'block';
  } else {
    button.style.display = 'none';
  }
});

// Función para desplazarse hacia arriba cuando se hace clic en el botón
function goBackToTop() {
  // Desplázate suavemente hacia la parte superior de la página
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

// Agrega un evento de escucha al botón "go back to the top"
document.querySelector('.ir-arriba').addEventListener('click', goBackToTop);


//carrito de compras
const carrito = document.getElementById("carrito-lista");
const carritoTotal = document.getElementById("carrito-total");
const carritoItems = [];

// Función para agregar un libro al carrito
function agregarAlCarrito(bookTitle) {
  const book = allBooks.find(book => book.titulo === bookTitle);

  if (book) {
    if (book.stock > 0) {
      // Verifica si hay stock disponible
      carritoItems.push(book);
      book.stock--; // Reduce el stock disponible
      actualizarCarrito();
      actualizarStockEnTarjeta(book); // Actualiza el stock en la tarjeta
    } else {
      alert("No hay stock disponible para este producto.");
    }
  }
}

// Función para actualizar el stock en la tarjeta de producto
function actualizarStockEnTarjeta(book) {
  const card = document.querySelector(`[data-title="${book.titulo}"]`); // Encuentra la tarjeta de producto por título
  if (card) {
    const stockElement = card.querySelector(".stock"); // Encuentra el elemento del stock en la tarjeta
    stockElement.textContent = `Stock: ${book.stock}`;
  }
}

function actualizarCarrito() {
  carrito.innerHTML = ""; // Limpiar el carrito
  let total = 0;

  carritoItems.forEach(book => {
    const listItem = document.createElement("li");
    listItem.textContent = book.titulo;

    const eliminarButton = document.createElement("button");
    eliminarButton.type = "button";
    eliminarButton.classList.add("btn", "btn-outline-danger");
    eliminarButton.textContent = "X";
    eliminarButton.addEventListener("click", () => eliminarDelCarrito(book.titulo));

    listItem.appendChild(eliminarButton);

    carrito.appendChild(listItem);
    total += book.precio;
  });

  carritoTotal.textContent = total.toFixed(2);
}

// Función para eliminar un libro del carrito
function eliminarDelCarrito(bookTitle) {
  const book = allBooks.find(book => book.titulo === bookTitle);

  if (book) {
    carritoItems.splice(carritoItems.indexOf(book), 1); // Elimina el libro del carrito
    book.stock++; // Aumenta el stock disponible
    actualizarCarrito();
    actualizarStockEnTarjeta(book); // Actualiza el stock en la tarjeta
  }
}