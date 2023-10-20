import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
axios.defaults.baseURL = '/api'

import './assets/css/index.css'

import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)
console.log(app.config);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
// 定义懒加载图片或者文件等，自定义指令
app.directive('lazy', (el, binding) => {
  console.log('这里执行');
  let oldSrc = el.src //保存旧的src，方便后期渲染时候赋值src真实路径
  el.src = "" //将渲染的src赋为空，则不会渲染图片出来
  let observer = new IntersectionObserver(([{ isIntersecting }]) => { // 调用方法得到该elDOM元素是否处于可视区域
    if (isIntersecting) { //回调是否处于可视区域，true or false
      el.src = oldSrc //如果处于可视区域额，将最开始保存的真实路径赋予DOM元素渲染
      observer.unobserve(el) // 只需要监听一次即可，第二次滑动到可视区域时候不在监听
    }
  })
  observer.observe(el) // 调用方法
})
app.use(store).use(router).mount('#app')
