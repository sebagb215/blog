
import mysql from 'mysql'


//creamos la conexion a la base de datos local
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'blogs',
})

//mensaje conexion con base de datos
db.connect(error => {
    if (error) {
        console.error('Error al conectarse a la base de datos: ', error)
    } else {
        console.log('>> MySQL conectado correctamente <<')
    }
})


export default db;











