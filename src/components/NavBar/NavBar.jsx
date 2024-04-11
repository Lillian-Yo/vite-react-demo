import React, { useState } from "react";
import { NavLink, Link } from 'react-router-dom';

import ThemeToogle from '@/components/ThemeToogle/ThemeToogle'
import Container from "@/components/Container/Container";

import logo from '@/assets/images/logo.png';
import logoDark from '@/assets/images/logo_theme_dark.png';
import './NavBar.scss'

/**
 * @name 顶部导航栏组件
*/

export default function NavBar(props) {

    // 移动端 菜单状态初始化
    const [menuState, setMenuState] = useState(false);
    // 主题切换 状态初始化
    const [isDarkTheme, setIsDarkTheme] = useState(false);

    // 移动端 菜单按钮 点击事件
    const toggleMenu = () => {
        setMenuState(!menuState)
    }

    // 更改主题状态值
    const getThemeState = (data) => {
        setIsDarkTheme(data);
    }

    return (
        <div className="home-nav-wrap">
            <Container className="container">
                <div className="home-nav flex-al just-bt">
                    <div className="home-nav-lt flex-al">
                        <Link to="/">
                            <img src={isDarkTheme ? logoDark : logo} className="logo"></img>
                        </Link>
                        <div className="home-nav-list flex-al">
                            {
                                props.navList.map((item, index) => {
                                    return (
                                        <NavLink
                                            className={({ isActive }) => isActive ? "home-nav-list-item active" : "home-nav-list-item"}
                                            to={item.path}
                                            key={index}
                                            onClick={() => {
                                                let $loader = document.querySelector('.loader')
                                                $loader.classList.add('loader--active')
                                                setTimeout(() => {
                                                    $loader.classList.remove('loader--active')
                                                }, 1500)
                                            }}
                                        >
                                            {item.title}
                                        </NavLink>
                                    )
                                })
                            }
                        </div>

                    </div>
                    <div className="home-nav-rt flex-al">
                        <ThemeToogle getThemeState={getThemeState}></ThemeToogle>
                        <div className="login-btn">Login</div>
                        <div
                            className={menuState ? 'home-mobile-menu-btn active' : 'home-mobile-menu-btn'}
                            onClick={toggleMenu}
                        >
                            <span></span>
                        </div>
                        <ul
                            className={menuState ? 'home-mobile-menu-list show-list' : 'home-mobile-menu-list'}
                        >
                            {
                                props.navList.map((item, index) => {
                                    return (
                                        <li
                                            key={index}
                                        >
                                            <NavLink
                                                to={item.path}
                                                onClick={() => {
                                                    this.toggleMenu();
                                                    let $loader = document.querySelector('.loader')
                                                    $loader.classList.add('loader--active')
                                                    setTimeout(() => {
                                                        $loader.classList.remove('loader--active')
                                                    }, 1500)
                                                }}
                                            >
                                                {item.title}
                                            </NavLink>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                </div>
            </Container>
        </div>
    )
}