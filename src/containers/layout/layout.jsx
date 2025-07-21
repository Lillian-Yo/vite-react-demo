import Navbar from "@/components/NavBar/NavBar";
import PageLoad from '@/components/Loading/PageLoad/PageLoad';
import Container from "@/components/Container/Container";

import './layout.scss'

/**
 * @name 整体的页面布局
 * @param {Array} navList - 顶部导航列表
 *
*/

export default function Layout() {
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
        <div className="layout-wrap">
            <Navbar navList={navList} />
            <div className="layout-content">
                <Container>
                    <PageLoad />
                    <Outlet />
                </Container>
            </div>
        </div>
    )
}