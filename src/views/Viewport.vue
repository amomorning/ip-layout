<template>
  <v-app>
    <SideDrawer v-model="drawer" :githubID="authors" :items="items"></SideDrawer>
  
    <v-app-bar absolute app color="transparent" flat>
      <v-app-bar-nav-icon
        @click="drawer = !drawer"
      ></v-app-bar-nav-icon>
    
      <h2>ArchiWeb</h2>
    </v-app-bar>
  
    <v-main class="pt-0">
      
      <!--      single        -->
      <DragCard top="100" left="100"></DragCard>
  
      <!--      multiple        -->
<!--      <DragCard v-for="id in 5" :key="id" :cid="id" ></DragCard>-->
      
      <Viewer :gui="false" container="container" filename="index.js"></Viewer>
      <Toolbox v-if="!$vuetify.breakpoint.mobile" id="toolbox"></Toolbox>
    </v-main>
  </v-app>
</template>

<script>


import DragCard from "@/views/DragCard";
export default {
  name: "Viewport",
  components: {DragCard},
  data: () => ({
    drawer: null,
    authors: ['amomorning'], //在这里输入你的github id(s),
    items:[{
      icon: 'mdi-blur',
      title: 'Item Example',
      content: '<p class="text-h4 ma-4">Content can be <code>html</code> <span class="mdi mdi-flag"></span></p>'
    }]
  }),
}
</script>

<style scoped>

</style>