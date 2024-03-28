import React from "react";
import { NavLink, Link } from 'react-router-dom';
import { connect } from "react-redux";

import { setLoading } from '@/reducers/actions/actions'

import logo from '@/assets/images/logo.png';
import ThemeToogle from '@/components/ThemeToogle/ThemeToogle'

import './NavBar.scss'

const mapDispatchToProps = (dispatch) => {
    return {
        setLoading: (flag) => dispatch(setLoading(flag))
    }
}

class NavBar extends React.Component {

    render() {
        // let historyState = window.location.pathname; 获取当前路由地址
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
                                    <NavLink
                                        className={({ isActive }) => isActive ? "home-nav-list-item active" : "home-nav-list-item"}
                                        to={item.path}
                                        key={index}
                                        onClick={() => {
                                            // this.props.setLoading(true);
                                            let $loader = document.querySelector('.loader')
                                            $loader.classList.add('loader--active')
                                            setTimeout(() => {
                                                // this.props.setLoading(false);
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
                    <ThemeToogle></ThemeToogle>
                    <div className="login-btn">Login</div>
                </div>
            </div>
        )
    }
}

export default connect(mapDispatchToProps)(NavBar)