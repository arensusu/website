import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Timer from './Timer';
import Bookkeeping from './Bookkeeping';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/website" element={<Home />} />
                <Route path="/timer" element={<Timer />} />
                <Route path="/bookkeeping" element={<Bookkeeping />} />
            </Routes>
        </BrowserRouter>
    </React.StrictMode>
);