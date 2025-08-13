import { useParams, useNavigate, useSearchParams } from 'react-router-dom';

export default function SearchPage() {
  const { keyword } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const handleSearch = (newKeyword) => {
    if (newKeyword) {
      navigate(`/search/${newKeyword}`);
    } else {
      navigate('/search');
    }
  };

  return (
    <div>
      <h1>搜索页面</h1>
      {keyword ? (
        <div>
          <p>搜索关键词: {keyword}</p>
          <p>搜索结果: 找到与 "{keyword}" 相关的 5 个结果</p>
        </div>
      ) : (
        <p>请输入搜索关键词</p>
      )}
      
      <div>
        <input 
          type="text" 
          placeholder="输入搜索关键词"
          defaultValue={keyword || ''}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              handleSearch(e.target.value);
            }
          }}
        />
        <button onClick={() => handleSearch(document.querySelector('input').value)}>
          搜索
        </button>
      </div>
      
      <button onClick={() => navigate('/home')}>
        返回首页
      </button>
    </div>
  );
} 