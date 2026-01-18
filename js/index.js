const contenedor = document.getElementById("productos-temporada");

// Cargar productos de temporada
fetch("./data/temporada.json")
  .then(r => r.json())
  .then(data => {
    productos = data;
    renderProductos(data);
  })
  .catch(error => {
    console.error("Error al cargar productos:", error);
    // Datos de ejemplo si no existe el JSON
    productos = obtenerProductosEjemplo();
    renderProductos(productos);
  });

function renderProductos(data) {
  const contenedor = document.getElementById("productos-temporada");
  contenedor.innerHTML = "";
  
  data.forEach(item => {
    contenedor.innerHTML += `
      <article class="bg-slate-800 rounded-xl p-4 hover:bg-slate-750 transition">
        <div class="flex gap-4 items-stretch">
          
          <div class="w-24 flex-shrink-0">
            <img 
              src="${item.imagen}"
              alt="${item.nombre}"
              class="w-full h-full object-cover rounded-xl"
              onerror="this.src='./images/lineas/hortalizas.png'"/>
          </div>

          <div class="flex flex-col flex-1">
            <div class="flex items-center gap-2 mb-1">
              <h3 class="font-semibold text-base">${item.nombre}</h3>
              <span class="text-xs px-2 py-0.5 rounded-full bg-yellow-700/50">
                ${item.temporada}
              </span>
            </div>
            <p class="text-sm text-slate-400 leading-snug mt-1">${item.descripcion}</p>
            ${item.precio ? `<p class="text-yellow-500 font-semibold text-sm mt-2">${item.precio}</p>` : ''}
          </div>
        </div>

        ${item.disponible ? `
          <button
            class="text-sm px-3 py-1 mt-4 rounded-full bg-yellow-700 hover:bg-yellow-600 self-start transition">
            Ver Detalles
          </button>
        ` : `
          <button
            class="text-sm px-3 py-1 mt-4 rounded-full bg-slate-600 cursor-not-allowed opacity-50 self-start"
            disabled>
            No Disponible
          </button>
        `}
      </article>`;
  });
}

// Filtros por temporada
document.querySelectorAll(".filtro-temporada").forEach(button => {
  button.addEventListener("click", (e) => {
    const temporada = e.target.dataset.temporada;
    
    // Actualizar estilos de botones
    document.querySelectorAll(".filtro-temporada").forEach(btn => {
      btn.classList.remove("bg-red-500", "font-semibold");
      btn.classList.add("bg-slate-700");
    });
    e.target.classList.add("bg-red-500", "font-semibold");
    e.target.classList.remove("bg-slate-700");
    
    // Filtrar productos
    if (temporada === "todas") {
      renderProductos(productos);
    } else {
      const filtrados = productos.filter(p => 
        p.temporada.toLowerCase() === temporada.toLowerCase()
      );
      renderProductos(filtrados);
    }
  });
});
// Detectar página actual y marcar enlace activo
function marcarPaginaActiva() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
      const linkPage = link.getAttribute('href');
      link.classList.remove('active');
      
      // Detectar si es la página actual
      if (linkPage === currentPage || 
          (currentPage === 'index.html' && link.getAttribute('data-page') === 'inicio') ||
          (currentPage === 'emprendimientos.html' && link.getAttribute('data-page') === 'emprendimientos')) {
        link.classList.add('active');
      }
    });
  }
  
  // Menú hamburguesa para móvil
  function initMobileMenu() {
    const menuToggle = document.getElementById('menu-toggle');
    const mainNav = document.getElementById('main-nav');
    const menuIcon = document.getElementById('menu-icon');
    const closeIcon = document.getElementById('close-icon');
    
    if (!menuToggle || !mainNav) return;
    
    menuToggle.addEventListener('click', () => {
      const isOpen = mainNav.classList.contains('mobile-open');
      
      if (isOpen) {
        mainNav.classList.remove('mobile-open');
        mainNav.classList.add('hidden');
        menuIcon.classList.remove('hidden');
        closeIcon.classList.add('hidden');
      } else {
        mainNav.classList.remove('hidden');
        mainNav.classList.add('mobile-open');
        menuIcon.classList.add('hidden');
        closeIcon.classList.remove('hidden');
      }
    });
    
    // Cerrar menú al hacer clic en un enlace (móvil)
    const navLinks = mainNav.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth < 640) { // sm breakpoint
          mainNav.classList.remove('mobile-open');
          mainNav.classList.add('hidden');
          menuIcon.classList.remove('hidden');
          closeIcon.classList.add('hidden');
        }
      });
    });
    
    // Cerrar menú al redimensionar a desktop
    window.addEventListener('resize', () => {
      if (window.innerWidth >= 640) {
        mainNav.classList.remove('mobile-open', 'hidden');
        menuIcon.classList.remove('hidden');
        closeIcon.classList.add('hidden');
      }
    });
  }
  
  // Inicializar cuando el DOM esté listo
  document.addEventListener('DOMContentLoaded', () => {
    marcarPaginaActiva();
    initMobileMenu();
  });

