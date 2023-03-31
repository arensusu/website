import React from 'react';
import ReactDOM from 'react-dom/client';
import { Route, HashRouter, Routes } from 'react-router-dom';
import './index.css';
import Home from './Home';
import Timer from './Timer';
import Bookkeeping from './Bookkeeping';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <HashRouter>
            <Routes>
                <Route path='/' element={ <Home/> } />
                <Route path='/Timer' element={ <Timer/> } />
                <Route path='/Bookkeeping' element={ <Bookkeeping /> } />
            </Routes>
        </HashRouter>
    </React.StrictMode>
);