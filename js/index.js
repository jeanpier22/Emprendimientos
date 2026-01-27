const contenedor = document.getElementById("productos-temporada");

// Mes actual (1–12)
const mesActual = new Date().getMonth() + 1;

let productos = [];
let lineas = [];

/* =========================
   CARGA DE DATOS
========================= */
Promise.all([
  fetch("./data/productos_temporada.json").then(r => r.json()),
  fetch("./data/lineas.json").then(r => r.json())
])
.then(([productosData, lineasData]) => {
  productos = productosData;
  lineas = lineasData;

  const disponibles = productos.filter(p =>
    Array.isArray(p.meses) && p.meses.includes(mesActual)
  );

  renderProductos(disponibles);
})
.catch(error => {
  console.error("Error cargando datos:", error);
  contenedor.innerHTML = `
    <p class="text-red-400">Error al cargar los productos.</p>
  `;
});

/* =========================
   HELPERS
========================= */
function obtenerLineaPorNombre(nombreLinea) {
  if (!nombreLinea) return null;
  return lineas.find(l =>
    l.nombre?.toLowerCase() === nombreLinea.toLowerCase()
  );
}

/* =========================
   RENDER
========================= */
function renderProductos(lista) {
  contenedor.innerHTML = "";

  if (lista.length === 0) {
    contenedor.innerHTML = `
      <p class="text-slate-400">
        No hay productos disponibles este mes.
      </p>
    `;
    return;
  }

  lista.forEach(item => {
    const linea = obtenerLineaPorNombre(item.linea);
    const imagen = linea?.imagen || "";
    const icono = linea?.icono || "📞";

    contenedor.innerHTML += `
      <article class="bg-slate-800 rounded-xl p-5 hover:bg-slate-700 transition flex flex-col">

        <img
          src="/Haku-Winay-Noa-Jayatai/images/Fotos/${item.nombre}/vision.jpeg"
          alt="${item.linea}"
          class="w-full h-40 object-cover rounded-lg mb-4"
        />

        <h3 class="text-lg font-semibold mb-1">
          ${item.nombre}
        </h3>

        <span class="text-xs bg-yellow-700/50 px-2 py-0.5 rounded-full self-start mb-2">
          ${item.linea}
        </span>

        <p class="text-sm text-slate-400 mb-2">
          <strong>Rubro:</strong> ${item.rubro}
        </p>

        <p class="text-sm text-slate-300 mb-4">
          <strong>Productos:</strong> ${item.productos}
        </p>

        <button
          class="contact-btn mt-auto flex items-center gap-2 text-sm px-4 py-2 rounded-full bg-yellow-700 hover:bg-yellow-600 transition"
          data-id="${item.id}">
          <span>${icono}</span>
          <span>Contáctanos</span>
        </button>

      </article>
    `;
  });
}

/* =========================
   REDIRECCIÓN
========================= */
contenedor.addEventListener("click", (e) => {
  const btn = e.target.closest(".contact-btn");
  if (!btn) return;
  const id = btn.dataset.id;
  window.location.href = `./pages/maps.html?id=${id}`;
});

/* =========================
   NAV ACTIVO
========================= */
function marcarPaginaActiva() {
  const currentPage =
    window.location.pathname.split("/").pop() || "index.html";

  const navLinks = document.querySelectorAll(".nav-link");

  navLinks.forEach(link => {
    const linkPage = link.getAttribute("href");
    const dataPage = link.getAttribute("data-page");

    link.classList.remove("active");

    if (
      linkPage === currentPage ||
      (currentPage === "index.html" && dataPage === "inicio") ||
      (currentPage === "" && dataPage === "inicio")
    ) {
      link.classList.add("active");
    }
  });
}


/* =========================
   MENÚ MÓVIL
========================= */
function initMobileMenu() {
  const menuToggle = document.getElementById("menu-toggle");
  const mainNav = document.getElementById("main-nav");
  const menuIcon = document.getElementById("menu-icon");
  const closeIcon = document.getElementById("close-icon");

  if (!menuToggle || !mainNav) return;

  menuToggle.addEventListener("click", () => {
    const abierto = mainNav.classList.contains("mobile-open");

    mainNav.classList.toggle("mobile-open", !abierto);
    mainNav.classList.toggle("hidden", abierto);
    menuIcon.classList.toggle("hidden", !abierto);
    closeIcon.classList.toggle("hidden", abierto);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  marcarPaginaActiva();
  initMobileMenu();
});
