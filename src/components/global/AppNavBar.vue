<template>
  <div class="nav">
    <v-app-bar color="rgb(112, 2, 2)" >
      <template v-slot:prepend>
        <v-app-bar-nav-icon @click="openDrawer"></v-app-bar-nav-icon>
      </template>
      <v-spacer></v-spacer>
      <v-btn icon @click="openSearchDialog">
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
      <!-- Search Dialog -->
      <v-dialog v-model="SearchDialog" transition="dialog-top-transition">
        <v-card>
          <v-toolbar color="rgb(112, 2, 2)" title="Search" class="text-center"></v-toolbar>
          <v-card-text class="dialog-content">
            <div class="pa-12">
              <v-form  >
                <v-text-field
                  v-model="searchQuery"
                  :rules="nameRules"
                  label="Name"
                  required
                  @keyup="searchMovie"
                ></v-text-field>
                <v-btn  color="rgb(112, 2, 2)"><v-icon>mdi-heart</v-icon>Add to Fav</v-btn>
              </v-form>
              <div v-if="movie">
                <v-row>
                  <v-col cols="6">
                    <h2 class="text-h4 mb-5">{{ movie.original_title }}</h2>
                    <p class="gray--text">Release Date: {{ movie.release_date }}</p>
      <p class="gray--text">Vote Average: {{ movie.vote_average }}</p>
      <p class="text-subtitle-1">{{ movie.overview }}</p>
                  </v-col>
                  <v-col cols="6">
                    <img :src="'https://image.tmdb.org/t/p/w185' + movie.poster_path">
                  </v-col>
                </v-row>
              </div>
            </div>
          </v-card-text>
          <v-card-actions class="justify-end">
            <v-btn variant="text" @click="closeSearchDialog">Close</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-btn icon>
        <v-icon>mdi-heart</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </v-app-bar>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      searchQuery: '',
      SearchDialog: false,
      movie: null,
      nameRules: [
        v => !!v || 'Enter a name of the movie you are looking for!',
        v => (v && v.length <= 25) || 'Name must be less than 25 characters',
      ],
    };
  },
  inject: ['Emitter'],
  methods: {
    openDrawer() {
      this.Emitter.emit('openDrawer');
    },
    openSearchDialog() {
      this.SearchDialog = true;
    },
    closeSearchDialog() {
      this.SearchDialog = false;
    },
    async searchMovie() {
      const url = 'https://api.themoviedb.org/3/search/movie?query=' + this.searchQuery;

      try {
        const response = await axios.get(url, {
          params: {
            api_key: '073a877588a7cfa0ae8e6e0de66afad7', // Replace with your API key
            sort_by: 'popularity.desc',
            page: 1,
          },
        });

        this.movie = response.data.results[0];
        console.log(this.movie);
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
<style scoped>
.dialog-content {
  overflow: hidden;
}
</style>