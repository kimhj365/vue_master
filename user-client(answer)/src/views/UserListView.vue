<!-- UserListView.vue -->
<template>
    <div class="container">
         <h3 class="text-center">전체 회원 조회</h3>
        <table class="table">
            <caption>Total : {{ count }}</caption>
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
                <tr v-bind:key="idx" v-for="(user, idx) in userList"
                    v-on:click="goToUserInfo(user.user_id)" >
                    <td>{{ user.user_no }}</td>
                    <td>{{ user.user_id }}</td>
                    <td>{{ user.user_name }}</td>
                    <td v-text="user.user_gender" />
                    <td v-text="user.join_date" />
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    data(){
        return {
            userList : []
        }
    },
    computed  : { // 값
        count(){
            return this.userList.length;
        }
    },
    watch : { // 프로세스
        userList(newQuestion, oldQuestion){
            console.log('이전 : ', oldQuestion);
            //alert('데이터가 변경되었습니다.');
            console.log('이후 : ', newQuestion);
        }
    },
    created(){
        this.getUserList();// 비동기작업
    }, 
    methods: {
        async getUserList(){
            //  동기작업
            let result = await axios.get('/api/users')
                               .catch(err => console.log(err));
            let list = result.data;
            this.userList = list;
        },
        goToUserInfo(userId){
            this.$router.push({ path : '/userInfo', query : { "userId" : userId }});
            //this.$router.push({ name: 'userInfo', query : { "userId" : userId }});
        }
    }
}
</script>
