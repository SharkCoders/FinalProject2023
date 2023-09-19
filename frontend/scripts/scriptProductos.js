// Obtén el elemento select
const categoriaSelect = document.getElementById("categoria-select");

// Itera sobre las categorías en bookInfo y crea opciones
for (let i = 0; i < bookInfo.categories.length; i++) {
  const categoria = bookInfo.categories[i];
  const option = document.createElement("option");
  option.value = categoria.toLowerCase();
  option.textContent = categoria;
  categoriaSelect.appendChild(option);
}