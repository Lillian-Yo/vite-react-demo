import { Navigate } from 'react-router-dom';
import { lazy } from 'react';

import HomeLoad from '@/components/Loading/HomeLoad/HomeLoad';

/**
 * @name 路由懒加载
*/


const Layout = lazy(() => import('@/containers/layout/layout'));
const Home = lazy(() => import('@/containers/home/home'));
const Record = lazy(() => import('@/containers/record/record'));

/**
 * @name 路由配置 
*/

let routers = [
    {
        path: '',
        element: <HomeLoad />
    },
    {
        path: '/',
        element: <Layout />,
        children: [
            
            {
                path: 'home',
                element: <Home />
            },
            {
                path: 'record',
                element: <Record />
            },
        ]
    },
    {
        path: '*',
        element: <Navigate to="/home" />,
    }
];

export default routers