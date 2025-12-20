// 1️⃣ Leer parámetro de la URL
const params = new URLSearchParams(window.location.search);
const linea = params.get("linea"); // ej: PORCINOS
console.log("Linea seleccionada:", linea);

// 2️⃣ Contenedor
const contenedor = document.getElementById("emprendimientos");

// 3️⃣ Variables globales
let emprendedores = [];
let imagenPorLinea = {};

// 4️⃣ Cargar líneas (para obtener imágenes)
fetch("lineas.json")
  .then(r => r.json())
  .then(lineas => {

    // Crear mapa: { PORCINOS: "ruta/imagen.png" }
    lineas.forEach(l => {
      imagenPorLinea[l.id_linea] = l.imagen;
    });

    // 5️⃣ Luego cargar emprendedores
    return fetch("emprendedores.json");
  })
  .then(r => r.json())
  .then(data => {
    emprendedores = data;
    renderEmprendimientos(data, linea);
  })
  .catch(err => {
    console.error("Error cargando datos:", err);
  });


// 6️⃣ Render de emprendimientos
function renderEmprendimientos(data, lineaSeleccionada) {
  contenedor.innerHTML = "";

  const filtrados = data.filter(
    item => item.id_linea === lineaSeleccionada
  );

  if (filtrados.length === 0) {
    contenedor.innerHTML = `
      <p class="text-slate-400">
        No hay emprendimientos para esta línea
      </p>`;
    return;
  }

  filtrados.forEach(item => {
    const imagen = imagenPorLinea[item.id_linea] || "images/default.png";

    contenedor.innerHTML += `
      <article class="bg-slate-800 rounded-xl p-4 flex flex-col">

        <div class="flex gap-4">
          
          <div class="w-24 h-24 flex-shrink-0">
            <img 
              src="${imagen}"
              alt="${item.nombre_emprendimiento}"
              class="w-full h-full object-cover rounded-xl"
            />
          </div>

          <div class="flex flex-col">
            <h3 class="font-semibold">
              ${item.nombre_emprendimiento}
            </h3>

            <p class="text-sm text-slate-400 mt-1">
              ${item.rubro}
            </p>

            <p class="text-xs text-slate-500 mt-1">
              ${item.ubicacion.distrito} - ${item.ubicacion.localidad}
            </p>
          </div>

        </div>

      </article>
    `;
  });
}
