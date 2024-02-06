<!-- UserInfoView.vue -->
<template>
  <div class="container">
    <h1>회원 정보 조회</h1>
    <div class="row">
      <table class="table">
        <tr>
          <th class="text-right table-primary">No.</th>
          <td class="text-center">{{ userInfo.user_no }}</td>
        </tr>
        <tr>
          <th class="text-right table-primary">ID</th>
          <td class="text-center">{{ userInfo.user_id }}</td>
        </tr>
        <tr>
          <th class="text-right table-primary">비밀번호</th>
          <td class="text-center">{{ userInfo.user_pwd }}</td>
        </tr>
        <tr>
          <th class="text-right table-primary">이름</th>
          <td class="text-center">{{ userInfo.user_name }}</td>
        </tr>
        <tr>
          <!-- 남녀 -->
          <th class="text-right table-primary">성별</th>
          <td class="text-center">{{ userGender }}</td>
        </tr>
        <tr>
          <th class="text-right table-primary">나이</th>
          <td class="text-center">{{ userInfo.user_age }}</td>
        </tr>
        <tr>
          <!-- 년월일 -->
          <th class="text-right table-primary">가입날짜</th>
          <td class="text-center">{{ joinDate }}</td>
        </tr>
      </table>
    </div>
    <div class="row">
      <button class="btn btn-info col-4" @click="goToUpdate(userInfo.user_id)">수정</button>
      <router-link to="/" class="btn btn-success col-4">목록</router-link>
      <button class="btn btn-warning col-4" @click="deleteInfo(userInfo.user_id)">삭제</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      userInfo: {}
    }
  },
  // computed = 값(함수 x)
  computed: {
    // 성별: 남녀
    userGender() {
      let result = null;
      if(this.userInfo.user_gender == 'M'){
        result = '남'
      }
      else if(this.userInfo.user_gender == 'F'){
        result =  '여'
      }
      return result
    },
    // userGender() {
    //   let map = {
    //     'M' : '남',
    //     'F' : '여'
    //   }
    //   return map[this.userInfo.user_gender]
    // },
    // 가입날짜: 년월일
    joinDate() {
      let result = null;
      if(this.userInfo.join_date != null){
        let date = new Date(this.userInfo.join_date);
        let year = date.getFullYear();
        let month = ('0' + (date.getMonth() + 1)).slice(-2);
        let day = ('0' + date.getDate()).slice(-2);

        result = `${year}년 ${month}월 ${day}일`
      }
      return result
    }
  },
  created() {
    // $route: 통신 정보 받음(router 아님)
    let searchNo = this.$route.query.userId;
    this.getUserInfo(searchNo);
  },
  methods : {
    async getUserInfo(userId) {
      // 원본: http://localhost:3000/users/userId
      // 대체(Proxy): /api/users/userId
      let result = await axios.get('/api/users/' + userId)
                              .catch(err => console.log(err));
      let info = result.data;
      this.userInfo = info; 
    },
    goToUpdate(userId) {
      // 수정폼 컴포넌트 호출
      this.$router.push({ path: '/userUpdate', query: {'userId' : userId}});    
    },
    deleteInfo(userId) {
      // 서버의 해당 데이터 삭제
      console.log(userId);
    }
  }
}
</script>

<style>

</style>