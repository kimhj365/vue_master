import { createRouter, createWebHistory } from 'vue-router'
import common from './common.js';
import board from './board.js';

const routes = [
  common,
  board
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
