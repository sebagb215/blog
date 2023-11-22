import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useParams, } from "react-router-dom";
import DOMpurify from 'dompurify';
import axios from 'axios'
import { useNavigate } from "react-router-dom";

const Addblog = () => {

    const { id } = useParams(); //obtener el id
    const [titulo, setTitulo] = useState(""); //valor iniciar del titulo 
    const [descripcion, setDescripcion] = useState(""); //react quill
    const [editar, setEditar] = useState(false)
    const navigate = useNavigate()


    //para diferenciar si es para crear un post nuevo o editar uno
    useEffect(() => {
        if (id) { 
            axios.get(`http://localhost:8080/blogs/post/${id}`)
                .then((res) => {
                    if (res.data.length > 0) {
                        const post = res.data[0]
                        setTitulo(post.titulo)
                        setDescripcion(post.descripcion)
                    }
                })
                .catch((err) => console.log(err.data))
        }
    }, [id])
    
    // CREAR UN POST NUEVO  (FUNCIONANDO)
    const addPost = () => {
        //si el titulo y la descripcion están vacios no agrega un post
        if (!titulo || !descripcion) {
            console.log("No se puede agregar un post vacío");
            alert("los campos titulo y descripcion son Obligatorios")
            return;
        }

        axios
            .post(`http://localhost:8080/create`, {
                titulo: titulo,
                descripcion: descripcion,
            })
            .then((res) => {
                console.log(res.data);
                navigate(`/blogs`); //redirigir a blogs
            })
            .catch((err) => {
                console.error("error al agregar el post nuevo", err);
            });
    };


    //ACTUALIZAR DATOS DE UN POST
    const updatePost = () => {
        if (!id) {
            console.log("No se especificó el ID del post");
            return;
        }
        const Newinfo = {
            titulo: titulo,
            descripcion:descripcion,
        };

        console.log(Newinfo)
        axios
            .put(`http://localhost:8080/update/${id}`, Newinfo)
            .then((res) => {
                if (res.status === 200) {
                    console.log("El post ha sido actualizado", res.data);
                    navigate('/blogs')
                }
            })
            .catch((err) => {
                console.error("Error al actualizar el post", err);
            });
    };



//ELIMINAR POST (funcionando)
const DeletePost = () => {
    if (!id) {
        console.error("ID del post no especificado")
        alert("ID del post no especificado")
        return
    }
    axios
        .delete(`http://localhost:8080/delete/${id}`)
        .then((res) => {
            console.log("El post ha sido eliminado correctamente", res.data)
            navigate(`/blogs`)
        })
        .catch((err) => {
            console.error("Error a al eliminar post", err)
        })
}


return (
    <div className="container mx-auto flex justify-center mt-10">
        <div id='add' className='flex w-10/12'>

            <div id='content' className='flex-1 mr-4'>
                <div className="mb-2">
                    <label htmlFor="title" className="text-lg font-bold text-purple-500">Título</label>
                </div>
                <div className="mb-10">
                    <input type="text" id="title" value={titulo} placeholder='Agregar Título' className="flex flex-col w-full p-2 border rounded-lg border-slate-400" onChange={(event) => { setTitulo(event.target.value) }} />
                </div>
                <div id="editorContainer">
                    <div className="mb-2">
                        <label htmlFor="" className="text-lg font-bold text-purple-500">Descripción</label>
                    </div>
                    <div className="max-w-3xl my-4">
                        <ReactQuill className=" " theme="snow" value={descripcion} onChange={(value) => setDescripcion(value)} modules={{
                            toolbar: [
                                [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
                                ['bold', 'italic', 'underline'],
                                [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                                ['link', 'image'],
                                ['clean'],
                            ],
                        }}
                            formats={[
                                'header', 'font', 'size',
                                'bold', 'italic', 'underline', 'strike', 'blockquote',
                                'list', 'bullet', 'indent',
                                'link', 'image', 'video'
                            ]}
                            bounds={'.app'} />
                    </div>
                </div>
            </div>

            <div id='menu' className='flex flex-col  bg-[#202020] text-white rounded-lg  shadow-xl  p-4 min-w-[270px] max-h-[210px]'>
                <div id='item1'>
                    <h1 className="text-xl text-center font-bold mb-4 ">Publicar</h1>

                    <input className='hidden p-2 ' type="file" id='file' onChange={e => setFile(e.target.files[0])} />

                    <label htmlFor="file">Subir imagen</label>

                    <div id="buttons" className="flex flex-col mt-8 justify-between font-bold">

                        <button onClick={DeletePost}>Eliminar Post</button>
                        <button className="rounded-full py-2 hover:text-blue-700" onClick={updatePost}>Update</button>
                        <button onClick={addPost}>Agregar Nuevo Post</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
);
};

export default Addblog;
