document.addEventListener('DOMContentLoaded', function () {
    // Variables
    const booksContainer = document.getElementById('cont-de-cat');
    const categoryButtons = document.getElementById('category-buttons');
  
    // Cargar los datos del archivo JSON
    fetch('books.json')
      .then(response => response.json())
      .then(data => {
        const books = data;
  
        // Función para mostrar libros
        function displayBooks(books) {
          booksContainer.innerHTML = ''; // Vacía el contenedor de libros
  
          books.forEach(book => {
            // Crea un elemento div para mostrar el libro
            const bookDiv = document.createElement('div');
            bookDiv.classList.add('book');
            bookDiv.innerHTML = `
              <h2>${book.titulo}</h2>
              <p>Autor: ${book.autor}</p>
              <p>Categoría: ${book.categoria}</p>
              <p>Descripción: ${book.descripcion}</p>
              <p>Precio: $${book.precio}</p>
            `;
  
            booksContainer.appendChild(bookDiv);
          });
        }
  
        // Mostrar todos los libros al cargar la página
        displayBooks(books);
  

        // Contenedor para los botones
const buttonContainer = document.createElement('div');
buttonContainer.classList.add('button-container');
document.body.appendChild(buttonContainer);

// Crear botones de categoría
const categories = [...new Set(books.map(book => book.categoria))];

categories.forEach(category => {
  const button = document.createElement('button');
  button.textContent = category;
  button.classList.add('category-button');
  button.addEventListener('click', () => {
    const filteredBooks = books.filter(book => book.categoria === category);
    displayBooks(filteredBooks);
  });
  buttonContainer.appendChild(button);
})
  });
})
