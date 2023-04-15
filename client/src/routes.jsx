import { Route, Routes } from 'react-router-dom';
import React from 'react';
import MainPages from './Pages/MainPages/MainPage';
import './App.css'

function useRoutes() {
    return (
        <div className='container'>
            <Routes>
                <Route path="/" element={<MainPages />} />
            </Routes>
        </div>
    )
}

export default useRoutes