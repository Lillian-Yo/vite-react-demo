import React from "react";

import './PageLoad.scss';

class PageLoad extends React.Component {
    render() {
        return (
            <div className="loader loader--active">
                <div className="loader__tile"></div>
                <div className="loader__tile"></div>
                <div className="loader__tile"></div>
                <div className="loader__tile"></div>
                <div className="loader__tile"></div>
            </div>
        )
    }
}

export default PageLoad