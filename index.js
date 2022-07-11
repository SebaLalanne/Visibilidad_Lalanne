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
  formulario.onsubmit = (event) => validarFormulario(event);
}

function validarFormulario(event) {
  event.preventDefault();
  let plataforma = inputPlataforma.value;
  let ubicacion = inputUbicacion.value;
  let posicion = inputPosicion.value;
  let bannertype = inputBannerType.value;
  let subtype = inputSubtype.value;
  let marca = inputMarca.value;
  let categoria = inputCategoria.value;
  let temporada = inputTemporada.value;
  let fecha = inputFecha.value;
  let cantidad = inputCantidad.value;
  let producto = new Productos(plataforma, ubicacion, posicion, bannertype, subtype, marca, categoria, temporada, fecha, cantidad);
  productos.push(producto);
  formulario.reset();

  limpiarTabla();
  agregarProductosTabla();
  almacenarProductosLocalStorage();
}

function agregarProductosTabla() {
  productos.forEach((producto) => {
    let filaTabla = document.createElement("tr");
    filaTabla.innerHTML = `
      <td>${producto.plataforma}</td>
      <td>${producto.ubicacion}</td>
      <td>${producto.posicion}</td>
      <td>${producto.bannertype}</td>
      <td>${producto.subtype}</td>
      <td>${producto.marca}</td>
      <td>${producto.categoria}</td>
      <td>${producto.temporada}</td>
      <td>${producto.fecha}</td>
      <td>${producto.cantidad}</td>`;
    tabla.tBodies[0].append(filaTabla);
  });
}

function limpiarTabla() {
  while (tabla.rows.length > 1) {
    tabla.deleteRow(1);
  }
}

function almacenarProductosLocalStorage() {
  localStorage.setItem("listaProductos", JSON.stringify(productos));
}

function obtenerProductosLocalStorage() {
  let productosAlmacenados = localStorage.getItem("listaProductos");
  console.log(typeof productosAlmacenados)
  if (productosAlmacenados !== null) {
    productos = JSON.parse(productosAlmacenados);
  }
}

function main() {
  inicializarElementos();
  inicializarEventos();
  obtenerProductosLocalStorage();
  agregarProductosTabla();
}

main();