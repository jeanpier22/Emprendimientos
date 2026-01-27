const contenedor = document.getElementById("lineas-negocio");
const filtrosContainer = document.getElementById("filtros-lineas");

let lineas = [];
let emprendedores = [];
let imagenPorLinea = {};
let lineaSeleccionada = "todas";
let mostrandoEmprendimientos = false;

/* =============================
   CARGA DE DATOS
============================= */

fetch("../data/lineas.json")
  .then(r => r.json())
  .then(data => {
    lineas = data;

    data.forEach(l => {
      imagenPorLinea[l.id_linea] = l.imagen;
    });

    renderFiltros(data);
    renderLineas(data);

    return fetch("../data/emprendedores.json");
  })
  .then(r => r.json())
  .then(data => {
    emprendedores = data;
  })
  .catch(err => {
    console.error("Error cargando datos:", err);
  });

/* =============================
   FILTROS
============================= */

function renderFiltros(data) {
  if (!filtrosContainer) return;

  const botonTodas = filtrosContainer.querySelector('[data-linea="todas"]');
  filtrosContainer.innerHTML = "";
  filtrosContainer.appendChild(botonTodas);

  data.forEach(item => {
    const button = document.createElement("button");
    button.className =
      "px-4 py-2 rounded-full bg-slate-700 hover:bg-slate-600 text-sm transition-all filtro-linea shadow-md";
    button.dataset.linea = item.id_linea;
    button.innerHTML = `${item.icono} ${item.nombre}`;
    button.onclick = () => filtrarPorLinea(item.id_linea);
    filtrosContainer.appendChild(button);
  });
}

function filtrarPorLinea(idLinea) {
  lineaSeleccionada = idLinea;

  document.querySelectorAll(".filtro-linea").forEach(btn => {
    btn.classList.remove(
      "bg-gradient-to-r",
      "from-red-500",
      "to-red-600",
      "font-semibold",
      "shadow-lg"
    );
    btn.classList.add("bg-slate-700");
  });

  const botonActivo = document.querySelector(`[data-linea="${idLinea}"]`);
  if (botonActivo) {
    botonActivo.classList.add(
      "bg-gradient-to-r",
      "from-red-500",
      "to-red-600",
      "font-semibold",
      "shadow-lg"
    );
    botonActivo.classList.remove("bg-slate-700");
  }

  if (idLinea === "todas") {
    mostrandoEmprendimientos = false;
    renderLineas(lineas);
  } else {
    mostrandoEmprendimientos = true;
    renderEmprendimientos(idLinea);
  }
}


/* =============================
   RENDER LINEAS
============================= */

function renderLineas(data) {
  if (!contenedor) return;

  contenedor.innerHTML = "";

  data.forEach(item => {
    let rutaRelativa = ".." + item.imagen; // Ruta que venías usando
    let rutaFallback = "/Emprendimientos" + item.imagen; // Ruta alternativa en GitHub Pages

    contenedor.innerHTML += `
      <article class="bg-slate-800 rounded-xl p-4 hover:bg-slate-750 transition">
        <div class="flex gap-4 items-start">
          <div class="flex-shrink-0 w-28">
            <img 
              src="${rutaRelativa}" 
              onerror="this.onerror=null; this.src='${rutaFallback}';"
              class="w-full h-auto object-cover rounded-xl"
            >
          </div>

          <div class="flex-1">
            <h3 class="font-semibold">${item.nombre}</h3>
            <p class="text-sm text-slate-400">${item.descripcion}</p>
          </div>
        </div>

        <button 
          onclick="filtrarPorLinea('${item.id_linea}')"
          class="text-sm px-3 py-1 mt-4 rounded-full bg-yellow-700 hover:bg-yellow-600">
          Ver Emprendimientos
        </button>
      </article>`;
  });
}


/* =============================
   NAVBAR ACTIVO
============================= */

function marcarPaginaActiva() {
  const currentPage = window.location.pathname.split("/").pop();

  document.querySelectorAll(".nav-link").forEach(link => {
    link.classList.remove("active");

    if (
      (currentPage === "index.html" && link.dataset.page === "inicio") ||
      (currentPage === "emprendimientos.html" && link.dataset.page === "emprendimientos")
    ) {
      link.classList.add("active");
    }
  });
}

/* =============================
   MENU MOVIL
============================= */

function initMobileMenu() {
  const menuToggle = document.getElementById("menu-toggle");
  const mainNav = document.getElementById("main-nav");
  const menuIcon = document.getElementById("menu-icon");
  const closeIcon = document.getElementById("close-icon");

  if (!menuToggle || !mainNav) return;

  menuToggle.onclick = () => {
    const abierto = mainNav.classList.toggle("mobile-open");
    mainNav.classList.toggle("hidden", !abierto);
    menuIcon.classList.toggle("hidden", abierto);
    closeIcon.classList.toggle("hidden", !abierto);
  };
}

/* =============================
   INIT
============================= */

document.addEventListener("DOMContentLoaded", () => {
  marcarPaginaActiva();
  initMobileMenu();

  const botonTodas = document.querySelector('[data-linea="todas"]');
  if (botonTodas) {
    botonTodas.onclick = () => filtrarPorLinea("todas");
  }
});


function renderEmprendimientos(idLinea) {
  if (!contenedor) return;

  contenedor.innerHTML = "";

  // Filtrar emprendimientos por línea
  const filtrados = emprendedores.filter(
    e => e.id_linea === idLinea
  );

  if (filtrados.length === 0) {
    contenedor.innerHTML = `
      <p class="text-slate-400 col-span-full text-center">
        No hay emprendimientos en esta línea.
      </p>`;
    return;
  }

  filtrados.forEach(item => {
    contenedor.innerHTML += `
      <article 
        class="bg-slate-800 rounded-xl p-4 hover:bg-slate-750 transition cursor-pointer"
        onclick="window.location.href='../pages/maps.html?id=${item.id}'"
      >
        <img
          src="../images/Fotos/${item.nombre_emprendimiento}/vision.jpeg"
          class="w-full h-40 object-cover rounded-lg mb-3"
          onerror="this.style.display='none'"
        />

        <h3 class="font-semibold text-lg mb-1">
          ${item.nombre_emprendimiento}
        </h3>

        <p class="text-sm text-slate-400">
          ${item.descripcion.substring(0, 90)}...
        </p>

        <span class="inline-block mt-3 text-yellow-400 text-sm font-semibold">
          Ver detalles →
        </span>
      </article>
    `;
  });
}
