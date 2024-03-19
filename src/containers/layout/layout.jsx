import React from "react";
import { Routes, Route, Outlet, Navigate } from 'react-router-dom';

import Navbar from "@/components/NavBar/NavBar";
import Home from '@/containers/home/home'
import Record from '@/containers/record/record'

class Layout extends React.Component {
    render() {
        const navList = [
            {
                title: 'Home',
                path: '/home'
            },
            {
                title: 'Record',
                path: '/record'
            },
        ];
        return (
            <div className="wrap">
                <Navbar navList={navList} />
                <Outlet />
                <Routes>
                    <Route path="/" element={<Navigate to="/home" />}></Route>
                    <Route path="/home" element={<Home />}></Route>
                    <Route path="/record" element={<Record />}></Route>
                </Routes>
            </div>
        )
    }
}

export default Layout