import { useParams, useNavigate } from 'react-router-dom';

export default function UserDetail() {
  const { userId } = useParams();
  const navigate = useNavigate();

  return (
    <div>
      <h1>用户详情页</h1>
      <p>用户ID: {userId}</p>
      <button onClick={() => navigate(`/user/${userId}/articles`)}>
        查看用户文章
      </button>
      <button onClick={() => navigate('/home')}>
        返回首页
      </button>
    </div>
  );
} 