<template>
  <!-- 클래스 정의 -->
  <!-- 1. text-->
  <div class="container" v-bind:class="simpleClass">
    Hello1
  </div>

  <!-- 2. T/F-->
  <div class="container" v-bind:class="{active: activeValue, 'text-red': redValue}">
    Hello2
  </div>

  <!-- 3. 배열 -->
  <div class="container" v-bind:class="[activeClass, redClass]">
    Hello3
  </div>

  <!-- 스타일 -->
  <!-- 1. 스타일 속성 -->
  <div style="color: red; background: yellow;">
    style1
  </div>

  <!-- 2. 객체 -->
  <div v-bind:style="{color: att1, background: att2}">
    style2
  </div>

  <!-- 3. 변수 -->
  <div v-bind:style="colorStyle">
    style3
  </div>

</template>

<script>
export default{
  data(){
    return {
      // 클래스 정의
      // 1. text
      simpleClass :'active text-red',
      // 2. T/F
      activeValue: true, 
      redValue: true,
      // 3. 배열
      activeClass: 'active',
      redClass: 'text-red',

      // 스타일
      // 2. 객체
      att1: "red",
      att2: "yellow",
      // 3. 변수
      // colorStyle:'color: red; background: yellow;'
      colorStyle: {
        color: "red",
        background: "yellow"
      }
    }
  },
  // lifecycle hook
  beforeMount(){
    console.log(this);
  },
  mounted(){
    console.log(this);
  },
  methods: { // 이벤트 실행함수

  }
}

</script>

<style>
  .container{
    width : 100%;
    height : 50px;
  }
  .active{
    background-color: yellow;
    font-weight: bold;
  }
  .text-red{
    color:red;
  }
</style>