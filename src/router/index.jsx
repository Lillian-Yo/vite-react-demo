import HomeLoad from '@/components/Loading/HomeLoad/HomeLoad';

/**
 * @name 路由懒加载
*/


const Layout = lazy(() => import('@/containers/layout/layout'));
const Home = lazy(() => import('@/containers/home/home'));
const Record = lazy(() => import('@/containers/record/record'));
const NonePage = lazy(() => import('@/containers/404/index'));

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
        element: <NonePage />,
    }
];

export default routers