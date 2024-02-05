<template>
  <nav>
    <h1>{{ getToday }}</h1> <!--프로퍼티 호출-->
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link> |
    <router-link to="/board">게시판</router-link> |
    <router-link to="/todo">Todo</router-link> |
    <router-link to="/store">Store</router-link>
  </nav>
  <router-view/>
</template>

<script>
import mix from '../src/mixins.js'
export default {
  // 컴포넌트 별로 다르게 하고 싶을때(전역X)
  mixins: [mix],
  data() {
    return{
      rootData: 'hello' // this.data.rootData
    }
  },
  provide() {
    return {
      rootList: 'Hello, Hello, Hello', 
      rootStr: 'World'
    }
  },
  // computed: 연산하는 결과값(readonly)
  //           computed에 정의된 데이터 옵션 프로퍼티를 변경
  //           
  //methods: 기능(리턴 없어도 됨) / computed : 값(리턴 필수)
  computed: {
    getToday() {
      // $ : mixins에 선언된 함수
      return this.$getToday('yyyy/MM/dd');
    }
  }
}
</script>

<style>
@import url("../src/assets/style.css");

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
