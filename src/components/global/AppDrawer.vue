<template>
    <div class="drawer">
        <v-navigation-drawer v-model="drawer" location="left">
<p>Lorem ipsum dolor sit amet consectetur adipisicing elit.
    Officia harum ducimus excepturi deserunt consectetur quis vero,
    dolore officiis esse voluptatum nobis odio aperiam laboriosam voluptates
    distinctio quaerat necessitatibus, ratione unde!</p>
        </v-navigation-drawer>
    </div>
</template>
<script>
export default{
inject:['Emitter'],
data(){
    return {
        drawer:false
    }
},
mounted(){
    this.Emitter.on('openDrawer',()=>{
        this.drawer=!this.drawer;
    })
},
}
</script>