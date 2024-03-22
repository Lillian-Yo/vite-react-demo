import React from "react";
import { Outlet } from 'react-router-dom';

import Navbar from "@/components/NavBar/NavBar";

import './layout.scss'

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
            {
                title: 'Tet',
                path: '/rd'
            },
            {
                title: 'Ord',
                path: '/ord'
            },
        ];
        return (
            <div className="wrap">
                <Navbar navList={navList} />
                <div className="container">
                    <Outlet />
                </div>
            </div>
        )
    }
}

export default Layout