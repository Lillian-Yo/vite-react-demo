import { useParams, useNavigate } from 'react-router-dom';

export default function ProductDetail() {
  const { productId } = useParams();
  const navigate = useNavigate();

  return (
    <div>
      <h1>产品详情页</h1>
      <p>产品ID: {productId}</p>
      <p>产品名称: 产品 {productId}</p>
      <p>产品价格: ¥{Math.floor(Math.random() * 1000) + 100}</p>
      <button onClick={() => navigate('/home')}>
        返回首页
      </button>
    </div>
  );
} 