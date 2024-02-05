// mixin.js

// 객체 반환(== 모듈)
export default{
  // 메소드(함수)
  // 모든 컴포넌트에서 공통사용하는 기능 정의(전역 함수)
  // $ prepix 함수명 사용 => 다른 컴포넌트 함수명과 충돌 방지
  methods: {
    // 날짜 출력 함수
    $getToday(format) { // yyyy-MM-dd(문자열)
      let today = new Date();
      let year = today.getFullYear();
      let month = ('0'+(today.getMonth+1)).slice(-2); // 한자리 숫자 앞에 '0'붙임
      let day = ('0'+today.getDate()).slice(-2);

      let result = format.replace('yyyy', year)
                         .replace('MM', month)
                         .replace('dd', day);
      return result;
    }
  },
  // 라이프사이클 훅
  // 각 라이프사이클 훅에서 공통사용하는 코드
  created() {
    console.log("Component Created");
  },
  mounted() {
    console.log("DOM mounted");
  }
}