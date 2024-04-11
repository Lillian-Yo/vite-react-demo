import React from "react";

import './PageLoad.scss';

/**
 * @name 页面跳转过渡动画
*/


class PageLoad extends React.Component {
    render() {
        return (
            <div className="loader" id="loader">
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