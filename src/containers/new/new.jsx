import {useSelector, useDispatch} from 'react-redux';
import {increment, decrement} from '../../store/slices/counterSlice';
import {useState} from 'react';

export default function New() {
  // 通过useSelector直接拿到store中定义的value
  const {value} = useSelector((store)=>store.counter)
  // 通过useDispatch 派发事件
  const dispatch = useDispatch()
   // 变量
  const [amount, setAmount] = useState(1)

  const handleAmountChange = (e) => {
    const value = e.target.value;
    // 只允许数字输入，空字符串时设为0
    if (value === '' || isNaN(value)) {
      setAmount(1);
    } else {
      setAmount(parseInt(value) || 1);
    }
  };

  return (
    <div style={{padding: '20px', fontFamily: 'Arial, sans-serif'}}>
      <div style={{marginBottom: '20px'}}>
        <span style={{marginRight: '10px', fontSize: '18px'}}>{value}</span>
        <input 
          type="number" 
          value={amount}
          name="amount"
          style={{
            width: '100px', 
            height: '30px',
            padding: '5px 10px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            fontSize: '14px',
            outline: 'none',
            visibility: 'visible'
          }}
          onChange={handleAmountChange}
          min="0"
        />
      </div>
      <div>
        <button 
          onClick={()=>{dispatch(increment({value: 1}))}}
          style={{
            marginRight: '10px',
            padding: '8px 16px',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          加
        </button>
        <button 
          onClick={()=>{dispatch(decrement({value: 1}))}}
          style={{
            padding: '8px 16px',
            backgroundColor: '#f44336',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          减
        </button>
      </div>
    </div>
  );
}
