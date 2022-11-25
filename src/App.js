import './App.css';
import React from 'react';
import {Routes,BrowserRouter,Route} from "react-router-dom"
import Home from './pages/Home';
import About from './pages/About';
import AddEditBlog from './pages/AddEditBlog';
import Blog from './pages/Blog';
import NotFound from './pages/NotFound';
  import { ToastContainer } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header';




function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Header/>
      <ToastContainer/>
<Routes>
  <Route path='/'  element={<Home/>} />
  
  <Route path='/addBlog'  element={<AddEditBlog/>} />
  <Route path='/editBlog/:id'  element={<AddEditBlog/>} />
  <Route path='/blogS/:id'  element={<Blog/>} />
  <Route path='/about'  element={<About/>} />
  <Route path='*' element={<NotFound/>}/>
</Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
