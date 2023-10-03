document.addEventListener("DOMContentLoaded", function () {
    // Obtener el título del libro de la URL
    const urlParams = new URLSearchParams(window.location.search);
    const bookTitle = urlParams.get("title");
  
    // Encontrar el libro correspondiente en el array de libros
    const jsonUrl = "books.json";
    fetch(jsonUrl)
      .then((response) => response.json())
      .then((data) => {
        const book = data.find((book) => book.titulo === bookTitle);
        if (book) {
          showBookDetails(book);
        } else {
          // Si no se encuentra el libro, mostrar un mensaje de error
          const errorContainer = document.getElementById("error-container");
          errorContainer.textContent = "Libro no encontrado";
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
                <p class="card-text2">Tan Solo: $ ${book.precio}</p>
                <p class="card-text">Stock Disponible: ${book.stock} Unidades</p>
                
                <button id="comprarButton" class="comprar-button"><a href="../../carrito.html">Comprar</a></button>

              </div>
            </div>
          </div>
        </div>
      `;
  
      bookContainer.innerHTML = bookContent;
    }
  });
  