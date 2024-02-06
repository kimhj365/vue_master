<template>
  <!-- BootStrap-Navbar or nav&tabs에서 코드 가져옴-->
  <!-- a 태그 => router-link, href => to로 변환 -->
  <nav class="nav">
    <router-link class="nav-link active" aria-current="page" to="/">전체조회 </router-link>
    <router-link class="nav-link" to="/userInsert">등록 </router-link>
    <a class="nav-link" aria-disabled="true">Disabled</a>
    <!-- router-link to 속성 없으면 그냥 a태그로 -->
  </nav>
</template>
