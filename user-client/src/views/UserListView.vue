<!-- UserListView.vue -->
<template>
  <div class="container">
    <h1>전체 회원 조회</h1>
  </div>
</template>

<script>
import axios from 'axios'

  export default {
    data() {
      return {
        userList : [] // 데이터 유형 맞춰주기
      }
    },
    created() {
      // 비동기작업
      this.getUserList(); 
    },
    methods : {
      // 동기 작업
      // async : 내부 코드를 동기식으로 바꾸는 것
      //         함수 자체는 여전히 비동기식
      async getUserList() {
        // axios: == primise
        // axios 코드 : 반드시 순서대로 진행되야 함
        //             why: 데이터가 와야 진행됨
        let result = await axios.get('http://localhost:3000/users') // get 방식
                                .catch(err => console.log(err));
        let list = result.data;
        this.userList = list; // 이 코드가 돌 시점에 userList에 제대로 값 넘어와야함 => await
        
        // 동기식으로 처리(await) : then X
        // 비동기 식으로 처리 : then O
      }
    }
  }
</script>

<style>

</style>