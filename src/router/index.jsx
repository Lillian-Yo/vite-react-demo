import { Navigate } from 'react-router-dom';
import { lazy } from 'react';

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
        path: '/',
        element: <Layout />,
        children: [
            {
                path: '',
                element: <Navigate to="/home" />
            },
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