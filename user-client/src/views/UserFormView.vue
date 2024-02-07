<!-- UserFormView.vue -->
<!-- 수정 / 등록을 한 컴포넌트로 처리 -->
<template>
  <div class="container">
    <h3 class="text-center">{{ title }}</h3>
    <div class="row">
      <table class="table">
        <tr>
          <th class="text-right table-primary">No.</th>
          <td class="text-center">
            <input class="form-control" type="number" v-model="userInfo.user_no" readonly>
          </td>
        </tr>
        <tr>
          <th class="text-right table-primary">ID</th>
          <td class="text-center">

            <input class="form-control" type="text" v-model="userInfo.user_id" v-bind:readonly="isUpdated">
          </td>
        </tr>
        <tr>
          <th class="text-right table-primary">비밀번호</th>
          <td class="text-center">
            <input class="form-control" type="password" v-model="userInfo.user_pwd">
          </td>
        </tr>
        <tr>
          <th class="text-right table-primary">이름</th>
          <td class="text-center">
            <input class="form-control" type="text" v-model="userInfo.user_name">
          </td>
        </tr>
        <tr>
          <!-- 남녀 -->
          <th class="text-right table-primary">성별</th>
          <td class="text-center">
            <!-- vue에서 id, name 속성 사용 안함 -->
            <input type="radio" value="M" v-model="userInfo.user_gender"> 남
            <input type="radio" value="F" v-model="userInfo.user_gender"> 여
            <!-- <input true-value="예" false-value="아니오" v-model="chkVal"> -->
          </td>
        </tr>
        <tr>
          <th class="text-right table-primary">나이</th>
          <td class="text-center">
            <input class="form-control" type="number" min="0" v-model="userInfo.user_age">
          </td>
        </tr>
        <tr>
          <!-- 년월일 -->
          <th class="text-right table-primary">가입일자</th>
          <td class="text-center">
            <input class="form-control" type="date" v-model="userInfo.join_date"> <!-- yyyy-MM-dd -->
          </td>
        </tr>
      </table>
    </div>
    <div class="row">
      <!-- 첫번째 -->
      <!-- <button class="btn btn-info" @click="saveInfo(searchNo)">저장</button> -->
      <!-- 두번째 -->
      <button class="btn btn-info" @click="isUpdated ? updateInfo() : insertInfo()">저장</button>
    </div>
  </div>
</template>
<script>
import axios from 'axios'

