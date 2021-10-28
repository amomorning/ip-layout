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
      <Drawer></Drawer>
      <v-btn color="primary"
             icon fab elevation="5"
             style="position: absolute; top: 80px; right: 10px; background: white"
             @click="send"
      ><v-icon>mdi-send</v-icon></v-btn>
  
      <v-btn color="primary"
             icon fab elevation="5"
             style="position: absolute; top: 150px; right: 10px; background: white"
             @click="revert"
      ><v-icon>mdi-undo</v-icon></v-btn>
      
      <Viewer :gui="false" container="ip-layout-ccdfdc" filename="grid-cube.js"></Viewer>
      

<!--      <v-row>-->
<!--        <v-col cols="10">-->
<!--        </v-col>-->
<!--        <v-col cols="2">-->
<!--        </v-col>-->
<!--      </v-row>-->
<!--      -->
      <!--      single        -->
  
      <!--      multiple        -->
<!--      <DragCard v-for="id in 5" :key="id" :cid="id" ></DragCard>-->
      
      <Toolbox v-if="!$vuetify.breakpoint.mobile" id="toolbox"></Toolbox>
    </v-main>
  </v-app>
</template>

<script>

import {store} from "@/store.js"
import Drawer from "@/views/Drawer";
export default {
  name: "Viewport",
  components: {Drawer},
  data: () => ({
    drawer: null,
    authors: ['amomorning'], //在这里输入你的github id(s),
    items:[{
      icon: 'mdi-blur',
      title: 'Item Example',
      content: '<p class="text-h4 ma-4">Content can be <code>html</code> <span class="mdi mdi-flag"></span></p>'
    }]
  }),
  methods: {
    send() {
      store.sendData();
    },
    revert() {
      store.revert();
    }
  }
}
</script>

<style scoped>

</style>