<template>
  <div class="row">
    <the-movie
      v-for="movie in movies"
      :key="movie.id"
      :movie="movie"
    ></the-movie>
  </div>
</template>

<script>
import TheMovie from "@/components/movie/TheMovie.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "MovieList",
  components: {
    TheMovie,
  },
  computed: {
    ...mapGetters(["movies"]),
  },
  methods: {
    ...mapActions(["fetchMovies"]),
  },
  created() {
    this.fetchMovies();
  },
};
</script>

<style></style>
