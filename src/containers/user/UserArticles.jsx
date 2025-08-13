import { useParams, useNavigate } from 'react-router-dom';

export default function UserArticles() {
  const { userId } = useParams();
  const navigate = useNavigate();

  // 模拟用户文章数据
  const articles = [
    { id: 1, title: '文章1', content: '这是用户文章1的内容' },
    { id: 2, title: '文章2', content: '这是用户文章2的内容' },
    { id: 3, title: '文章3', content: '这是用户文章3的内容' },
  ];

  return (
    <div>
      <h1>用户 {userId} 的文章列表</h1>
      <ul>
        {articles.map(article => (
          <li key={article.id}>
            <h3>{article.title}</h3>
            <p>{article.content}</p>
            <button onClick={() => navigate(`/article/${article.id}`)}>
              查看文章详情
            </button>
          </li>
        ))}
      </ul>
      <button onClick={() => navigate(`/user/${userId}`)}>
        返回用户详情
      </button>
    </div>
  );
} 