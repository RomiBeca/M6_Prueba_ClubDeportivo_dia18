$(document).ready(function () {
  getData();
});

function getData() {
  $("#cuerpo").html("");
  axios.get("/deportes").then((data) => {
    let deportes = data.data.deportes;
    deportes.forEach((d, i) => {
      $("#cuerpo").append(/*html*/ `
        <tr>
          <th scope="row">${i + 1}</th>
          <td>${d.nombre}</td>
          <td>${d.precio}</td>
          <td>
            <button class="btn btn-warning" onclick='preEdit("${d.nombre}","${d.precio}")' data-toggle="modal" data-target="#exampleModal">Editar</button>
            <button class="btn btn-danger" onclick='eliminar("${d.nombre}")'>Eliminar</button>
          </td>
        </tr>
        `);
    });
  });
}

function preEdit(nombre, precio) {
  $("#nombreModal").val(nombre);
  $("#precioModal").val(precio);
}

function agregar() {
  let nombre = $("#nombre").val();
  let precio = $("#precio").val();
  axios.get(`/agregar?nombre=${nombre}&precio=${precio}`).then((data) => {
    alert(nombre.precio);
    getData();
  });
  $("#exampleModal").modal("hide");
}

function edit() {
  let nombre = $("#nombreModal").val();
  let precio = $("#precioModal").val();
  let newPrecio=$("newprecioModal").val()
  axios.get(`/editar?nombre=${nombre}&precio=${precio}`).then((data) => {
    alert(nombre.precio);
    getData();
  });
  $("#exampleModal").modal("hide");
}

function eliminar(nombre) {
  axios.get(`/eliminar?nombre=${nombre}`).then((data) => {
    alert("deporte eliminado:"+nombre);
    getData();
  });
  $("#exampleModal").modal("hide");
}
