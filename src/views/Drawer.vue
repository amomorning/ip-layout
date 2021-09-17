<template>
  <div style="position: absolute; top: 10px; right: 10px;z-index: 999">
    <v-dialog
      v-model="dialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="primary"
          v-bind="attrs"
          v-on="on"
          icon
          style="background: white"
          fab
          elevation="5"
        >
          <v-icon>
            mdi-cog
          </v-icon>
        </v-btn>
      </template>
      <v-card>
  
        <DragCard :top="30" :left="30"></DragCard>
        <Viewer :gui="false" container="ip-template-ccdfdc" filename="ip-template.js"></Viewer>
        <div style="position: absolute; top: 10px; right: 10px">
    
            <v-btn @click="dialog=false" icon color="primary" fab style="background: white">
              <v-icon>
                mdi-close
              </v-icon>
            </v-btn>
          
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import DragCard from "@/views/DragCard";
export default {
  name: "Drawer",
  components: {DragCard},
  data: () =>({
    dialog: false,
  })
}
</script>

<style scoped>

</style>