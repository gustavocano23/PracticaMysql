
const mysql = require('mysql')
const conexion = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'sakila'

})

conexion.connect(function(err){
    if (err) {
        console.log(`No hubo conexion`)
        return
    } 
    console.log(`Si hubo conexion`)
})

const txtBusqueda = document.getElementById('txt-busqueda')
const formFiltrar = document.getElementById('form-filtrar')


formFiltrar.addEventListener('submit',function(e) {
    e.preventDefault()
})

txtBusqueda.addEventListener('keyup',function(e) {
    console.log(e.code);

    if (e.code === 'Enter'){
        conexion.query(`Select * from film where title like ? or description like ?`,[`%${txtBusqueda.value}%`,`%${txtBusqueda.value}%`],function(err,results,campos) {
            if (err) {
                console.log(`Error`)

                return
            }
            let html ='<table class="tabla-datos">'
            html += '<tr><td>Titulo</td><td>Descripcion</td></tr>'
            for (let fila of results) {
                html += "<tr>"
                html += `<th>${fila.title}</th>`
                html += `<td>${fila.description}</td>`
                html += "</tr>"
            }
            html += '</table>'
            document.getElementById('tabla').innerHTML = html
        })
    }
})


