<template>
  <div>
    <input type="text" v-model="todo">
    <button @click="addTodo">추가</button>
  </div>
  <div>
    <ul>
      <!-- v-for문 -->
      <li v-for="todo in todoList" v-bind:key="todo.no">{{ `${todo.no} - ${todo.text}` }}
        <button @click="deleteTodo(todo.no)">삭제</button>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      todo: '그담할일', // {no: 3, text: '그담할일'},
      todoList: [{no: 1, text: '할일1'}, {no: 2, text: '할일2'}]
    }
  },
  methods: {
    addTodo() {
      let no, text;
      no = this.todoList[this.todoList.length - 1].no + 1;
      text = this.todo;
      this.todoList.splice(this.todoList.length, 0, {no, text});
      this.todo = '';
    },
    deleteTodo(no) {
      console.log('no: ', no);
      this.todoList = this.todoList.filter(todo => todo.no == no ? false : true);
    }
  }
}
</script>
