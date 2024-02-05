<template>
  <div>
    <form>
      <label>
        제품ID:
        <input type="text" v-model="productInfo.product_id">
      </label>
      <br>
      <label>
        제품명:
        <input type="text" v-model="productInfo.product_name">
      </label>
      <br>
         <label>
        카테고리:
        <input type="radio" value="A" v-model="productInfo.category">A
        <input type="radio" value="B" v-model="productInfo.category">B
      </label>
      <br>
      <button type="button" @click="addCart">추가</button>
    </form>    
    <table>
      <thead>
        <!-- total: computed => 일반 값으로 인식됨 but 수정 불가 -->
        <caption>total: {{ total }}</caption>
        <tr>
          <th>카테고리</th>
          <th>제품ID</th>
          <th>제품명</th>
        </tr>
      </thead>
      <tbody>
        <tr :key="idx" v-for="(info, idx) in productList">
          <td>{{ info.category }}</td>
          <td>{{ info.product_id }}</td>
          <td>{{ info.product_name }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
  export default {
    // data() 
    // : 데이터 조작 가능, 모델 디렉티브(v-model)에 연결됨
    //   일반 변수 타입 => 데이터 변경 가능
    data() {
      return {
        productInfo : {
          product_id : "",
          product_name: "",
          category: "A"
        }
      }
    },
    // computed 
    // : readonly, 모델 디렉티브와 함께 사용 못함 => 데이터 조작 불가
    //   데이터 옵션이 변경됨에 따라서 연속적으로 값이 변하는 속성
    //   데이터 옵션과 연동되어 연산한 결과
    //   함수 타입 => 다른 컴포넌트의 데이터 변경 감지해 자신의 값 자동으로 다시 계산함
    computed : {
      productList() {
        return this.$store.state.cart;
      },
      total() {
        return this.$store.getters.cartCount;
      }
    },
    // methods
    // : on 디렉티브(v-on)
    //   일반 함수와 구조 같음(매개변수 받기, return 생략 가능)
    methods :{
      addCart() {
        // 값 this.productInfo로 한번에 넘기지 말기
        // => 새로운 대상 만들고 내부값 복사해서 넘기기(개체 복제)
        // why: 데이터 말고 객체의 참조타입 메모리 주소가 넘어감 -> 추가된 데이터 변경 위험
        //      => 값 변경과 동시에 다른 값도 변경됨(vue 기능 아니라 js 객체 주소 같아서 일어난 일..?)
        let obj = {
          product_id : this.productInfo.product_id,
          product_name : this.productInfo.product_name,
          category : this.productInfo.category
        }
        // mutations 호출 => commit()
        // addProduct 직접 호출X / commit에 의존해서 호출
        // commit 내부에서 자동으로 2개의 매개변수(state, 추가변수) 넘겨주고 실행
        // commit: 첫번째 매개변수(함수명)과 같은 이름 함수 검색 => state 자동 넘겨줌 + 추가 변수 받고 실행함
        //         데이터 변경사항 추적 가능
        // this.$store.commit('addProduct', this.productInfo); => X
        this.$store.commit('addProduct', obj);
        
        // actions 호출 => dispatch()
        this.$store.dispatch('addProduct', obj);
      }
    }
  }
</script>
<style>
  table, th, td {
    border: 1px solid black;
  }
  
</style>