export default {
  data() {
    return {
      userInfo: {
        user_no: null,
        user_id: "",
        user_pwd: "",
        user_name: "",
        user_age: "",
        user_gender: null,
        join_date: null
      },
      searchNo: null, // 등록 or 수정 판별
      isUpdated: false
    }
  },
  computed: {
    title() {
      return this.isUpdated ? '회원 정보 수정' : '회원 정보 등록';
    }
  },
  created() {
    this.searchNo = this.$route.query.id;
    console.log(this.searchNo);
    // searchNo != null => 값 정보 변경 발생 => 사용자 요청 일어남
    if (this.searchNo != null && this.searchNo != undefined) {
      this.getUserInfo();
    } else {
      this.userInfo.join_date = this.getDate('');
    }
  },
  methods: {
    async getUserInfo() {
      let result = await axios.get('/api/users/' + this.searchNo)
        .catch(err => console.log(err));
      console.log(result);
      let info = result.data;

      let newDate = this.getDate(info.join_date);
      info.join_date = newDate;

      this.userInfo = info;
      this.isUpdated = true;
    },
    saveInfo(id) { // 첫번째
      // 1) 보낼 데이터 산출
      let info = this.getSendInfo(id);

      // 2) ajax
      // axios(info) : post/put 한꺼번에 처리(메소드 제한 X)
      //               info => 엔드포인트까지 같이 반환해야 함
      // axios 기본: 객체로 모든 데이터 받음
      //             
      axios(info)
        .then(result => {
          let count = result.data.affectedRows;
          if (count == 0) {
            alert('저장되지 않았습니다. 내용을 확인해주세요');
          } else {
            alert('저장되었습니다.')

            if (result.data.insertId > 0) { // 등록일 경우 추가 작업
              this.userInfo.user_no = result.data.insertId;
            }
          }
          console.log(result);
        })
        .catch(err => console.log(err));
    },
    getSendInfo(id) {
      // method, url. data 정의 
      console.log(id);
      let method = '';
      let url = '';
      let data = null;

      // id == null : 값 변경 안됨 => 등록
      // id != null : 값 변경됨 => 수정
      if (id == null) {  // 등록
        method = 'post';
        url = '/api/users';
        data = {
          "param": {
            user_pwd: this.userInfo.user_pwd,
            user_name: this.userInfo.user_name,
            user_age: this.userInfo.user_age,
            user_gender: this.userInfo.user_gender,
            join_date: this.userInfo.join_date
          }
        };
      } else {  // 수정
        method = 'put';
        url = `/api/users/${id}`;
        data = {
          "param": {
            user_pwd: this.userInfo.user_pwd,
            user_name: this.userInfo.user_name,
            user_age: this.userInfo.user_age,
            user_gender: this.userInfo.user_gender,
            join_date: this.userInfo.join_date
          }
        };
      }

      return {
        // 필드명 == axios 객체 필드명
        method,
        url,
        data
      }
    },
    insertInfo() {
      if (!this.validation()) return;

      let data = {
        "param": {
          user_id: this.userInfo.user_id,
          user_pwd: this.userInfo.user_pwd,
          user_name: this.userInfo.user_name,
          user_gender: this.userInfo.user_gender,
          user_age: this.userInfo.user_age,
          join_date: this.userInfo.join_date
        }
      }

      axios
        .post('/api/users', data)
        .then(result => {
          let user_no = result.data.insertId;
          if (user_no == 0) {
            alert(`등록되지 않았습니다.\n내용을 확인해주세요`)
          } else {
            alert(`정상적으로 등록되었습니다.`);
            this.userInfo.user_no = user_no;
          }
        })
        .catch(err => console.log(err));

    },
    updateInfo() {
      if (!this.validation()) return;

      let data = {
        "param": {
          user_pwd: this.userInfo.user_pwd,
          user_name: this.userInfo.user_name,
          user_gender: this.userInfo.user_gender,
          user_age: this.userInfo.user_age,
          join_date: this.userInfo.join_date
        }
      };

      axios
        .put(`/api/users/${this.userInfo.user_id}`, data)
        .then(result => {
          let count = result.data.changedRows;
          if (count == 0) {
            alert(`수정되지 않았습니다.\n내용를 확인해주세요`)
          } else {
            alert(`정상적으로 수정되었습니다.`);
            this.$router.push({ path: '/userInfo', query: {'userId' : this.userInfo.user_id}});
          }
        })
        .catch(err => console.log(err));

    },
    validation() {
      if (this.userInfo.user_id == "" && !this.isUpdated) {
        alert('아이디가 입력되지 않았습니다.');
        return false;
      }

      if (this.userInfo.user_pwd == "") {
        alert('비밀번호가 입력되지 않았습니다.');
        return false;
      }

      if (this.userInfo.user_name == "") {
        alert('이름이 입력되지 않았습니다.');
        return false;
      }

      return true;
    },
    getSendData() {
      let obj = this.userInfo;
      let delData = ["user_no"];
      let newObj = {};

      let isTargeted = null;
      for (let field in obj) {
        isTargeted = false;
        for (let target of delData) {
          if (field == target) {
            isTargeted = true;
            break;
          }
        }
        if (!isTargeted) {
          newObj[field] = obj[field];
        }
      }
      let newData = {
        "param": newObj
      }
      return newData;
    },
    getDate(value) {
      if (value == null) return null;
      let date = value == '' ? new Date() : new Date(value);
      let year = date.getFullYear();
      let month = ('0' + (date.getMonth() + 1)).slice(-2);
      let day = ('0' + date.getDate()).slice(-2);
      return `${year}-${month}-${day}`;
    }
  }
}
</script>