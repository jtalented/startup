import React from 'react';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { Play } from './play/play';
import { Prompts } from './prompts/prompts';
import { About } from './about/about';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path='/play' element={<Play />} />
          <Route path='/prompts' element={<Prompts />} />
          <Route path='/about' element={<About />} />
          <Route path='/*' element={<Login />} />
        </Routes>
    </BrowserRouter>
  );
}

function NotFound() {
  return <main className='container-fluid bg-secondary text-center'>404: Return to sender. Address unknown.</main>;
}

export default App;