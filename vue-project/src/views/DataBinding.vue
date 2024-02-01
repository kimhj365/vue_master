<template>
  <!-- {{}} (mustache): 객체 안에 있는 변수 값 text 형태로 불러옴 ( == innerText) -->
  <h3>Hello, {{ msg }}</h3>
  <div>{{ htmlStr }}</div>
  <!-- v-html (vue 지시자): 변수값 html 형태로 불러옴 ( == innerHTML) -->
  <div v-html="htmlStr"></div>

  <!-- 사용자가 input 텍스트 변경시 {{ }} 안 텍스트 내용도 동시에 변경됨-->
  <input type="text" v-model="vmodel">
  <p>{{ vmodel }}</p>

  <textarea cols="30" rows="10" v-model="message"></textarea>
</template>

<script>
export default{
  // data 호출하면 객체 반환
  data(){
    // 반환되는 값에 객체 정의(변수)
    return {
      msg: 'World!',
      htmlStr: '<p style="color: red;">Hello</p>',
      vmodel: 'Nice',
      message: '여러 라인의 값의 \n 읽습니다.'
    }
  }
}

</script>