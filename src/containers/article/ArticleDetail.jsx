import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getArticleData } from './articleSlice';
import {useParams} from 'react-router-dom';

export default function ArticleDetail(props) {
  console.log(useParams());
  const { title, value } = useSelector(state => state.article);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getArticleData());
  }, []);

  return (
    <div>
      <h1>文章详情页</h1>
      <p>{title}</p>
      <p>{value}</p>
    </div>
  );
} 