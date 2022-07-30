let productos = [];

let formulario;
let inputPlataforma;
let inputUbicacion;
let inputPosicion;
let inputBannerType;
let inputSubtype;
let inputMarca;
let inputCategoria;
let inputTemporada;
let inputFecha;
let inputCantidad;
let tabla;

class Productos {

  constructor(plataforma, ubicacion, posicion, bannertype, subtype, marca, categoria, temporada, fecha, cantidad) {
    this.plataforma = plataforma.toUpperCase();
    this.ubicacion = ubicacion;
    this.posicion = posicion;
    this.bannertype = bannertype;
    this.subtype = subtype;
    this.marca = marca;
    this.categoria = categoria;
    this.temporada = temporada;
    this.fecha = fecha;
    this.cantidad = cantidad;
    this.puntaje;
  }

  devolverUbicacion() {
    switch (this.ubicacion) {
      case "1":
        return "Home";
        break;
      case "2":
        return "Categoría";
        break
      default:
        return "Error";
        break;
    }
  }

  devolverPosicion() {
    switch (this.posicion) {
      case "10":
        return "Header";
        break;
      case "4":
        return "Middle";
        break
      case "2":
        return "Footer";
        break
      case "7":
        return "Header";
        break;
      case "3":
        return "Middle";
        break
      case "1":
        return "Footer";
        break
      default:
        return "Error";
        break;
    }
  }

  calcularPuntaje() {
    return this.posicion / this.cantidad;
  }

}

function inicializarElementos() {
  formulario = document.getElementById("formulario");
  inputPlataforma = document.getElementById("inputPlataforma");
  inputUbicacion = document.getElementById("inputUbicacion");
  inputPosicion = document.getElementById("inputPosicion");
  inputBannerType = document.getElementById("inputBannerType");
  inputSubtype = document.getElementById("inputSubtype");
  inputMarca = document.getElementById("inputMarca");
  inputCategoria = document.getElementById("inputCategoria");
  inputTemporada = document.getElementById("inputTemporada");
  inputFecha = document.getElementById("inputFecha");
  inputCantidad = document.getElementById("inputCantidad");
  tabla = document.getElementById("tablaProductos");
}

function inicializarEventos() {
  inputUbicacion.addEventListener("change", () => {
    
    if(parseInt(inputUbicacion.value) !== 0) {
      inputPosicion.disabled = false;
      addOptionsByUbicacion(parseInt(inputUbicacion.value));

    } else {
      inputPosicion.disabled = true;
    }

  });

  formulario.onsubmit = (event) => validarFormulario(event);
  

}

function addOptionsByUbicacion(ubicacionValue) {

  if(ubicacionValue === 1) {
    inputPosicion.innerHTML = '';
    inputPosicion.innerHTML += `<option value="10"> Header </option>`
    inputPosicion.innerHTML += `<option value="4"> Middle </option>`
    inputPosicion.innerHTML += `<option value="2"> Footer </option>`
  }

  if(ubicacionValue === 2) {
    inputPosicion.innerHTML = '';
    inputPosicion.innerHTML += `<option value="7"> Header </option>`
    inputPosicion.innerHTML += `<option value="3"> Middle </option>`
    inputPosicion.innerHTML += `<option value="1"> Footer </option>`
  }

}

function validarFormulario(event) {
  event.preventDefault();
  let plataforma = inputPlataforma.value;

  if(plataforma == "") {
    inputPlataforma.value = "Error no dejar en blanco";
    return false;
  }

  let ubicacion = inputUbicacion.value;
  let posicion = inputPosicion.value;
  let bannertype = inputBannerType.value;
  let subtype = inputSubtype.value;
  let marca = inputMarca.value;

  if(marca == "") {
    inputMarca.value = "Error no dejar en blanco";
    return false;
  }

  let categoria = inputCategoria.value;

  if(categoria == "") {
    inputCategoria.value = "Error no dejar en blanco";
    return false;
  }

  let temporada = inputTemporada.value;
  let fecha = inputFecha.value;
  let cantidad = inputCantidad.value;

  if(cantidad == 0) {
    inputCantidad.value = "No dejar en blanco";
    return false;
  }

  let producto = new Productos(plataforma, ubicacion, posicion, bannertype, subtype, marca, categoria, temporada, fecha, cantidad);
  productos.push(producto);
  formulario.reset();
  
  //Acá va el boton!!!!
  Swal.fire({
    title: 'Do you want to save the changes?',
    showDenyButton: true,
    confirmButtonText: 'Save',
    denyButtonText: `Don't save`,
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire('Saved!', '', 'success')
      limpiarTabla();
      agregarProductosTabla();
      almacenarProductosLocalStorage();
    } else if (result.isDenied) {
      Swal.fire('Changes are not saved', '', 'info')
    }
  })
  

  
}

function agregarProductosTabla() {
  console.log(productos);
  productos.forEach((producto) => {
    let filaTabla = document.createElement("tr");
    filaTabla.innerHTML = `
      <td>${producto.plataforma}</td>
      <td>${producto.devolverUbicacion()}</td>
      <td>${producto.devolverPosicion()}</td>
      <td>${producto.bannertype}</td>
      <td>${producto.subtype}</td>
      <td>${producto.marca}</td>
      <td>${producto.categoria}</td>
      <td>${producto.temporada}</td>
      <td>${producto.fecha}</td>
      <td>${producto.cantidad}</td>
      <td>${producto.calcularPuntaje()}</td>`;
    tabla.tBodies[0].append(filaTabla);
  });
}

function limpiarTabla() {
  while (tabla.rows.length > 1) {
    tabla.deleteRow(1);
  }
}

function almacenarProductosLocalStorage(visibilidad) {
  fetch ("https://62e5770220afdf238d7cd742.mockapi.io/ingresos",{
    method: "POST",
    body: JSON.stringify(visibilidad),
    headers: {
      "content-type": "application/json",
    },

  })
  .then((response) => response.json())
  .then((data) => console.log(data));
  //localStorage.setItem("listaProductos", JSON.stringify(productos));
}

function obtenerProductosLocalStorage() {
  let productosAlmacenados = localStorage.getItem("listaProductos");
  if (productosAlmacenados !== null) {
    arrayRecuperado = JSON.parse(productosAlmacenados);
    console.log(arrayRecuperado)
    arrayProductos = arrayRecuperado.map( elemento => {
      let producto = new Productos(elemento.plataforma, elemento.ubicacion, elemento.posicion, elemento.bannertype, elemento.subtype, elemento.marca, elemento.categoria, elemento.temporada, elemento.fecha, elemento.cantidad);
      return producto;
    })    
    productos = arrayProductos;
  }
}

function main() {
  inicializarElementos();
  inicializarEventos();
  obtenerProductosLocalStorage();
  agregarProductosTabla();
}

main();