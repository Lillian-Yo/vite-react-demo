import React from "react";
import { NavLink, Link } from 'react-router-dom';

import logo from '@/assets/images/logo.png';

import './NavBar.scss'

class NavBar extends React.Component {
    render() {
        // let historyState = window.location.pathname; 获取当前路由地址

        function changeTheme() {

            const classList = document.documentElement.classList;
            console.log(classList, '----classList')
            if (classList.value) {
                document.documentElement.classList.remove('dark');
                return;
            }
            document.documentElement.classList.add('dark');
        }



        return (
            <div className="home-nav flex-al just-bt">
                <div className="home-nav-lt flex-al">
                    <Link to="/">
                        <img src={logo} className="logo"></img>
                    </Link>
                    <div className="home-nav-list flex-al">
                        {
                            this.props.navList.map((item, index) => {
                                return (
                                    // 
                                    <NavLink
                                        className={({ isActive }) => isActive ? "home-nav-list-item active" : "home-nav-list-item"}
                                        to={item.path}
                                        key={index}
                                    >
                                        {item.title}
                                    </NavLink>
                                )
                            })
                        }
                    </div>
                </div>
                <div className="home-nav-rt flex-al">
                    <div onClick={changeTheme}>主题切换</div>
                    <div className="login-btn">Login</div>
                </div>
            </div>
        )
    }
}

export default NavBar