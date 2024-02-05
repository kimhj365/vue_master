// store.js
// vuex 저장소 생성
import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';

// 객체 반환
// 일반 객체 아니고 createStore 통과한 결과물이 넘어가야함
export default createStore({
  // state: 함수(저장소) => return에 실제로 가지는 대상 정의
  state() { // == 데이터 옵션 but CRUD 가능하지만 직접 조작 X => mutations
    return {
      cart : [
        {
          product_id : 1,
          product_name : '아이폰 거치대',
          category : 'A'
        }
      ],
      count : 0
    }
  },
  // getters, mutations, actions: 객체 => 호출하는 순간 매개변수로 값 받음(state 사용/this 사용 X)
  // getters : 가져오려는 데이터 구조 정의
  getters: {
    cartCount : (state) => {
        return state.cart.length;
    }
  },
  // mutations: state가 가진 데이터 조작(직접 제어)
  // state 매개변수 받음 + 다른 매개변수 받기 가능
  mutations: {
    increment(state) {
      state.count++;
    },
    addProduct(state, info) { 
       state.cart.push(info);
    }
  },
  // actions : state 직접 제어 못함, mutations 기반으로 불러옴
  //           저장소 정보 전체 가지고 옴
  //           여러개의 mutations 순차적으로 실행
  actions: {
    addProduct(context, info) {
      context.commit('addProduct', info);
      // 비동기 작업(setTimeout, Promise 등)
      // setTimeout() : 딜레이 줘서 콜백으로 작업
      setTimeout(() => {
        context.commit('increment');
      }, 1000)
    }
  },
  // plugins: 보조기능 추가
  // createPersistedState(): vuex 저장소 데이터를 로컬 스토리지에 저장 => 새로고침해도 정보 남아있음
  //                         매개변수 없으면 모든 데이터 저장
  // 로컬 스토리지: 브라우저 관련 데이터 저장하는 저장소(쿠키랑 비슷함)
  //                삭제안하는 이상 안 없어짐
  //                => 암호화, 기간 설정해서 저장해야함
  plugins: [createPersistedState()] 
})