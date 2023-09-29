document.addEventListener("DOMContentLoaded", function () {
  const cardContainer = document.getElementById("cardContainer");
  const searchForm = document.getElementById("search-form");
  const searchInput = document.getElementById("search-input");
  let allBooks = [];

  // Cargar los datos desde el archivo JSON local
  const jsonUrl = "books.json";
  console.log("Solicitando JSON desde:", jsonUrl);
  fetch(jsonUrl)
      .then(response => response.json())
      .then(data => {
          allBooks = data;
          showBooks(allBooks);
      })
      .catch(error => console.error(error));

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
              const title = book.title.toLowerCase();
              return title.includes(searchTerm);
          });
          showBooks(filteredBooks);
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
          <div class="card text-bg-secondary mb-3" style="max-width: 600px;">
              <div class="row g-0">
                  <div class="col-md-4">
                      <img src="${bookInfo.portada}" alt="${bookInfo.titulo}" class="card-img-top">
                  </div>
                  <div class="col-md-8">
                      <div class="card-body">
                          <p id="title"><br>Título: ${bookInfo.titulo}</p>
                          <p>Autor: ${bookInfo.autor || "Desconocido"}</p>
                          <p>Categoría: ${bookInfo.categoria || "Desconocida"}</p>
                          <p>Precio: $ ${bookInfo.precio}</p>
                          <p>Stock: ${bookInfo.stock}</p>
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
});
