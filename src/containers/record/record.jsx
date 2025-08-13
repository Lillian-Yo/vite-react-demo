import { useStore } from './usestore';
import { useEffect, useState } from 'react';

export default function Record() {
  // 在这里引入所需状态
  const { count, inc, addFruits, fruits, items, fetchItems } = useStore();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadItems = async () => {
      setIsLoading(true);
      try {
        await fetchItems();
      } catch (error) {
        console.error('Failed to fetch items:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadItems();
  }, []); // 添加依赖数组，避免无限循环

  return (
    <div>
      <div>Count: {count}</div>
      
      <div>
        <h3>Fruits:</h3>
        {fruits.map((fruit, index) => (
          <div key={index}>{fruit}</div>
        ))}
      </div>
      
      <div>
        <h3>Items:</h3>
        {isLoading ? (
          <div>Loading items...</div>
        ) : Array.isArray(items) && items.length > 0 ? (
          items.map((item, index) => (
            <div key={index}>{item.value}</div>
          ))
        ) : (
          <div>No items found</div>
        )}
      </div>
      
      <input
        style={{visibility: 'visible', width: '100px', height: '30px'}}
        onBlur={(event) => {
          addFruits(event.target.value);
        }}
      />
      <button onClick={inc}>增加</button>
    </div>
  );
}
