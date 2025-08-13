import {Link} from 'react-router-dom';
export default function Aritcle() {

    return (<div style={{ marginTop: '20px', padding: '20px', border: '1px solid #ccc' }}>
        <h3>动态路由测试</h3>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <Link to="/user/123" style={{ padding: '5px 10px', border: '1px solid #007bff', borderRadius: '4px', textDecoration: 'none' }}>
            用户详情 (ID: 123)
            </Link>
            <Link to="/article/456" style={{ padding: '5px 10px', border: '1px solid #28a745', borderRadius: '4px', textDecoration: 'none' }}>
            文章详情 (ID: 456)
            </Link>
            <Link to="/product/789" style={{ padding: '5px 10px', border: '1px solid #ffc107', borderRadius: '4px', textDecoration: 'none' }}>
            产品详情 (ID: 789)
            </Link>
            <Link to="/user/123/articles" style={{ padding: '5px 10px', border: '1px solid #dc3545', borderRadius: '4px', textDecoration: 'none' }}>
            用户文章列表
            </Link>
            <Link to="/search/react" style={{ padding: '5px 10px', border: '1px solid #6f42c1', borderRadius: '4px', textDecoration: 'none' }}>
            搜索页面
            </Link>
            <Link to="/category/1/product/100" style={{ padding: '5px 10px', border: '1px solid #fd7e14', borderRadius: '4px', textDecoration: 'none' }}>
            分类产品
            </Link>
        </div>
    </div>)
}