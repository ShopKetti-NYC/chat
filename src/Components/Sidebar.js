import React from 'react';
import { BrowserRouter } from 'react-router-dom'; 
// import './app_sidebar.scss'; 
import Tabs from './Tabs';
import Search from './Search';
 
export default function () {
    return (
        <div className="app_sidebar">
        <BrowserRouter>
        <Tabs/>
        <Search/>
        </BrowserRouter>
        </div>
    )
}