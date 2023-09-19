document.addEventListener("DOMContentLoaded", function () {
    const cardContainer = document.getElementById("cardContainer");
    const categoriaSelect = document.getElementById("categoria-select");
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
  
    // Función para crear una tarjeta de libro (la misma que tenías)
    function createCard(bookInfo) {
      const card = document.createElement("div");
      card.classList.add("product-card");
  
      const cardContent = `
        <div class="product-image">
        <img src="${bookInfo.imageLinks && bookInfo.imageLinks.thumbnail ? bookInfo.imageLinks.thumbnail : 'https://acortar.link/41loAe'}" alt="${bookInfo.title}" class="card-img-top" width="80px">
        <div class="description">
            <p><b>${bookInfo.description || "Sin descripción disponible"}<b></p>
        </div>
        </div>
        <h2 id="title"><br>Título: ${bookInfo.title}</h2>
        <p><br>Autor: ${bookInfo.authors ? bookInfo.authors.join(", ") : "Desconocido"}</p>
        <p><br>Categoría: ${bookInfo.categories ? bookInfo.categories.join(", ") : "Desconocida"}</p>
        <a href="#" class="btn-buy">Comprar</a>`;
  
      card.innerHTML = cardContent;
      return card;
    }
  
    // Cargar todos los libros al inicio
    loadBooks();
  });
  