import { useParams, useNavigate } from 'react-router-dom';

export default function CategoryProduct() {
  const { categoryId, productId } = useParams();
  const navigate = useNavigate();

  return (
    <div>
      <h1>分类产品页面</h1>
      <p>分类ID: {categoryId}</p>
      <p>产品ID: {productId}</p>
      <p>分类名称: 分类 {categoryId}</p>
      <p>产品名称: 产品 {productId}</p>
      <p>产品价格: ¥{Math.floor(Math.random() * 1000) + 100}</p>
      
      <div>
        <button onClick={() => navigate(`/category/${categoryId}`)}>
          查看分类其他产品
        </button>
        <button onClick={() => navigate(`/product/${productId}`)}>
          查看产品详情
        </button>
        <button onClick={() => navigate('/home')}>
          返回首页
        </button>
      </div>
    </div>
  );
} 