import i18n from "@i18n";
import { useLang } from "@global";
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
export default function Home() {
  const lang = useLang();
  const queryClient = useQueryClient();
  const {
    data,
    isLoading,
    error
  } = useQuery({
    queryKey: ['todos', lang],
    // 缓存 key
    queryFn: () => fetch(`http://localhost:3000/todos?locale=${lang}`).then(res => res.json()).then(json => {
      return json;
    })
  });

  // 修改
  const mutation = useMutation({
    mutationFn: newTodo => fetch('http://localhost:3000/todo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newTodo)
    }),
    onSuccess: () => {
      // 错误处理和刷新
      queryClient.invalidateQueries(["todos"]);
    }
  });
  if (isLoading) return /*#__PURE__*/React.createElement("div", null, i18n.t("\u52A0\u8F7D\u4E2D..."));
  if (error) return /*#__PURE__*/React.createElement("div", null, i18n.t("\u51FA\u9519\u4E86"));
  const todos = Array.isArray(data) ? data : data?.todos ?? [];
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("ul", null, todos.map(todo => /*#__PURE__*/React.createElement("li", {
    key: todo.id
  }, todo.text))), /*#__PURE__*/React.createElement("p", null, i18n.t("\u4F60\u597D")), /*#__PURE__*/React.createElement("p", null, i18n.t("\u6B22\u8FCE\u4F7F\u7528\u6211\u7684\u5E94\u7528")), /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      // mutation.mutate({
      //   text: "Do Laundry"
      // });
      const current = i18n.language;
      i18n.changeLanguage(current === 'en' ? 'zh-cn' : 'en');
    }
  }, i18n.t("\u5207\u6362\u8BED\u8A00")), /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      mutation.mutate({
        text: "Do Laundry"
      });
    }
  }, i18n.t("\u52A0\u8F7D\u5185\u5BB9")));
}
