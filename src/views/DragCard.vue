<template>
  <VueDraggableResizable :draggable="draggable"
                         :resizable="false"
                         :style="'position: absolute;  top:' + top + 'px; left:'+ left +'px;'" w="auto">
    <v-card height="120" width="120">
      
      <v-row no-gutters @mousedown="draggable=true"
             @mouseleave="draggable=false" @mouseup="draggable=false">
        <div class="headline ml-2 mt-1">
          Title
        </div>
        <v-spacer></v-spacer>
        <v-icon>mdi-drag</v-icon>
      </v-row>
      
      <v-card-text>
        hello
        <br>
        cube {{ cid }}
      </v-card-text>
    </v-card>
  </VueDraggableResizable>

</template>

<script>
import VueDraggableResizable from 'vue-draggable-resizable'

export default {
  name: "DragCard",
  components: {
    VueDraggableResizable
  },
  props: {
    cid: Number,
    top: Number,
    left: Number,
  },
  data: () => ({
    draggable: false,
  })
}
</script>

<style scoped>

</style>