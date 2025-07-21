import {useQuery, useMutation, useQueryClient} from '@tanstack/react-query';

export default function Home() {
    const queryClient = useQueryClient();
    const { data, isLoading, error } = useQuery({
      queryKey: ['todos', lang],   // 缓存 key
      queryFn: () => fetch(`http://localhost:3000/todos?locale=${lang}`)
      .then(res => res.json())
      .then(json => {
        console.log('json:', json);
        return json;
      })
    });

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

  if (isLoading) return <div>加载中...</div>;
  if (error) return <div>出错了</div>;

  const todos = Array.isArray(data) ? data : data?.todos ?? [];

  return (
    <div>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>{todo.text}</li>
        ))}
      </ul>
      <p>你好</p>
      <p>欢迎使用我的应用</p>
      <button
        onClick={() => {
          // mutation.mutate({
          //   text: "Do Laundry"
          // });
          const current = i18n.language;
          i18n.changeLanguage(current === 'en' ? 'zh' : 'en');
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
      </button>
  </div>
  );
}
