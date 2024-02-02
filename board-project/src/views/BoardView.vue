<template>
<div>
  <HeaderComponent />
  <!-- v-bind:list =>  list 라는 어트리뷰트 생성해서 boardList 변수 전달 -->
  <BoardList v-if="listView" v-bind:list="boardList" 
    @show-write="showWrite"  @board-delete="deleteBoard" @show-read="showRead" @increase-view="increaseView"/>
  <BoardWrite v-if="writeView" v-on:save-board="saveBoard" />
  <BoardRead v-if="readView" v-bind:obj="board" v-on:show-list="showList"/>
  <!-- HTML 태그 전달 -->
  <FooterComponent v-bind:data="htmlData">
    <template v-slot:header><h3>Header 들어갈 내용</h3></template>
    <template v-slot:default><p>Hello, World!</p></template>
    <template v-slot:footer><p>Since 2020</p></template>
  </FooterComponent>
</div>

</template>
<script>
import BoardList from '../components/BoardList.vue'
import HeaderComponent from '../components/HeaderComponent.vue'
import FooterComponent from '../components/FooterComponent.vue'
import BoardWrite from '../components/BoardWrite.vue'
import BoardRead from '../components/BoardRead.vue'

export default {
  data () {
    return {
      listView: true,
      writeView: false,
      readView: false,
      board:{ },  // 상세화면에 사용할 데이터
      boardList: [
        { no: 1, title: 'Vue는 좋아요', content: '프레임워크입니다', view: 1 },
        { no: 2, title: '좋은 아침입니다', content: '금요일이네요', view: 3 },
        { no: 3, title: '점심 메뉴는', content: '육회밥입니다', view: 5 }
      ],
      htmlData: '<p>Hello</p>'
    }
  },
  components: {
    BoardList,
    HeaderComponent,
    FooterComponent,
    BoardWrite,
    BoardRead
  },
  methods: {
    showWrite() { // 등록화면 보여주기
      this.listView = false;
      this.writeView = true;
    },
    showList() {  // 목록 보여주기
      this.listView = true;
      this.writeView = false;
      this.readView = false;
    },
    showRead(board) { // 상세화면 보여주기
      console.log(board);
      this.listView = false;
      this.writeView = false;
      this.readView = true;
      this.board = board;

      // 글번호의 인덱스를 찾아서 현재 조회수를 파악하고 증가하기
      let idx = -1; // 해당 위치의 값을 새로운 값으로 변경하기 위해서
      let viewCnt = 0;
      for(let i = 0; i < this.boardList.length; i++) {
        if(this.boardList[i].no == board.no){
          idx = i;
          viewCnt = this.boardList[i].view;
          break;
        }
      }
      let brd = {no: board.no, title: board.title, content: board.content, view: ++viewCnt};
      this.boardList.splice(idx, 1, brd); // 새로운 값으로 변경
    },
    saveBoard(title, content) {
      console.log(title, content);
      let idx = this.boardList.length - 1;  // 마지막 데이터의 index.
      let no = parseInt(this.boardList[idx].no) + 1;  // 새로운 데이터의 no.
      let board = {no, title, content, view: 0};
      this.boardList.splice(this.boardList.length, 0, board);
      this.showList();
    },
    deleteBoard(no) { // 글 삭제
      this.boardList = this.boardList.filter(board => board.no == no ? false : true);
      console.log(this);
    },
    increaseView(){
      this.board.view = this.board.view + 1;
      console.log(this.board.view);
    }
  }
}


</script>
