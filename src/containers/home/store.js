
import {action, makeObservable, observable, computed, runInAction} from 'mobx'
class Counter {
  count = 0
  constructor(){
    makeObservable(this, {
       count: observable,//observable指定监听的属性
       increment: action,//action指定修改属性的方法
       decrement: action,
       asyncAdd: action,
       autoADD: computed//computed指定计算属性方法
     })
  }
  increment(num){
    this.count += num
    console.log(this.count)
  }
  decrement(num){
    this.count -= num
  }
  get autoADD() {
    return this.count+1
  }
  asyncAdd() {
    setTimeout(() => {
      runInAction(() => {
        this.count+=100
        console.log(this.count);
      })
    }, 2000);
   }
}
const counter = new Counter()
export default counter