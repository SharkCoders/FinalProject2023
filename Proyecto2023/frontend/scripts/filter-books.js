document.addEventListener('DOMContentLoaded', function () {
  // Variables
  const categoryButtons = document.getElementById('category-buttons'); 

  // Cargar los datos desde el archivo JSON local
  const jsonUrl = 'books.json';
  fetch(jsonUrl)
    .then(response => response.json())
    .then(data => {
      allBooks = data;

      // Crear botones de categoría
      const categories = [...new Set(allBooks.map(book => book.categoria))]; 
      categories.forEach(category => {
        const button = document.createElement('button');
        button.textContent = category;
        button.classList.add('category-button');
        button.addEventListener('click', () => {
          const filteredBooks = allBooks.filter(book => book.categoria === category);
          showBooks(filteredBooks);
        });
        categoryButtons.appendChild(button); // Agregar el botón al div existente
      });
    })
    .catch(error => console.error(error));

});

 // Función para mostrar libros
  function showBooks(books) {
    const cardContainer = document.getElementById('cardContainer');
    cardContainer.innerHTML = ''; // Limpiar resultados anteriores
    books.forEach(book => {
      const card = createCard(book);
      cardContainer.appendChild(card);
    });
  }

  // Función para crear una tarjeta de libro 
  function createCard(bookInfo) {
    const card = document.createElement('div');
    card.classList.add('product-card');

    const cardContent = `
      <div class="card text-bg-secondary mb-1" style="max-width: 700px;">
        <div class="row g-0">
          <div class="col-md-4">
            <img src="${bookInfo.portada}" alt="${bookInfo.titulo}" class="card-img-top">
          </div>
          <div class="col-md-6">
            <div class="card-body">
              <p id="title"><br>Título: ${bookInfo.titulo}</p>
              <p>Autor: ${bookInfo.autor || "Desconocido"}</p>
              <p>Categoría: ${bookInfo.categoria || "Desconocida"}</p>
              <p>Precio: $ ${bookInfo.precio}</p>
              <p>Stock: ${bookInfo.stock}</p>
              <a href="../../carrito.html" class="btn btn-dark">Comprar</a>
              <a href="../../descripcion.html?title=${encodeURIComponent(bookInfo.titulo)}" class="btn btn-light">Resumen</a>
            </div>
          </div>
        </div>
      </div>
    `;

    card.innerHTML = cardContent;
    return card;
  }

const clearFiltersButton = document.getElementById("clear-filters");
clearFiltersButton.addEventListener("click", function () {
  // Limpiar el campo de búsqueda
  searchInput.value = "";
  // Mostrar todos los libros nuevamente
  showBooks(allBooks);
});

//Lista de filtros select para versión movil
document.addEventListener("DOMContentLoaded", function () {
  const filterSelect = document.getElementById("filter-select");

  // Cargar los datos desde el archivo JSON local
  const jsonUrl = "books.json";
  fetch(jsonUrl)
    .then(response => response.json())
    .then(data => {
      allBooks = data;

      // Obtener categorías únicas de los libros
      const categories = [...new Set(allBooks.map(book => book.categoria))];

      // Agregar un valor por defecto "Seleccionar categoría" al inicio del <select>
      const defaultOption = document.createElement("option");
      defaultOption.value = "all"; // Puedes establecer el valor como "all" o cualquier otro valor adecuado.
      defaultOption.textContent = "Seleccionar categoría";
      filterSelect.appendChild(defaultOption);
      
      // Llenar el <select> con las categorías
      categories.forEach(category => {
        const option = document.createElement("option");
        option.value = category;
        option.textContent = category;
        filterSelect.appendChild(option);
      });

      // Añadir un evento de cambio al <select> para filtrar libros
      filterSelect.addEventListener("change", function () {
        const selectedCategory = filterSelect.value;
        if (selectedCategory === "all") {
          showBooks(allBooks);
        } else {
          const filteredBooks = allBooks.filter(book => book.categoria === selectedCategory);
          showBooks(filteredBooks);
        }
      });
    })
    .catch(error => console.error(error));
});
