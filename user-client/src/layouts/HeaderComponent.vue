<template>
  <!-- BootStrap-Navbar or nav&tabs에서 코드 가져옴-->
  <!-- a 태그 => router-link, href => to로 변환 -->
  <nav class="nav">
    <router-link class="nav-link active" aria-current="page" to="/">전체조회</router-link>
    <router-link class="nav-link" to="/">등록</router-link>
    <!-- <router-link class="nav-link" aria-disabled="true">Disabled</router-link> -->
  </nav>
</template>