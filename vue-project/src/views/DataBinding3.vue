<template>
  <label>선택: <input type="checkbox" true-value="yes" false-value="no" v-model="checked"></label>
  <p>선택값: {{ checked }}</p>

  <label>text속성: <input type="text" v-bind:value="ival"></label>
  <p>값: {{ ival }}</p>

  <!-- v-bind: attribute의 값을 바인딩 -->
  <img v-bind:src="imgSrc" v-bind:width="imgWidth">
  <input type="text" v-model="textStr">
  <button v-bind:disabled="textStr == ''">Click</button>
</template>

<script>
export default{
  data(){
    return {
      checked: "yes",
      ival: "sample",
      checkVal: true,
      imgSrc: 'https://kr.vuejs.org/images/logo.png',
      imgWidth: "100px",
      isTrue : true,
      textStr: ''
    }
  }
}
</script>