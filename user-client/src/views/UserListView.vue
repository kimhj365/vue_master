<!-- UserListView.vue -->
<template>
  <div class="container">
    <h3 class="text-center">전체 회원 조회</h3>
    <table class="table">
      <thead>
        <tr>
          <th>No.</th>
          <th>ID</th>
          <th>이름</th>
          <th>성별</th>
          <th>가입날짜</th>
        </tr>
      </thead>
      <tbody>
        <!-- v-for :key 속성 사용(unique 해야함) -->
        <!--  -->
        <tr v-for="(user, idx) in userList" v-bind:key="idx"
          v-on:click="goToUserInfo(user.user_id)">
          <!-- 템플릿 문법 사용시 -->
          <td>{{ user.user_no }}</td>
          <td>{{ user.user_id }}</td>
          <td>{{ user.user_name }}</td>
          <!-- text 디렉티브 사용시 -->
          <td v-text="userGender(user.user_gender)" />
          <td v-text="joinDate(user.join_date)" />
        </tr>
      </tbody>
    </table>
    <p>Total : {{ count }}</p>
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
    // computed:
    // userList(data옵션) 따라서 값이 자동으로 정해짐
    // 데이터 옵션 프로퍼티 기반으로 새로운 값 생성 => return 있음. 값 사용가능
    computed: {
      // 몇개 가지고 있는지 출력
      count() {
        return this.userList.length;
      },
      
    },
    // watch: 
    // 이미 존재하는 값들을 감시
    // 값 아니고 프로세스. return 없음
    // watch 옵션 벗어나는 곳에서 명시적으로 사용 불가
    watch: {
      // "userList가 바뀌면 뭘 하겠다"
      userList(newQuestion, oldQuestion) {
        console.log('이전 : ' + oldQuestion);
        // alert('데이터가 변경되었습니다.');
        console.log('이후 : ' + newQuestion);
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
        // proxy 사용시 상대경로 사용(내 경로를 지정한 경로로 변경) => '/api'로 시작('^/api')
        let result = await axios.get('/api/users') // get 방식
                                .catch(err => console.log(err));
        let list = result.data;
        this.userList = list; // 이 코드가 돌 시점에 userList에 제대로 값 넘어와야함 => await
        
        // 동기식으로 처리(await) : then X
        // 비동기 식으로 처리 : then O
      },
      goToUserInfo(userId) {
        // 등록된 라우터에 대해 요청 메소드
        // 라우터는 무조건 get 방식(post X) => body 없음

        // path: 
        // query: 넘기는 부분 (key-value)
        //        여기서 정한 key를 받는 쪽에서도 알아야 함(받는 쪽: 새롭게 불려지는 컴포넌트)
        // $router.push: 통신을 요청 / $route : 통신을 받음
        this.$router.push({ path: '/userInfo', query: {'userId' : userId}});
        // this.$router.push({ name: 'userInfo', query: {'userId' : userId}});  // name으로도 가능
      },
      joinDate(joinDate) {
        let result = null;
        if(joinDate != null){
          let date = new Date(joinDate);
          let year = date.getFullYear();
          let month = ('0' + (date.getMonth() + 1)).slice(-2);
          let day = ('0' + date.getDate()).slice(-2);

          result = `${year}년 ${month}월 ${day}일`
        }
        return result
      },
      userGender(gender) {
        let result = null;
        if(gender == 'M') result = '남';
        else if(gender == 'F') result = '여';
        else result = '';
        return result;

      }
    }
  }
</script>

<style>

</style>