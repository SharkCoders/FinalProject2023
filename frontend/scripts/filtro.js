const categorias = ["Romance", "Infantiles", "Ficcion", "Filosofia y Religíon"];

function createCategoryButton(categoria, index) {
  const button = document.createElement("button");
  button.textContent = categoria;
  button.id = "boton-romance"; 
  button.id = "boton-infantiles"; 
  button.id = "boton-ficcion"; 
  button.id = "boton-filosofia"; 
  
  button.addEventListener("click", function () {

      // Al hacer clic en el botón, redirige a la página de productos y guarda la categoría seleccionada en el localStorage
      localStorage.setItem("categoria", categoria);
      window.location.href("./template/productos/html");
    });
  return button;
}

