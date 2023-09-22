document.addEventListener("DOMContentLoaded", function () {
  const cardContainer = document.getElementById("cardContainer");
  const searchForm = document.getElementById("search-form");
  const searchInput = document.getElementById("search-input");
  let allBooks = [];

  // Función para cargar todos los libros al inicio
  function loadBooks() {
    fetch("https://www.googleapis.com/books/v1/volumes?q=*")
      .then(response => response.json())
      .then(data => {
        allBooks = data.items; // Almacenar todos los libros
        console.log("Libros cargados:", allBooks); // Agregar este log
        showBooks(allBooks); // Mostrar todos los libros al inicio
      })
      .catch(error => console.error(error));
  }

  // Función para mostrar libros según la categoría seleccionada
  function showBooks(books) {
    cardContainer.innerHTML = ""; // Limpiar resultados anteriores
    books.forEach(book => {
      const card = createCard(book.volumeInfo);
      cardContainer.appendChild(card);
    });
    console.log("Libros mostrados:", books); // Agregar este log
  }

  // Manejar la búsqueda cuando se envía el formulario
  searchForm.addEventListener("submit", function (e) {
    e.preventDefault(); // Evitar el envío del formulario
    const searchTerm = searchInput.value.trim().toLowerCase();

    if (searchTerm === "") {
      // Si no se ingresa un término de búsqueda, mostrar todos los libros
      showBooks(allBooks);
    } else {
      // Filtrar libros por nombre de libro
      const filteredBooks = allBooks.filter(book => {
        const title = book.volumeInfo.title.toLowerCase();
        return title.includes(searchTerm);
      });
      showBooks(filteredBooks);
    }
  });

  // Función para crear una tarjeta de libro
  function createCard(bookInfo) {
    const card = document.createElement("div");
    card.classList.add("product-card");

    const cardContent = `
      <div class="card text-bg-secondary mb-3" ;">
        <div class="row g-0">
          <div class="col-md-4">
            <img src="${bookInfo.imageLinks && bookInfo.imageLinks.thumbnail ? bookInfo.imageLinks.thumbnail : 'https://acortar.link/41loAe'}" 
              alt="${bookInfo.title}" class="card-img-top">
          </div>
          <div class="col-md-8">      
            <div class="card-body">
              <p id="title"><br>Título: ${bookInfo.title}</p>
              <p>Autor: ${bookInfo.authors ? bookInfo.authors.join(", ") : "Desconocido"}</p>
              <p>Categoría: ${bookInfo.categories ? bookInfo.categories.join(", ") : "Desconocida"}</p>
              <a href="../../carrito.html" class="btn btn-dark">Comprar</a>
              <a href="../../descripcion.html?title=${encodeURIComponent(bookInfo.title)}" class="btn btn-light">Resumen</a>
            </div>
          </div>
        </div>
      </div>
    `;

    card.innerHTML = cardContent;
    return card;
  }

  // Cargar todos los libros al inicio
  loadBooks();

  // Obtener el elemento "bookCardDescription" después de cargar todos los libros
  const bookCardDescription = document.getElementById("bookCardDescription");

  // Obtener el título del libro de la URL
  const urlParams = new URLSearchParams(window.location.search);
  const bookTitle = urlParams.get("title");

  // Buscar el libro por título en la lista allBooks
  const selectedBook = allBooks.find(book => book.volumeInfo.title === bookTitle);

  // Crear la tarjeta dinámica si se encontró el libro
  if (selectedBook) {
    const card = createDynamicCard(selectedBook.volumeInfo);
    bookCardDescription.appendChild(card);
  } else {
    // Mostrar un mensaje si el libro no se encuentra
    bookCardDescription.innerHTML = "<p>Libro no encontrado</p>";
  }

  // Función para crear una tarjeta de libro dinámica
  function createDynamicCard(bookInfo) {
    const card = document.createElement("div");
    card.classList.add("card");

    const cardDescription = `
      <div class="card-header">
        ${bookInfo.title}
      </div>
      <div class="card-body">
        <p class="card-text">${bookInfo.description || "Descripción no disponible"}</p>
        <a href="../../carrito.html" class="btn btn-primary">Comprar</a>
      </div>
      <div class="card-footer text-muted">
        Autor: ${bookInfo.authors ? bookInfo.authors.join(", ") : "Desconocido"}
      </div>
    `;

    card.innerHTML = cardDescription;
    return card;
  }
});
