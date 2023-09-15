const categorias = ["Novedades", "Infantiles", "Ficcion", "Filosofia y Religíon"];

function createCategoryButton(categoria, index) {
  const button = document.createElement("button");
  button.textContent = categoria;
  button.id = `boton-novedades-${index}`; 
  button.id = `boton-infantiles-${index}`; 
  button.id = `boton-ficcion-${index}`; 
  button.id = `boton-filosofia-${index}`; 
  
  button.addEventListener("click", function () {

      // Al hacer clic en el botón, redirige a la página de productos y guarda la categoría seleccionada en el localStorage
      localStorage.setItem("categoria", categoria);
      window.location.href = "Productos.html";
    });
  return button;
}

