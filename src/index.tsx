import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Timer from './Timer';
import Bookkeeping from './Bookkeeping';
import AboutMe from './AboutMe';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/timer" element={<Timer />} />
                <Route path="/bookkeeping" element={<Bookkeeping />} />
                <Route path="/about" element={<AboutMe />} />
            </Routes>
        </BrowserRouter>
    </React.StrictMode>
);