const categoriaSelect = document.getElementById('categoria-select');

categoriaSelect.addEventListener('change', () => {
  const selectedCategoria = categoriaSelect.value;

  // Oculta todos los productos
  const productos = document.querySelectorAll('.product-card');
  productos.forEach(producto => {
    producto.style.display = 'none';
  });

  // Muestra solo los productos de la categoría seleccionada
  if (selectedCategoria === 'todos') {
    productos.forEach(producto => {
      producto.style.display = 'inline-block';
    });
  } else {
    const productosCategoria = document.querySelectorAll(`.${selectedCategoria}`);
    productosCategoria.forEach(producto => {
      producto.style.display = 'inline-block';
    });
  }
});
