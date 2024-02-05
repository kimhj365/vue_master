import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import mixins from './mixins.js'
import store from './store.js'

// 믹스인 적용
createApp(App)
.use(router)
.use(store)
.mixin(mixins)
.mount('#app')
