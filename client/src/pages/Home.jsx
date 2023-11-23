import React, { useState, useEffect } from 'react';
import CardBlogPost from '../components/cards/CardBlogPost';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';
import Addblog from '../components/editor/Addblog';



const Home = () => {

    const [posts, setPosts] = useState([]);
    const location = useLocation()
    console.log(location)





    //OBTENER TODOS LOS POST DE LA BASE DE DATOS
    useEffect(() => {
        axios
            .get('http://localhost:8080/blogs') //ruta del servidor backend 8080
            .then((res) => {
                if (res.data.length === 0) {
                    setPosts([]);
                } else {
                    setPosts(res.data);
                    console.log(res.data);
                }
            })
            .catch((error) => {
                console.error('Error al obtener datos:', error);
            });
    }, []);

    return (
        <div className='container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10'>
            {posts.map((post) => (
                <CardBlogPost key={post.id} post={post} />
            ))}

        </div>
    );
};

export default Home;
