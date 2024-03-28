import React, { useEffect } from "react";
import LoadAnime from '@/components/Loading/HomeLoad/LoadAnime';
import './HomeLoad.scss';

class HomeLoad extends React.Component {
    componentDidMount() {
        LoadAnime();
    }

    render() {

        return (
            <>
                <div className="container">
                    <h1 className="effect1">hello there, welcome!</h1>
                    <p className="text">nice to meet you ☺</p>
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