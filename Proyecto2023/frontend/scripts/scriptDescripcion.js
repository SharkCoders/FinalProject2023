document.addEventListener("DOMContentLoaded", function () {
  // Obtener el título del libro de la URL
  const urlParams = new URLSearchParams(window.location.search);
  const bookTitle = urlParams.get("title");

  // Encontrar el libro correspondiente en el array de libros
  const json = "books.json";
  fetch(json)
    .then(response => {
      return response.json()})
    .then(data => {
      const book = data.find((book) => book.titulo === bookTitle);
      if (book) {
        showBookDetails(book);
      } 
    })
    .catch((error) => console.error(error));

  // Función para mostrar los detalles del libro
  function showBookDetails(book) {
    const bookContainer = document.getElementById("book-container");

    const bookContent = `
      <div class="mb-3" style="max-width: 760px;">
        <div class="row g-0">
          
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="title">${book.titulo}</h5>
              <p class="card-text">Autor: ${book.autor || "Desconocido"}</p>
              <p class="card-text">Categoría: ${book.categoria || "Desconocida"}</p>
              <p class="animado">Sinopsis: ${book.descripcion}</p>
              <p class="card-text2">Precio: $ ${book.precio}</p>
              <p class="card-text">Stock Disponible: ${book.stock} Unidades</p>
              <a class="btn btn-dark" href="Productos.html">Volver</a>
            </div>
          </div>
        </div>
      </div>
    `;

    bookContainer.innerHTML = bookContent;
  }
});
