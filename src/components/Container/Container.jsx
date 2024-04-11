import React from "react";

import './Container.scss'

/**
 * @name 容器组件
 * @description 用于适配不同屏幕的容器，控制宽度
*/

export default function Container(props) {
    return (
        <div className="container">
            {props.children}
        </div>
    )
}