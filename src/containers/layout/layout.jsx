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
            title: 'Mobx',
            path: '/home'
        },
        {
            title: 'Zustand',
            path: '/record'
        },
        {
            title: 'RTK',
            path: '/new'
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