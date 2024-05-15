import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import '@logicflow/core/dist/style/index.css';
import TDesign from 'tdesign-vue-next';
// 引入组件库的少量全局样式变量
import 'tdesign-vue-next/es/style/index.css';
// import 'default-passive-events'
createApp(App).use(TDesign).mount('#app')
