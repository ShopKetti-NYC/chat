import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import LogIn from './Pages/LogIn'
import Signup from './Pages/Signup'
export default function App() {
    return (
        <BrowserRouter>
        <LogIn/>
        <LogIn/>

        </BrowserRouter>
    )
}