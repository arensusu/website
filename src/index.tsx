import React from 'react';
import ReactDOM from 'react-dom/client';
import { Route, HashRouter, Routes } from 'react-router-dom';
import './index.css';
import Home from './Home';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <HashRouter>
            <Routes>
                <Route path='/' element={ <Home/> } />
            </Routes>
        </HashRouter>
    </React.StrictMode>
);