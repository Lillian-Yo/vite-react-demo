import { lazy } from 'react';
import HomeLoad from '@/components/Loading/HomeLoad/HomeLoad';

/**
 * @name 路由懒加载
*/

const Layout = lazy(() => import('@/containers/layout/layout'));
const Home = lazy(() => import('@/containers/home/home'));
const New = lazy(() => import('@/containers/new/new'));
const Record = lazy(() => import('@/containers/record/record'));
const NonePage = lazy(() => import('@/containers/404/nonePage'));

// 动态路由组件
const UserDetail = lazy(() => import('@/containers/user/UserDetail'));
const ArticleDetail = lazy(() => import('@/containers/article/ArticleDetail'));
const ProductDetail = lazy(() => import('@/containers/product/ProductDetail'));
const UserArticles = lazy(() => import('@/containers/user/UserArticles'));
const SearchPage = lazy(() => import('@/containers/search/SearchPage'));
const CategoryProduct = lazy(() => import('@/containers/category/CategoryProduct'));

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
            {
                path: 'new',
                element: <New />
            },
            // 动态路由 - 用户详情页
            {
                path: 'user/:userId',
                element: <UserDetail />
            },
            // 动态路由 - 文章详情页
            {
                path: 'article/:articleId',
                element: <ArticleDetail />
            },
            // 动态路由 - 产品详情页
            {
                path: 'product/:productId',
                element: <ProductDetail />
            },
            // 嵌套动态路由 - 用户文章列表
            {
                path: 'user/:userId/articles',
                element: <UserArticles />
            },
            // 可选参数路由 - 搜索页面
            {
                path: 'search/:keyword?',
                element: <SearchPage />
            },
            // 多参数路由 - 分类商品
            {
                path: 'category/:categoryId/product/:productId',
                element: <CategoryProduct />
            }
        ]
    },
    {
        path: '*',
        element: <NonePage />,
    }
];

export default routers