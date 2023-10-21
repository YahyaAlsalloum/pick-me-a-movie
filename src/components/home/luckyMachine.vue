<template>
  <div class="container">

    <h1 class="title mb-4">Trending Movies</h1>
    <h4 class="text mb-4" style="color: aliceblue;">اسحب من بين الافلام الاكثر مشاهده هذا الاسبوع </h4>
    <div id="machine" class="reels">
      <div class="reel" v-for="reel in reels" :key="reel.id" @click="openDialog(reel)" >
        <img :src="reel.image" alt="Movie Poster" class="movie-poster">
        <p class="movie-name">{{ reel.name }}</p>

        <!-- dialog -->
        <v-dialog
        v-model="dialog"
        width="auto"
      >
        <v-card>
          <v-card-text v-if="selectedReel.details">
            {{ selectedReel.details}}
          </v-card-text>
          <v-card-text v-else>
            Click Span !
          </v-card-text>
          <v-card-actions>
            <v-btn  block @click="dialog = false"  style="color: darkorange;">Close </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      </div>

    </div>
    <div class="buttons">
      <v-row justify="center" align="center" class="mt-3">
        <v-col cols="auto">
          <v-btn @click="spinReels" color="amber darken-1" id="bottone1" style="padding: 5px;"><strong >Spin</strong></v-btn>

        </v-col>
      </v-row>
    </div>
  </div>
</template>
<script>
import axios from 'axios';
import emptyPic from "@/assets/images/empty.jpeg"
export default { 

  data() {
    return {
      reels: [
        { id: 1, name: '', image: emptyPic ,details:'' },
        { id: 2, name: '', image: emptyPic ,details:''},
        { id: 3, name: '', image: emptyPic ,details:''}
      ],
dialog:false,
selectedReel: null,
      spinning: false
    };
  },
  methods: {
    async spinReels() {
      if (this.spinning) return;

      this.spinning = true;
      const spinDuration = 3000;

      try {
        // قم بجلب البيانات من API باستخدام Axios
        const response = await axios.get(
          'https://api.themoviedb.org/3/discover/movie',
          {
            params: {
              api_key: '073a877588a7cfa0ae8e6e0de66afad7', // استبدل بمفتاح API الخاص بك
              sort_by: 'popularity.desc',
              page: 1
            }
          }
        );

        const movies = response.data.results;
        console.log(movies);
        // تحديث المحتوى بشكل عشوائي بينما تستمر البكرات في الدوران
        const spinInterval = setInterval(() => {
          this.reels.forEach(reel => {
            const randomIndex = Math.floor(Math.random() * movies.length);
            const randomMovie = movies[randomIndex];
            reel.name = randomMovie.title;
            reel.details=randomMovie.overview;
            reel.image = `https://image.tmdb.org/t/p/w185${randomMovie.poster_path}`;
          });
        }, 100);

        // بعد انتهاء الوقت المحدد للدوران، قم بإيقاف تحديث المحتوى وعرض النتائج
        setTimeout(() => {
          clearInterval(spinInterval);
          this.spinning = false;
          // يمكنك هنا فحص النتائج وتنفيذ السلوك المناسب
        }, spinDuration);
      } catch (error) {
        console.error('حدث خطأ أثناء جلب البيانات:', error);
        this.spinning = false;
      }
    },
    openDialog(reel) {

      // Set the selected reel and open the dialog
      this.selectedReel = reel;
      
      this.dialog = true;
    },
    closeDialog() {
      // Close the dialog
      this.dialog = false;
    },
  }
};
</script>
<style>
@keyframes pulsate {
  100% {
    /* Larger blur radius */
    text-shadow:
      0 0 4px #fff,
      0 0 11px #fff,
      0 0 19px #fff,
      0 0 40px darkorange,
      0 0 80px darkorange,
      0 0 90px darkorange,
      0 0 100px darkorange,
      0 0 150px darkorange;
  }
 0% {
    /* A slightly smaller blur radius */
    text-shadow:
      0 0 4px #fff,
      0 0 10px #fff,
      0 0 18px #fff,
      0 0 38px darkorange,
      0 0 73px darkorange,
      0 0 80px darkorange,
      0 0 94px darkorange,
      0 0 140px darkorange;
  }
}

.reel:hover {
  cursor: pointer;
}
.container {
  text-align: center;
  padding: 20px;
}

.title {
  margin-top: -50px;
  animation: pulsate 0.11s ease-in-out infinite alternate;
  color: aliceblue;
  font-size: 35px;
  margin-bottom: 20px;
}

.reels {
  display: flex;
  justify-content: center;
  gap: 20px;
}

.reel {
  width: 200px;
  border: 1px solid #ddd;
  color: #ddd;
  padding: 10px;
  background-color: rgb(53, 31, 3);
  border-radius: 5px;
}

.movie-poster {
  width: 100%;
  height: auto;
}

.movie-name {
  font-size: 16px;
  margin-top: 10px;
}

.buttons {
  margin-top: 20px;
}
#bottone1 {
  height: 30px;
  width: 150px;
 padding-left: 33px;
 padding-right: 33px;
 padding-bottom: 16px;
 padding-top: 16px;
 border-radius: 9px;
 border: none;
 font-family: inherit;
 text-align: center;
 cursor: pointer;
 transition: 0.4s;
}

#bottone1:hover {
 box-shadow: 7px 5px 56px -7px #C3D900;
}

#bottone1:active {
 transform: scale(0.97);
 box-shadow: 7px 5px 56px -10px #C3D900;
}




</style>