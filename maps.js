// 1️⃣ Leer parámetro de la URL
const params = new URLSearchParams(window.location.search);
const id = params.get("id"); // ej: PORCINOS
console.log("Linea seleccionada:", id);



var emprendedores = [];

fetch("emprendedores.json")
  .then(r => r.json())
  .then(data => {
    emprendedores = data;
    console.log(data);
    renderLineas(data)
  });

 
function renderLineas(data) {
    const emprendimiento = document.getElementById("emprendimiento");

    const description = document.getElementById("description");
    const presidente = document.getElementById("presidente");
    const secretario = document.getElementById("secretario");
    const tesorero = document.getElementById("tesorero");
    const telefono = document.getElementById("telefono");
    const correo = document.getElementById("correo");
    const maps = document.getElementById("maps");
    const ubicacion_maps = document.getElementById("ubicacion_maps");

     
    emprendimiento.textContent = data[id-1]["nombre_emprendimiento"]
    description.textContent = data[id-1]["descripcion"];
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


}