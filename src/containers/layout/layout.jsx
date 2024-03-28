import React from "react";
import { Outlet } from 'react-router-dom';
import { connect } from "react-redux";

import { setLoading } from '@/reducers/actions/actions'

import Navbar from "@/components/NavBar/NavBar";

import './layout.scss'

@connect(
    state => ({ isLoading: state.loading.isLoading }),
    { setLoading }
)

// const mapStateToProps = (state) => {
//     console.log(state, 3333)
//     return {
//         isLoading: state.loading.isLoading
//     }
// }

class Layout extends React.Component {

    // componentDidMount() {}

    render() {
        // console.log(this.props.isLoading, '----this.state.isLoading')

        // const showLoading = this.props.isLoading;

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