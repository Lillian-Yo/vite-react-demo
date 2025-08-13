import {useQuery, useMutation, useQueryClient} from '@tanstack/react-query';
import {useLang} from '@global';
import {observer} from 'mobx-react-lite';
import Article from './article';
import MyForm from '../form';
import {Select, Table, Input} from 'antd';
import {HighlightText, makeOptionRenderHighlighter} from '../../components/Highlight/Highlight';
import {useState} from 'react';

const highlightClass = 'yellow'

const Home = observer(() => {

  const queryClient = useQueryClient();
  const lang = useLang();
  // const { data, isLoading, error } = useQuery({
  //   queryKey: ['todos', lang],   // 缓存 key
  //   queryFn: () => fetch(`http://localhost:3000/todos?locale=${lang}`)
  //   .then(res => res.json())
  //   .then(json => {
  //     return json;
  //   })
  // });

  // 修改
  const mutation = useMutation({
    mutationFn: newTodo =>
    fetch('http://localhost:3000/todo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newTodo),
    }),
    onSuccess: () => {
      // 错误处理和刷新
      queryClient.invalidateQueries(["todos"]);
    },
  });
  const [searchValue, setSearchValue] = useState('');

  const options = [
    { value: '1', label: 'Jack' },
    { value: '2', label: 'Lucy' },
    { value: '3', label: 'Tom' },
  ];

  const dataSource = [
    {
      key: '1',
      name: '胡彦斌',
      age: 32,
      address: '西湖区湖底公园1号',
    },
    {
      key: '2',
      name: '胡彦祖',
      age: 42,
      address: '西湖区湖底公园1号',
    },
  ];
  
  const columns = [
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <HighlightText keyword={searchValue} classname={highlightClass}>{text}</HighlightText>,
    },
    {
      title: '年龄',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: '住址',
      dataIndex: 'address',
      key: 'address',
    },
  ];
  

  // if (isLoading) return <div>加载中...</div>;
  // if (error) return <div>出错了</div>;

  // const todos = Array.isArray(data) ? data : data?.todos ?? [];
  // const optionRender = makeOptionRenderHighlighter({ query: searchValue });

  return (
    <div>
      <Input value={searchValue} onChange={e => {
        setSearchValue(e.target.value)
        }
      }/>
       <Select
          showSearch
          style={{ width: '100px' }}
          onSearch={setSearchValue} 
          options={options}           // 注意：options[i].label 保持为 string
          optionFilterProp="label"    // 用 label 做过滤
          optionRender={ option =>
            <HighlightText keyword={searchValue} classname={highlightClass} text={option.label}></HighlightText>
          }
        />
        <Table dataSource={dataSource} columns={columns} />;
      {/* <ul>
        {todos.map((todo) => (
          <li key={todo.id}>{todo.text}</li>
        ))}
      </ul>
      <button
        onClick={() => {
          const current = i18n.language;
          i18n.changeLanguage(current === 'en' ? 'zh-cn' : 'en');
        }}
      >
        切换语言
      </button>
      <button
        onClick={() => {
          mutation.mutate({
            text: "Do Laundry"
          });
        }}
      >
        加载内容
      </button> */}
      {/* <MyForm /> */}
      {/* <Article/> */}
  </div>
  );
});

export default Home;
