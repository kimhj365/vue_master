<template>
    <div class="container">
        <div class="row">
            <table class="table table-bordered">
                <thead>
                    <tr>
                        <th scope="col" class="text-center table-primary">번호</th>
                        <td scope="col" class="text-center">{{ boardInfo.no }}</td>
                        <th scope="col" class="text-center table-primary">작성일</th>
                        <td scope="col" class="text-center">{{ getDateFormat(boardInfo.created_date) }}</td>
                        <th scope="col" class="text-center table-primary">이름</th>
                        <td scope="col" class="text-center">{{ boardInfo.writer }}</td>
                    </tr>

                    <tr>
                        <th colspan="2" class="text-center table-primary">제목</th>
                        <td colspan="4">{{ boardInfo.title }}</td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td colspan="6" class="text-left" valign="top" height="200">
                            <pre
                                style="white-space: pre-wrap;border:none;background-color: white;">{{ boardInfo.content }}</pre>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="6" class="text-center">
                            <button class="btn btn-xs btn-info"
                                        @click="goToUpdateForm(boardInfo.no)">수정</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="row">
            <!-- 해당 게시글 댓글 있을때-->
            <CommentList v-if="boardInfo.comment > 0" 
                         v-bind:bno="boardInfo.no" />   
            <!-- 해당 게시글 댓글 없을때-->
            <!-- v-if~ v-else 사이에 다른 태그 있으면 안됨(ex. p, span 태그 등)-->
            <div v-else class="card text-center">
                댓글 없음
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
// 컴포넌트 파일 import
import CommentList from '../components/CommentList.vue';

export default {
    data() {
        return {
            boardInfo: {
                no : null,
                title : '',
                writer : '',
                content : '',
                created_date : null,
                updated_date : null
            }
        };
    },
    // import 한 컴포넌트 components에 등록 후 사용가능
    components : {
        CommentList
    },
    // 비동기
    created() {
        let searchNo = this.$route.query.boardNo;
        this.getBoardInfo(searchNo);
    },
    methods: {
        async getBoardInfo(no) {
             let result = await axios.get("/api/boards/" + no)
                                .catch(err => console.log(err));
             this.boardInfo = result.data;      
        },
        getDateFormat(date) {
            let dateValue = date == null ? new Date() : new Date(date);
            let year = dateValue.getFullYear();
            let month = ('0' + (dateValue.getMonth() + 1)).slice(-2);
            let day = ('0' + dateValue.getDate()).slice(-2);
            return `${year}-${month}-${day}`;
        },
        goToUpdateForm(no) {
          this.$router.push({ path : '/boardForm', query : {'boardNo': no}});
        }
    }
}
</script>
