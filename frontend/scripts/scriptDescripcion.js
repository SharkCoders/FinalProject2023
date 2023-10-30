document.addEventListener("DOMContentLoaded", function () {
  // Get the book title from the URL
  const urlParams = new URLSearchParams(window.location.search);
  const bookTitle = urlParams.get("title");

  // Fetch the book data from the JSON file
  const json = "books.json";
  fetch(json)
    .then(response => response.json())
    .then(data => {
      // Find the corresponding book in the array of books
      const book = data.find((book) => book.titulo === bookTitle);

      // If the book is found, show the book details
      if (book) {
        showBookDetails(book);
      } else {
        // If the book is not found, show an error message
        const errorContainer = document.getElementById("error-container");
        errorContainer.textContent = "Book not found";
      }
    })
    .catch((error) => console.error(error));

  // Function to show the book details
  async function showBookDetails(book) {
    const bookContainer = document.getElementById("book-container");

    // Get the book description from the server
    const descriptionUrl = `https://sharkcoders.github.io/descripcion.html?title=${encodeURIComponent(book.titulo)}`;
    const descriptionResponse = await fetch(descriptionUrl);
    const description = await descriptionResponse.text();

    // Add the book description to the book details
    book.descripcion = description;

    // Render the book details
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
              <button id="comprarButton" class="comprar-button"><a href="/Productos.html">Volver</a></button>
            </div>
          </div>
        </div>
      </div>
    `;

    bookContainer.innerHTML = bookContent;
  }
});
