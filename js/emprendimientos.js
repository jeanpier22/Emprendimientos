const contenedor = document.getElementById("lineas-negocio");
const filtrosContainer = document.getElementById("filtros-lineas");
var lineas = [];
var emprendedores = [];
var imagenPorLinea = {};
var lineaSeleccionada = "todas";
var mostrandoEmprendimientos = false;

// Cargar líneas de negocio
fetch("/data/lineas.json")
  .then(r => r.json())
  .then(data => {
    lineas = data;
    // Crear mapa de imágenes por línea
    data.forEach(l => {
      imagenPorLinea[l.id_linea] = l.imagen;
    });
    renderFiltros(data);
    renderLineas(data);
    
    // Cargar emprendedores después
    return fetch("../data/emprendedores.json");
  })
  .then(r => r.json())
  .then(data => {
    emprendedores = data;
  })
  .catch(err => {
    console.error("Error cargando datos:", err);
  });

// Renderizar botones de filtro
function renderFiltros(data) {
  if (!filtrosContainer) return;
  
  // Limpiar contenedor excepto el botón "Todas"
  const botonTodas = filtrosContainer.querySelector('[data-linea="todas"]');
  filtrosContainer.innerHTML = '';
  filtrosContainer.appendChild(botonTodas);
  
  // Crear botones para cada línea
  data.forEach(item => {
    const button = document.createElement('button');
    button.className = 'px-4 py-2 rounded-full bg-slate-700 hover:bg-slate-600 text-sm transition-all filtro-linea shadow-md hover:shadow-lg';
    button.setAttribute('data-linea', item.id_linea);
    button.innerHTML = `${item.icono} ${item.nombre}`;
    button.addEventListener('click', () => filtrarPorLinea(item.id_linea));
    filtrosContainer.appendChild(button);
  });
}

// Filtrar por línea
function filtrarPorLinea(idLinea) {
  lineaSeleccionada = idLinea;
  
  // Actualizar estilos de botones
  document.querySelectorAll(".filtro-linea").forEach(btn => {
    btn.classList.remove("bg-gradient-to-r", "from-red-500", "to-red-600", "font-semibold", "shadow-lg");
    btn.classList.add("bg-slate-700");
  });
  
  const botonActivo = document.querySelector(`[data-linea="${idLinea}"]`);
  if (botonActivo) {
    botonActivo.classList.add("bg-gradient-to-r", "from-red-500", "to-red-600", "font-semibold", "shadow-lg");
    botonActivo.classList.remove("bg-slate-700");
  }
  
  // Mostrar líneas o emprendimientos según la selección
  if (idLinea === "todas") {
    mostrandoEmprendimientos = false;
    actualizarTitulo("Líneas de Negocio");
    renderLineas(lineas);
  } else {
    mostrandoEmprendimientos = true;
    const linea = lineas.find(l => l.id_linea === idLinea);
    actualizarTitulo(`Emprendimientos - ${linea ? linea.nombre : idLinea}`);
    renderEmprendimientos(idLinea);
  }
}

// Actualizar título de la sección
function actualizarTitulo(texto) {
  const titulo = document.querySelector("section h2");

}

// Renderizar emprendimientos
function renderEmprendimientos(idLinea) {
  const contenedor = document.getElementById("lineas-negocio");
  if (!contenedor) return;
  
  contenedor.innerHTML = "";
  
  const filtrados = emprendedores.filter(
    item => item.id_linea === idLinea
  );
  
  if (filtrados.length === 0) {
    contenedor.innerHTML = `
      <div class="col-span-full text-center py-8">
        <p class="text-slate-400 text-lg">
          No hay emprendimientos disponibles para esta línea de negocio
        </p>
        <button 
          onclick="filtrarPorLinea('todas')"
          class="mt-4 px-4 py-2 rounded-full bg-yellow-700 hover:bg-yellow-600 text-sm transition">
          Volver a Líneas de Negocio
        </button>
      </div>`;
    return;
  }
  
  filtrados.forEach(item => {
    const imagen = imagenPorLinea[item.id_linea] || "images/default.png";
    
    contenedor.innerHTML += `
      <article class="bg-slate-800 rounded-xl p-5 flex flex-col gap-4 hover:bg-slate-750 transition">
        
        <!-- Encabezado -->
        <div class="flex gap-4 items-center">
          
          <div class="w-28 h-28 flex-shrink-0">
            <img 
              src="${imagen}"
              alt="${item.nombre_emprendimiento}"
              class="w-full h-full object-cover rounded-xl"
              onerror="this.src='./images/lineas/hortalizas.png'"
            />
          </div>
          
          <div class="flex-1">
            <h3 class="text-lg font-bold text-white">
              ${item.nombre_emprendimiento}
            </h3>
            
            <p class="text-sm text-yellow-500 mt-1">
              ${item.linea_negocio}
            </p>
            
            <p class="text-xs text-slate-400 mt-1">
              📍 ${item.ubicacion.distrito}, ${item.ubicacion.localidad}
            </p>
          </div>
        </div>
        
        <!-- Descripción -->
        <p class="text-sm text-slate-300 leading-relaxed">
          ${item.descripcion || `Este emprendimiento se dedica a la <strong>${item.rubro.toLowerCase()}</strong>, desarrollando sus actividades de manera artesanal y sostenible.`}
        </p>
        
        <!-- Botón de más información -->
        <a href="maps.html?id=${encodeURIComponent(item.id)}">
          <button class="text-sm px-4 py-2 rounded-full bg-yellow-700 hover:bg-yellow-600 self-start transition">
            Más Información
          </button>
        </a>
        
      </article>`;
  });
}

// Event listener para el botón "Todas"
document.addEventListener('DOMContentLoaded', () => {
  const botonTodas = document.querySelector('[data-linea="todas"]');
  if (botonTodas) {
    botonTodas.addEventListener('click', () => filtrarPorLinea("todas"));
  }
});

// Renderizar líneas de negocio
function renderLineas(data) {
  const contenedor = document.getElementById("lineas-negocio");
  if (!contenedor) return;
  
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
            <h3 class="font-semibold text-base">${item.nombre}</h3>
            <p class="text-sm text-slate-400 leading-snug mt-1">${item.descripcion}</p>
          </div>
        </div>

        <button 
          onclick="filtrarPorLinea('${item.id_linea}')"
          class="text-sm px-3 py-1 mt-4 rounded-full bg-yellow-700 hover:bg-yellow-600 self-start transition">
          Ver Emprendimientos
        </button>
      </article>`;
  });
}

// Detectar página actual y marcar enlace activo
function marcarPaginaActiva() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link');
  
  navLinks.forEach(link => {
    const linkPage = link.getAttribute('href');
    link.classList.remove('active');
    
    // Detectar si es la página actual
    if (linkPage === currentPage || 
        (currentPage === 'index.html' && link.getAttribute('data-page') === 'emprendimientos') ||
        (currentPage === 'temporada.html' && link.getAttribute('data-page') === 'inicio')) {
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

function marcarPaginaActiva() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link');

  navLinks.forEach(link => {
    link.classList.remove('active');

    const href = link.getAttribute('href');
    const dataPage = link.dataset.page;

    if (
      href === currentPage ||
      dataPage === currentPage.replace('.html', '')
    ) {
      link.classList.add('active');
    }
  });
}

document.addEventListener('DOMContentLoaded', marcarPaginaActiva);