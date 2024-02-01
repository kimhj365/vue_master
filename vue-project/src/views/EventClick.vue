<template>
  <div>
    <!-- v-on : 이벤트 -->
    <button v-on:click="increaseCounter">Add 1</button>
    <p>Counter is : {{ counter }}</p>
    <button v-on:click="increaseCounter()">Increase</button>
    <!-- <button v-on:click="increaseCounter2(3)">Increase</button> -->
    <button v-on:click="one(), two()">다중호출</button>
    <!-- @ == v-on: -->
    <select v-model="city" @change="changeSelect">
      <option value="1">서울</option>
      <option value="2">부산</option>
      <option value="3">제주</option>
    </select>
  </div>
</template>

<script>
export default{
  data() {
    return {
      counter: 5,
      city: "1"
    }
  },
  // methods: 여러개 선언 가능
  methods: {
    increaseCounter() {
      console.log('increaseCounter');
      this.counter = this.counter + parseInt(this.city);
    },
    increaseCounter2(num) {
      console.log('increaseCounter2');
      this.counter = this.counter + num;
    },
    one() {
      alert('one');
    },
    two() {
      alert('two');
    },
    changeSelect(){
      alert(this.city);
    }
  },
  // 변경 이전에 필요한 처리 구현
  beforeUpdate() {
    console.log('beforeUpdate');
  },
  // 변경 이후(화면 바뀐 후) 필요한 처리 구현
  updated() {
    console.log('updated');
  }
}
</script>