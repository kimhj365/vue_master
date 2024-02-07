<!-- CommentList.vue -->
<template>
  <ul v-for="(comment, idx) in commentList" v-bind:key="idx">
    <li>{{ comment.content }}</li>
    <li>{{ comment.writer }} {{ createdDate(comment.create_date) }}</li>
  </ul>
</template>
<script>
import axios from 'axios'

export default {
  data() {
    return {
      commentList : []
    }
  },
  created() {
    this.getcommentList(); 
  },
  methods : {
    async getcommentList() {
      let result = await axios.get('/api/comment')
                              .catch(err => console.log(err));
      console.log(result);
      let list = result.data;
      this.commentList = list;
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