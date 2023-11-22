import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home'
import Addblog from './components/editor/Addblog'
import SinglePost from './pages/SinglePost';


function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path='/blogs' element={<Home/>}/>
        <Route path='/editar' element={<Addblog/>}/>
        <Route path='/editar/post/:id' Component={Addblog}/>
        <Route path='/post/:id' element={<SinglePost/>}/>
        
      </Routes>
    </BrowserRouter>
    
  )
}

export default App
