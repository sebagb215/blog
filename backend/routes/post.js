import express from 'express';
import db from '../db.js';


//configuracion de las rutas Post

const router = express.Router()


//OBTENER TODOS LOS POST
router.get("/blogs", (req, res) => {

    const q = "SELECT * FROM post"
    db.query(q, (err, data) => {
        if (err) {
            console.error("error al ejecutar la consulta", err)
            return res.status(500).json({ err: "Error al obtener los post" });
        } else {
            return res.status(200).json(data)
        }
    })

})


//OBTENER UN POST POR ID
router.get("/blogs/post/:id", (req, res) => {

    const id = req.params.id;
    const q = "SELECT * FROM post WHERE id = ?";

    db.query(q, [id], (err, data) => {
        if (err) {
            console.error("error al ejecutar la consulta", err)
            return res.status(500).json({ err: "error al obtener PostID" })

        } else {
            return res.status(200).json(data);
        }
    });
})

//AÑADIR NUEVO POST
router.post("/create", (req, res) => {
    const {titulo, descripcion, img, fechaPublicacion } = req.body;

    const q = "INSERT INTO post (titulo,descripcion,img,fechaPublicacion) VALUES (?, ?, ?, ?, ?)"

    const values = [
        req.body.id,
        req.body.titulo,
        req.body.descripcion,
        req.body.fechaPublicacion,
        req.body.img
    ]

    db.query(q, values, (err, data) => {
        if (err) {
            console.error("Error al Ejecutar consula", err)
            return res.status(500).json({ err: "error al Agregar nuevo post" })
        } else {
            return res.status(200).json({message:"Post agregado correctamente",data})

        }
    })
})

//ELIMINAR POST
router.delete("/delete/:id", (req, res) => {
    const id = req.params.id
    const q = "DELETE FROM post WHERE id = ?";

    db.query(q, [id], (err, data) => {
        if (err) {
            console.error("error al ejecutar consulta:", err)
            return res.status(500).json({ err: "error Al eliminar el post" })
        } else {
            console.log("eL Post ha sido eliminado",data)
            return res.status(200).json({message:"El post ha sido eliminado correctamente",data})
        }
    })
})


//ACTUALIZAR / MODIFICAR POST
router.put("/update/:id", (req, res) => {
    const id = req.params.id
    const { titulo, descripcion, img, fechaPublicacion } = req.body
    const q = "UPDATE post SET titulo= ?, descripcion= ?  WHERE id=?";

    const values = [titulo, descripcion,id]
    db.query(q, values, (err, data) => {
        if (err) {
            console.log(err)
            return res.status(500).json("el post no ha sido actualizado",err)

        } else {
            console.log("el post ha sido actualizado", data)
            return res.json({message:"el post  ha sido actualizado",data})
        }
    })
});


export default router;