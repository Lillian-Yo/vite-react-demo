import React from "react";
import { NavLink, useLocation, matchRoutes } from 'react-router-dom';

class NavBar extends React.Component {
    render() {
        // let historyState = window.location.pathname; 获取当前路由地址
        return (
            <div className="home-nav h-16 flex items-center bg-gray-800">
                <div className="px-2 sm:px-6 lg:px-8 space-x-4">
                    {

                        this.props.navList.map((item, index) => {
                            return (
                                // 
                                <NavLink
                                    className={({ isActive }) => isActive ? " home-nav-item px-3 py-2 text-white rounded-md bg-gray-900" : "hover:bg-gray-700 hover:text-white rounded-md home-nav-item px-3 py-2 text-gray-300"}
                                    to={item.path}
                                    key={index}
                                >
                                    <span>{item.title}</span>
                                </NavLink>
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}

export default NavBar