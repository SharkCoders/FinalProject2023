document.addEventListener("DOMContentLoaded", function () {
  const cardContainer = document.getElementById("cardContainer");
  const searchForm = document.getElementById("search-form");
  const searchInput = document.getElementById("search-input");
  let allBooks = [];

  // Define las URLs que deseas consultar
  const bookUrls = [
    "https://www.googleapis.com/books/v1/volumes?q=subject:*",
    "https://www.googleapis.com/books/v1/volumes?q=id:*",
  ];

  // Función para cargar todos los libros al inicio
  function loadBooks() {
    // Realiza las solicitudes fetch y almacena las promesas en un array
    const fetchPromises = bookUrls.map(url => fetch(url).then(response => response.json()));

    // Espera a que todas las promesas se resuelvan
    Promise.all(fetchPromises)
      .then(dataArray => {
        // Concatena los resultados de todas las solicitudes en un solo array
        allBooks = dataArray.flatMap(data => data.items || []);

        // Muestra todos los libros al inicio
        showBooks(allBooks);
        console.log("Libros cargados:", allBooks);
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
      <div class="card text-bg-secondary mb-3" style="max-width: 600px;">
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
});
