<template>
  <layout>
  <router-view/>
</layout>
</template>
<script>
import layout from "@/components/global/layout.vue"
export default {
  components:{
    layout,
  }
}
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}


</style>
