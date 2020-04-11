// variables
const carrito = document.getElementById('carrito');
const cursos = document.getElementById('lista-cursos');
const  listCursos = document.querySelector('#lista-carrito tbody');
const  vaciarCarritoBtn = document.getElementById('vaciar-carrito');

// eventos
cargarEventListener();

function cargarEventListener() {
    // dispara cuando se presiona agregar carrito
    cursos.addEventListener('click', comprarCurso);

    // eliminar curso de carrito
    carrito.addEventListener('click', eliminarCurso);

    // vaciar carrito
    vaciarCarritoBtn.addEventListener('click', vaciarCarrito);

    // al cargar el documento, mostrar datos del localStorage
    document.addEventListener('DOMContentLoaded', leerLS);
}

// funciones 

function comprarCurso(e) {
    e.preventDefault();
    //console.log(e.target.classList);
    if (e.target.classList.contains('agregar-carrito')) {
        //console.log('Se presiona el boton que tiene la clase agregar-carrito');
        //console.log(e.target.parentElement.parentElement);
        const curso = e.target.parentElement.parentElement;
        leerDatosCurso(curso);
    }
}

function leerDatosCurso(curso) {
    //probamos que este trayendo todos los datos del cursi
    //console.log(curso);

    // seteamos los datos en un objeto
    const infoCurso = {
        imagen : curso.querySelector('img').src,
        titulo : curso.querySelector('h4').textContent,
        precio : curso.querySelector('.precio span').textContent,
        id : curso.querySelector('a').getAttribute('data-id')
    };

    insertarCarrito(infoCurso);
}

function insertarCarrito(curso) {
    const row = document.createElement('tr');    
    row.innerHTML = `
        <td><img src="${curso.imagen}"></td>
        <td>${curso.titulo}</td>
        <td>${curso.precio}</td>
        <td><a href="#" class="borrar-curso" data-id="${curso.id}">x</a></td>
    `;
    listCursos.appendChild(row);
    saveCursoLS(curso);
}

function eliminarCurso(e) {
    e.preventDefault();
    
    // con el console probamos que estamos capturando todos los valores de la fila
    //console.log(e.target.parentElement.parentElement)

    let curso, cursoId;

    // si capturamos el elemento con la clase borrar-curso ejecutamos
    if (e.target.classList.contains('borrar-curso')) {
        //console.log(e.target.parentElement.parentElement);
        e.target.parentElement.parentElement.remove();
        curso = e.target.parentElement.parentElement;
        cursoId = curso.querySelector('a').getAttribute('data-id');
    }
    console.log(cursoId);
    eliminarCursoLS(cursoId)
}

function vaciarCarrito() {
    while(listCursos.firstChild) {
        listCursos.removeChild(listCursos.firstChild);
    }    
    // nos evita el retorno 1 y que nos mande a la posicion 0 top
    vaciarLS();
    return false;
}

function obtenerCursosLS() {
    let cursosLS;
    if (localStorage.getItem('cursos') === null) {
        cursosLS = [];    
    } else {
        cursosLS = JSON.parse(localStorage.getItem('cursos'));
    }
    return cursosLS;
}

function leerLS() {
    let cursosLS;
    cursosLS = obtenerCursosLS();
    cursosLS.forEach((curso)=>{
        //construimos el template
        const row = document.createElement('tr');    
        row.innerHTML = `
            <td><img src="${curso.imagen}"></td>
            <td>${curso.titulo}</td>
            <td>${curso.precio}</td>
            <td><a href="#" class="borrar-curso" data-id="${curso.id}">x</a></td>
        `;
        listCursos.appendChild(row);    
    });
}

function saveCursoLS(curso) {
    let cursosLS = obtenerCursosLS();
    cursosLS.push(curso);
    localStorage.setItem('cursos', JSON.stringify(cursosLS));
}

function eliminarCursoLS(cursoId) {     
    let cursosLS = obtenerCursosLS();
    cursosLS.forEach((curso, index)=>{
        if(curso.id === cursoId){
            cursosLS.splice(index, 1);
        }
    });
    localStorage.setItem('cursos', JSON.stringify(cursosLS));
}

function vaciarLS() {
    localStorage.clear();
}