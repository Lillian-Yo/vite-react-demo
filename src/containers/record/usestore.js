
import { create } from "zustand";

// create（）：存在三个参数，第一个参数为函数，第二个参数为布尔值
// 第一个参数：(set、get、api)=>{…}
// 第二个参数：true/false 
// 若第二个参数不传或者传false时，则调用修改状态的方法后得到的新状态将会和create方法原来的返回值进行融合；
// 若第二个参数传true时，则调用修改状态的方法后得到的新状态将会直接覆盖create方法原来的返回值。

export const useStore = create((set, get) => ({
  count: 0,
  setCount: (num) => set({ count: num }),
  inc: () => set((state) => ({ count: state.count + 1 })),
  fruits: ['apple', 'banana', 'orange'],
  addFruits: (fruit) => {
    set(state => ({
      fruits: [...state.fruits, fruit]
    }));
  },
  items: [],
  fetchItems: async () => {
    try {
      const response = await fetch('http://localhost:3000/items');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const {items} = await response.json();
      // 确保 items 是数组
      if (Array.isArray(items)) {
        set({ items });
      } else {
        console.error('API returned non-array data:', items);
        set({ items: [] });
      }
    } catch (error) {
      console.error('Failed to fetch items:', error);
      set({ items: [] });
    }
  },
}));