// Función de ejemplo si no existe el JSON
function obtenerProductosEjemplo() {
  return [
    {
      id: 1,
      nombre: "Fresas de Temporada",
      temporada: "Primavera",
      descripcion: "Fresas frescas cultivadas localmente, dulces y jugosas.",
      imagen: "./images/lineas/frutos.png",
      precio: "S/ 15.00 por kg",
      disponible: true
    },
    {
      id: 2,
      nombre: "Mangos",
      temporada: "Verano",
      descripcion: "Mangos maduros y dulces, perfectos para el verano.",
      imagen: "./images/lineas/frutos.png",
      precio: "S/ 8.00 por kg",
      disponible: true
    },
    {
      id: 3,
      nombre: "Granadas",
      temporada: "Otoño",
      descripcion: "Granadas frescas con semillas jugosas y dulces.",
      imagen: "./images/lineas/frutos.png",
      precio: "S/ 12.00 por kg",
      disponible: true
    },
    {
      id: 4,
      nombre: "Cítricos Variados",
      temporada: "Invierno",
      descripcion: "Naranjas, mandarinas y limones frescos de temporada.",
      imagen: "./images/lineas/frutos.png",
      precio: "S/ 6.00 por kg",
      disponible: true
    }
  ];
}


const contenedor1 = document.getElementById("productos-temporada");

// Mes actual (1 - 12)
const mesActual = new Date().getMonth() + 1;

let productos = [];
let lineas = [];

// Cargar ambos JSON
Promise.all([
  fetch("./data/productos_temporada.json").then(r => r.json()),
  fetch("./data/lineas.json").then(r => r.json())
])
.then(([productosData, lineasData]) => {
  productos = productosData;
  lineas = lineasData;

  const disponibles = productos.filter(p =>
    p.meses.includes(mesActual)
  );

  renderProductos(disponibles);
})
.catch(error => {
  console.error("Error cargando datos:", error);
  contenedor1.innerHTML = `
    <p class="text-red-400">Error al cargar los productos.</p>
  `;
});

function obtenerLineaPorNombre(nombreLinea) {
  return lineas.find(l =>
    l.nombre.toLowerCase() === nombreLinea.toLowerCase()
  );
}

function renderProductos(lista) {
  contenedor1.innerHTML = "";

  if (lista.length === 0) {
    contenedor1.innerHTML = `
      <p class="text-slate-400">
        No hay productos disponibles este mes.
      </p>
    `;
    return;
  }

  lista.forEach(item => {
    const linea = obtenerLineaPorNombre(item.linea);

    const imagen = linea?.imagen || "../images/lineas/default.png";
    const icono = linea?.icono || "📞";

    contenedor1.innerHTML += `
      <article class="bg-slate-800 rounded-xl p-5 hover:bg-slate-700 transition flex flex-col">

        <img
          src="${imagen}"
          alt="${item.linea}"
          class="w-full h-40 object-cover rounded-lg mb-4"
          onerror="this.src='../images/lineas/default.png'"
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

contenedor1.addEventListener('click', (e) => {
  const btn = e.target.closest('.contact-btn');
  if (!btn) return;
  const id = btn.getAttribute('data-id');
  window.location.href = `./pages/maps.html?id=${id}`;
});