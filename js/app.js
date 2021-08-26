//variables
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const listaCursos = document.querySelector("#lista-cursos");
const vaciarCarritoBtn = document.querySelector("#vaciar-carrito");
let cursoEnCarrito = [];


agregarEventListener();//llamado a la funcion que agrega los addEventListener



function agregarEventListener(){//agrega los eventlistener
    
    listaCursos.addEventListener('click', agregarCarrito);
    vaciarCarritoBtn.addEventListener('click', vaciarCarrito);
    carrito.addEventListener('click', eliminarCurso); 
}

function agregarCarrito(e){//click sobre btn agregar carrito
    if(e.target.classList.contains('agregar-carrito')){
        const datosCurso = e.target.parentElement.parentElement;
        e.preventDefault();
        leerDatosCurso(datosCurso);
    }
}

function eliminarCurso(e){
    if(e.target.classList.contains('borrar-curso')){
        const cursoId = e.target.getAttribute('data-id');
        //elimina del array de cursoEnCarrito
        cursoEnCarrito = cursoEnCarrito.filter(curso => curso.id !== cursoId);
        
        //vuelve a recorrer el array de cursoEnCarrito y lo muestra sin el valor eliminado
        mostrarCursosCarrito();
    }
}

function leerDatosCurso(datosCurso){//Lee los datos del curso para luego mostrarlos en el tbody
    const infoCurso = {
        imagen: datosCurso.querySelector('img').src,
        titulo: datosCurso.querySelector('h4').textContent,
        autor: datosCurso.querySelector('p').textContent,
        precio: datosCurso.querySelector('.precio span').textContent,
        cantidad: 1,
        id: datosCurso.querySelector('a').getAttribute('data-id')
    }

    const existe = cursoEnCarrito.some( curso => curso.id === infoCurso.id);

    if(existe){
        const cursos = cursoEnCarrito.map(curso => {
            if(curso.id === infoCurso.id){
                curso.cantidad++;
                return curso; //retorna el array actualizado
            }else{
                return curso; //retorna el array comun
            }
        });
        cursoEnCarrito = [...cursos];
    }else{
        cursoEnCarrito = [...cursoEnCarrito,infoCurso];
    }

    mostrarCursosCarrito();
}




function mostrarCursosCarrito(){ 

    //limpiar el html
    limpiarCarrito();

    //recorre el vector y genera los html que despues se insertan en el tbody
    cursoEnCarrito.forEach( curso =>{
        const row = document.createElement('tr');
        const img = document.createElement('img');
        row.innerHTML = `
            <td><img src=${curso.imagen} width=150></td>
            <td>${curso.titulo}</td>
            <td>${curso.precio}</td>
            <td>${curso.cantidad}</td>
            <td><a href="#" class="borrar-curso" data-id="${curso.id}"> X </a>
        `;
        //Agrega el html al carrito en el tbody
        contenedorCarrito.appendChild(row);
    })
}

function limpiarCarrito(){ //basicamente dice, mientras que el tbody tenga algo va a ir eliminando sus primeros hijos hasta vaciarse
    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}
//funcion para controlar el boton de vaciar carrito
function vaciarCarrito(e){
    if(e.target.classList.contains('u-full-width')){
        e.preventDefault();

        limpiarCarrito();
        cursoEnCarrito = [];
    }
}

