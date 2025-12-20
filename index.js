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
        
        <div class="w-70 flex">
          <img 
            src="${item.imagen}"
            alt="${item.nombre}"
            class="w-full h-full object-cover rounded-xl"/>
        </div>

        <div class="flex flex-col">
          <h3 class="font-semibold">${item.nombre}</h3>
          <p class="text-sm text-slate-400 leading-snug mt-1">${item.descripcion}</p>
        </div>
      </div>

      <button class="text-sm px-3 py-1 mt-4 rounded-full bg-yellow-700 hover:bg-yellow-600 self-start">Nuestros Emprendimientos</button>
    </article>

`;

  });
}
