document.addEventListener('DOMContentLoaded', function () {
  // Variables
  const categoryButtons = document.getElementById('category-buttons'); 

  // Cargar los datos desde el archivo JSON local
  const jsonUrl = 'books.json';
  console.log('Solicitando JSON desde:', jsonUrl);
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

  // Función para mostrar libros queda igual si mal no recuerdo
  function showBooks(books) {
    const cardContainer = document.getElementById('cardContainer');
    cardContainer.innerHTML = ''; // Limpiar resultados anteriores
    books.forEach(book => {
      const card = createCard(book);
      cardContainer.appendChild(card);
    });
  }

  // Función para crear una tarjeta de libro esta la modifiqué, porque con tu código declarado, creaba una tarjeta nueva sobre la anterior
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
});
