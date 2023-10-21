<template>
<div class="layout">
<v-layout>
<appdrawer></appdrawer>
<v-main>
    <slot></slot>
</v-main>
<app-nav></app-nav>
</v-layout>

</div>
</template>
<script>
import AppNav from "@/components/global/AppNavBar.vue";
import Appdrawer from "@/components/global/AppDrawer.vue";
export default{
    components:{
        AppNav,
        Appdrawer,
    }
}
</script>