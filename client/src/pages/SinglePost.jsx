import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Mountains from '../assets/Mountains.jpeg';
import axios from 'axios';
import { VscEdit } from "react-icons/vsc";
import DOMPurify from 'dompurify'; //evitar ataques XSS
import { TiEdit } from "react-icons/ti";





const SinglePost = () => {
    const { id } = useParams()
    const [post, setPost] = useState({})
    const [titulo, setTitulo] = useState("");
    const [descripcion, setDescripcion] = useState("");

    const descripcionSanitizada = DOMPurify.sanitize(post.descripcion)


    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get(`http://localhost:8080/blogs/post/${id}`)
            .then((res) => {      //si la solicitud es exitosa, se ejecuta esta parte del codigo
                console.log(res.data);//muestra en consola el primer elemento del array recibido
                if (res.data.length > 0) {//verifica si hay un elemento en el array de datos recibidos
                    setPost(res.data[0]) //establece el primer elemento del array como el estado 'post'
                }
                ;
            })
            .catch((err) => console.log(err))
    }, [id])

    const editPost = () => {
        navigate(`/editar/post/${id}`)
    }


    return (
        <div className="bg-gray-100 font-sans">
            <header className="flex  bg-white shadow-lg">
                <img src={Mountains} alt="Imagen de encabezado" className="w-full h-80 object-cover" />
            </header>
            <div className="container mx-auto my-8 ">
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <div className='mb-4'>
                        <div>
                            <div className='flex justify-end'>
                                <button onClick={editPost}><TiEdit className='' /></button>
                            </div>
                        </div>
                        <h1 className='text-3xl font-bold mb-10 '>{post.titulo}</h1>
                    </div>
                    <div className=''>
                        <p className="text-gray-700 text-sm mb-4">{post.fechaPublicacion}</p>
                    </div>
                    <div className='mb-8'>
                        <div dangerouslySetInnerHTML={{ __html: descripcionSanitizada }}></div>
                    </div>
                    <article className=''>
                        {/* CONTENIDO DE LA DESCRIPCION*/}
                    </article>
                </div>
            </div>
        </div>
    );
};

export default SinglePost;

