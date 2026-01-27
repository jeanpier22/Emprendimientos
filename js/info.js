// 1️⃣ Leer parámetro de la URL
const params = new URLSearchParams(window.location.search);
const id = params.get("id"); // ej: PORCINOS
console.log("Linea seleccionada:", id);



var emprendedores = [];

fetch("../data/emprendedores.json")
  .then(r => r.json())
  .then(data => {
    emprendedores = data;
    console.log(data);
    renderLineas(data)
  });

 
function renderLineas(data) {
    const portadaEmp = document.getElementById("portadaEmp");
    const participacion = document.getElementById("participacion");
    const emprendimiento = document.getElementById("emprendimiento");
    const rubro = document.getElementById("rubro");
    const description = document.getElementById("description");
    const presidente = document.getElementById("presidente");
    const secretario = document.getElementById("secretario");
    const tesorero = document.getElementById("tesorero");
    const telefono = document.getElementById("telefono");
    const correo = document.getElementById("correo");
    const maps = document.getElementById("maps");
    const ubicacion_maps = document.getElementById("ubicacion_maps");
    const misionImg = document.getElementById("mision-img");
    const visionImg = document.getElementById("vision-img");

    const misionP = document.getElementById("mision-P");
    const visionP = document.getElementById("vision-P");

    

     
    emprendimiento.textContent = data[id-1]["nombre_emprendimiento"]
    rubro.textContent = data[id - 1].rubro.toLowerCase().replace(/\b\w+\b/g, palabra =>
      palabra.length > 2
        ? palabra.charAt(0).toUpperCase() + palabra.slice(1)
        : palabra
      );
    description.textContent = data[id-1]["descripcion"];

    misionP.textContent = data[id-1]["mision"];
    visionP.textContent = data[id-1]["vision"];

    presidente.textContent = data[id-1]["integrantes"]["presidente"];
    secretario.textContent = data[id-1]["integrantes"]["secretario"];
    tesorero.textContent = data[id-1]["integrantes"]["tesorero"];
    telefono.textContent =data[id-1]["celular"];
    correo.textContent = data[id-1]["correo"];
    maps.src = data[id-1]["maps"];
    ubicacion_maps.textContent =
  `${data[id-1]["ubicacion"]["localidad"]} – ` +
  `${data[id-1]["ubicacion"]["distrito"]} – ` +
  `${data[id-1]["ubicacion"]["provincia"]}`;
  
  portadaEmp.src = `../images/Fotos/${data[id - 1].nombre_emprendimiento}/portada.jpeg`;
  participacion.src = `../images/Fotos/${data[id - 1].nombre_emprendimiento}/participacion.jpeg`;
  misionImg.src = `../images/Fotos/${data[id - 1].nombre_emprendimiento}/mision.jpeg`;
  visionImg.src = `../images/Fotos/${data[id - 1].nombre_emprendimiento}/vision.jpeg`;


  cargarImagen(data[id - 1].nombre_emprendimiento);

}

const galeria = document.getElementById("galeria");
let i = 1;

function cargarImagen(name) {
  const img = new Image();
  img.src = `../images/Fotos/${name}/${i}.jpeg`;

  img.onload = () => {
    img.className =
      "rounded-xl object-cover h-32 w-full cursor-pointer hover:scale-105 transition-transform duration-300";

    // 👇 AQUÍ se conecta el modal
    img.addEventListener("click", () => {
      abrirModal(img.src);
    });

    galeria.appendChild(img);
    i++;
    cargarImagen(name);
  };

  img.onerror = () => {
    console.log("Galería cargada");
  };
}



const modal = document.getElementById("modalImagen");
const modalImg = document.getElementById("modalImg");

function abrirModal(src) {
  modalImg.src = src;
  modal.classList.remove("hidden");
  modal.classList.add("flex");
}

// cerrar al hacer click fuera
modal.addEventListener("click", () => {
  modal.classList.add("hidden");
  modal.classList.remove("flex");
});



const cerrarBtn = document.getElementById("cerrarModal");

function abrirModal(src) {
  modalImg.src = src;
  modal.classList.remove("hidden");
  modal.classList.add("flex");
}

// cerrar con botón
cerrarBtn.addEventListener("click", () => {
  modal.classList.add("hidden");
  modal.classList.remove("flex");
});

// cerrar al hacer click fuera
modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.classList.add("hidden");
    modal.classList.remove("flex");
  }
});

// cerrar con ESC
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    modal.classList.add("hidden");
    modal.classList.remove("flex");
  }
});


