<template>
  <div id="app">
    <nav-bar></nav-bar>
    <the-login></the-login>
    <the-signup></the-signup>
    <shot-detail></shot-detail>
    <router-view class="router-view" />
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import TheLogin from "@/components/TheLogin.vue";
import TheSignup from "@/components/TheSignup.vue";
import ShotDetail from "@/components/shot/ShotDetail.vue";
import { scrollPage } from "@/assets/js/common";

import { mapActions, mapGetters } from "vuex";

export default {
  name: "App",
  components: { NavBar, TheLogin, TheSignup, ShotDetail },
  computed: {
    ...mapGetters([
      "moviePageNum",
      "movieMaxPage",
      "shotPageNum",
      "shotMaxPage",
    ]),
  },
  methods: {
    ...mapActions(["fetchCurrentUser", "addMovies", "addShots"]),
    getMorePage(e) {
      if (this.$route.name == "movie") {
        scrollPage(e, this.moviePageNum, this.movieMaxPage, this.addMovies);
      } else if (this.$route.name == "shot") {
        scrollPage(e, this.shotPageNum, this.maxPage, this.addMovies);
      }
    },
  },
  created() {
    this.fetchCurrentUser();
    window.addEventListener("scroll", this.getMorePage, { passive: true });
  },
  unmounted() {
    window.removeEventListener("scroll");
  },
};
</script>
<style>
@import url("https://hangeul.pstatic.net/hangeul_static/css/nanum-square.css");
@import url("https://hangeul.pstatic.net/hangeul_static/css/nanum-myeongjo.css");
#app {
  font-family: "NanumSquare", Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.router-view {
  width: 70%;
  margin: auto;
  text-align: center;
}

.mouse-cursor-custom:hover {
  cursor: pointer;
}
</style>
