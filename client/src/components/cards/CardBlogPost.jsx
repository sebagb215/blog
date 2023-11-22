import React from 'react';
import { Link } from 'react-router-dom';
import DOMPurify from 'dompurify';


const CardBlogPost = ({ post }) => {
    
    const descripcionSanitizada = DOMPurify.sanitize(post.descripcion)

    return (
        <div className='flex justify-center my-5'>
            <div className='' key={post.id}>
                <Link to={`/post/${post.id}`}>
                    <div className='flex flex-wrap justify-center  max-w-sm '>
                        <div className='flex flex-col bg-gray-50 rounded-lg shadow-xl px-2 pt-5'>
                            <div>
                                <img alt="montañas" className='rounded-lg ' />
                            </div>
                            <div className='text-center'>
                                <div className='p-4'>
                                    <p className='font-serif text-2xl'>{post.titulo}</p>
                                </div>
                                <div className='text-left text-gray-400 p-2 mb-4'>
                                    <div dangerouslySetInnerHTML={{ __html: descripcionSanitizada }}></div>
                                </div>
                                <div className='text-left py-2'>
                                    <p className='text-gray-500 font-sans text-xs'> -- {post.fechaPublicacion}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default CardBlogPost;
