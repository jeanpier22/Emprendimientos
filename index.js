const contenedor = document.getElementById("lineas-negocio");



var emprendedores = [];

fetch("lineas.json")
  .then(r => r.json())
  .then(data => {
    emprendedores = data;
    renderLineas(data)
  });

 
function renderLineas(data) {
    const contenedor = document.getElementById("lineas-negocio");
    data.forEach(item => {
    contenedor.innerHTML += `
    
    <article class="bg-slate-800 rounded-xl p-4">
      <div class="flex gap-4 items-stretch">
        
        <div class="w-70  flex">
          <img 
            src="${item.imagen}"
            alt="${item.nombre}"
            class="w-full h-full object-cover rounded-xl"/>
        </div>

        <div class="flex flex-col">
          <h3 class="font-semibold h-[]">${item.nombre}</h3>
          <p class="text-sm text-slate-400 leading-snug mt-1">${item.descripcion}</p>
        </div>
      </div>

<a
  href="emprendimientos.html?linea=${encodeURIComponent(item.id_linea)}"
  data-linea="${item.id_linea}">
  <button
    class="text-sm px-3 py-1 mt-4 rounded-full bg-yellow-700 hover:bg-yellow-600 self-start">
    Nuestros Emprendimientos
  </button>
</a>


    </article>`;

  });
}



contenedor.addEventListener("click", (e) => {
  const boton = e.target.closest("button[data-linea]");
  if (!boton) return;

  const lineaId = boton.dataset.linea;
  console.log(lineaId)
  mostrarLinea(lineaId);
});

function mostrarLinea(id) {
  const linea = data.find(item => item.id === id);
  if (!linea) return;

  document.getElementById("detalle-titulo").textContent = linea.nombre;
  document.getElementById("detalle-descripcion").textContent = linea.descripcion;
  document.getElementById("detalle-imagen").src = linea.imagen;
}
