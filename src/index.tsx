import React from 'react';
import ReactDOM from 'react-dom/client';
import { Route, HashRouter, Routes } from 'react-router-dom';
import './index.css';
import Home from './Home';
import Timer from './Timer';
import Bookkeeping from './Bookkeeping';
import AboutMe from './AboutMe';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <HashRouter>
            <Routes>
                <Route path='/' element={ <Home/> } />
                <Route path="/about" element={ <AboutMe /> } />
                <Route path='/timer' element={ <Timer/> } />
                <Route path='/bookkeeping' element={ <Bookkeeping /> } />
            </Routes>
        </HashRouter>
    </React.StrictMode>
);