<!-- BoardListView.vue -->
<template>
  <div class="container">
    <table class="table">
      <thead>
        <tr>
          <th>No.</th>
          <th>제목</th>
          <th>작성자</th>
          <th>작성일자</th>
          <th>댓글 수</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(board, idx) in boardList" v-bind:key="idx"
          v-on:click="goToBoardInfo(board.no)">
          <td>{{ board.no }}</td>
          <td>{{ board.title }}</td>
          <td>{{ board.writer }}</td>
          <td>{{ createdDate(board.created_date) }}</td>
          <td></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios'

  export default {
    data() {
      return {
        boardList : []
      }
    },
    created() {
      this.getBoardList(); 
    },
    methods : {
      async getBoardList() {
        let result = await axios.get('/api/board')
                                .catch(err => console.log(err));
        console.log(result);
        let list = result.data;
        this.boardList = list;
      },
      goToBoardInfo(no) {
        this.$router.push({ path: '/boardInfo', query: {'no' : no}});
      },
      createdDate(createdDate) {
        let result = null;
        if(createdDate != null){
          let date = new Date(createdDate);
          let year = date.getFullYear();
          let month = ('0' + (date.getMonth() + 1)).slice(-2);
          let day = ('0' + date.getDate()).slice(-2);

          result = `${year}-${month}-${day}`
        }
        return result
      }
    }
  }
</script>
