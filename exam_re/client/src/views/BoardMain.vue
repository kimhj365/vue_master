<!-- App.vue의 기능 흡수 => 회원 입장에서의 main화면 역할 -->
<template>
  <div>
    <Header />
    <router-view :key="$route.fullPath"/>
    <Footer />
  </div>
</template>
<script>
  import Header from '../layouts/Header.vue';
  import Footer from '../layouts/Footer.vue';

  export default {
    components  : { Header, Footer }
  }
</script>
