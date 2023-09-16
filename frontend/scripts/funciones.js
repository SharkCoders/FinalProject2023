document.addEventListener("DOMContentLoaded", function () {
  const cardContainer = document.getElementById("cardContainer");

  // Llamar a la API de Google Books
  fetch("https://www.googleapis.com/books/v1/volumes?q=kids")
      .then(response => response.json())
      .then(data => {
          // Obtener los datos de libros de la respuesta
          const books = data.items;

          // Generar tarjetas para cada libro
          books.forEach(book => {
              const card = createCard(book.volumeInfo);
              cardContainer.appendChild(card);
          });
      })
      .catch(error => console.error(error));

// Llamar a la API de Google Books
fetch("https://www.googleapis.com/books/v1/volumes?q=fiction")
.then(response => response.json())
.then(data => {
    // Obtener los datos de libros de la respuesta
    const books = data.items;

    // Generar tarjetas para cada libro
    books.forEach(book => {
        const card = createCard(book.volumeInfo);
        cardContainer.appendChild(card);
    });
})
.catch(error => console.error(error));

// Llamar a la API de Google Books
fetch("https://www.googleapis.com/books/v1/volumes?q=religion")
.then(response => response.json())
.then(data => {
    // Obtener los datos de libros de la respuesta
    const books = data.items;

    // Generar tarjetas para cada libro
    books.forEach(book => {
        const card = createCard(book.volumeInfo);
        cardContainer.appendChild(card);
    });
})
.catch(error => console.error(error));

// Llamar a la API de Google Books
fetch("https://www.googleapis.com/books/v1/volumes?q=philosophy")
.then(response => response.json())
.then(data => {
    // Obtener los datos de libros de la respuesta
    const books = data.items;

    // Generar tarjetas para cada libro
    books.forEach(book => {
        const card = createCard(book.volumeInfo);
        cardContainer.appendChild(card);
    });
})
.catch(error => console.error(error));

// Llamar a la API de Google Books
fetch("https://www.googleapis.com/books/v1/volumes?q=programming")
.then(response => response.json())
.then(data => {
    // Obtener los datos de libros de la respuesta
    const books = data.items;

    // Generar tarjetas para cada libro
    books.forEach(book => {
        const card = createCard(book.volumeInfo);
        cardContainer.appendChild(card);
    });
})
.catch(error => console.error(error));

// Llamar a la API de Google Books
fetch("https://www.googleapis.com/books/v1/volumes?q=kitchen")
.then(response => response.json())
.then(data => {
    // Obtener los datos de libros de la respuesta
    const books = data.items;

    // Generar tarjetas para cada libro
    books.forEach(book => {
        const card = createCard(book.volumeInfo);
        cardContainer.appendChild(card);
    });
})
.catch(error => console.error(error));

// Llamar a la API de Google Books
fetch("https://www.googleapis.com/books/v1/volumes?q=romance")
.then(response => response.json())
.then(data => {
    // Obtener los datos de libros de la respuesta
    const books = data.items;

    // Generar tarjetas para cada libro
    books.forEach(book => {
        const card = createCard(book.volumeInfo);
        cardContainer.appendChild(card);
    });
})
.catch(error => console.error(error));


  // Función para crear una tarjeta de libro
  function createCard(bookInfo) {
      const card = document.createElement("div");
      card.classList.add("product-card");

      const cardContent = `
        <div class="product-image">
            <img src="${bookInfo.imageLinks.thumbnail}" alt="${bookInfo.title}" class="card-img-top">
        <div class="description">
            <p><b>${bookInfo.description || "Sin descripción disponible"}<b></p>
        </div>
        </div>
    <h2>L${bookInfo.title}</h2>
    <p><br>${bookInfo.authors ? bookInfo.authors.join(", ") : "Autor desconocido"}</p>
    <a href="#" class="btn-buy">Comprar</a>`
        ;

      card.innerHTML = cardContent;
      return card;
  }
});