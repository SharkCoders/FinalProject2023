
const listaDeLibros = [ 
    { titulo: "Libro 1", categoria: "Novedades" },
    { titulo: "Libro 2", categoria: "Infantiles" },
    { titulo: "Libro 3", categoria: "Ficción" },
    { titulo: "Libro 4", categoria: "Filosofia y Religion" },
  ];
  
  function filtrarPorCategoria(libros, categoria) {
    return libros.filter(libro => libro.categoria === categoria);
  }
  
  function mostrarLibros(categoria) {
    const librosFiltrados = filtrarPorCategoria(listaDeLibros, categoria);
    console.log("Libros de la categoría '" + categoria + "':");
    console.log(librosFiltrados);
  }
  