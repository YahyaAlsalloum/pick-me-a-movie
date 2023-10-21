<template>
  <div class="home" >
<v-row  style="height: 100px;"></v-row>
    <v-row class="mt-12">
      <v-col cols="3"></v-col>
      <v-col cols="6">
        <lucky-machine/>
      </v-col>
      <v-col cols="3"></v-col>
    </v-row>
    </div>
</template>

<script>
import luckyMachine from "@/components/home/luckyMachine.vue"
export default {
  components:{
    luckyMachine,
  },
  name: 'HomeView',
  data: () => ({

    }),
}
</script>
<style>
.home{
  margin-top: -50px;
  background-image: url('@/assets/images/3.jpg');
  background-size: cover;
  width: 100%;
  height: 1000px;
}
</style>