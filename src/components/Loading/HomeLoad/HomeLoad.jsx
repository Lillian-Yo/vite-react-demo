import React, { useEffect } from "react";
import LoadAnime from '@/components/Loading/HomeLoad/LoadAnime';
import './HomeLoad.scss';
import { Link } from "react-router-dom";

/**
 * @name 首页预加载动画
*/

class HomeLoad extends React.Component {
    componentDidMount() {
        LoadAnime();
    }

    render() {

        return (
            <>
                <div className="HomeLoad-content">
                    <h1 className="effect1">hello, my name is Jacinda, welcome!</h1>
                    <p className="text">nice to meet you ☺</p>
                    <p className="text btn">
                        <Link
                            to="/home"
                            onClick={() => {
                                let $loader = document.querySelector('.loader')
                                $loader.classList.add('loader--active')
                                setTimeout(() => {
                                    $loader.classList.remove('loader--active')
                                }, 1500)
                            }}
                        >点击进入</Link>
                    </p>

                </div>

                <section>
                    <div className="item"></div>
                    <div className="item"></div>
                    <div className="item"></div>
                    <div className="item"></div>
                    <div className="item"></div>
                    <div className="item"></div>
                    <div className="item"></div>
                    <div className="item"></div>
                    <div className="item"></div>
                    <div className="item"></div>
                </section>
            </>
        )
    }
}

export default HomeLoad