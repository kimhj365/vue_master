import Main from '../views/Main.vue';
import CommonMain from '../views/CommonMain.vue';
import MainChild from '../views/MainChild.vue';

export default {
  path: '/',
  name: 'home',
  component: CommonMain,
  redirect: 'main',
  children : [
    {
      path: 'main',
      name: 'commonMain',
      component: Main,
      children: [
        {
          path: 'list',
          name: 'MainChild',
          component: MainChild
        }
      ]
    }
  ]
}