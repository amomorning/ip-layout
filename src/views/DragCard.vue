<template>
  <VueDraggableResizable :draggable="draggable"
                         :resizable="false"
                         :style="'position: absolute;  top:' + top + 'px; left:'+ left +'px;'" w="auto"
                          v-if="show"
  >
    <v-card  width="266">
      
      <v-row no-gutters @mousedown="draggable=true"
             @mouseleave="draggable=false" @mouseup="draggable=false">
        <div class="headline ml-2 mt-1">
          Template {{id}}
        </div>
        <v-spacer></v-spacer>
        <v-icon>mdi-drag</v-icon>
      </v-row>
      
      <v-card-text >
        <v-textarea label="Matrix Form" v-model="content" auto-grow outlined rows="1" hide-details dense>
        </v-textarea>
        
      </v-card-text>
      <v-card-actions>
        <v-btn rounded color="error" dark @click="deleteTemplate"> DELETE</v-btn>
        <v-btn rounded color="primary" @click="createTemplate">CREATE</v-btn>
        <v-btn rounded color="secondary" @click="randomColor">RANDOM</v-btn>
      </v-card-actions>
    </v-card>
  </VueDraggableResizable>

</template>

<script>
import {store} from "@/store.js"
import VueDraggableResizable from 'vue-draggable-resizable'

export default {
  name: "DragCard",
  components: {
    VueDraggableResizable
  },
  props: {
    top: Number,
    left: Number,
  },
  data: () => ({
    draggable: false,
    id: null,
    content: '',
    show: true,
  }),
  mounted() {
    store.DragCard = this;
  },
  methods: {
    deleteTemplate() {
      store.deleteTemplate(this.id);
    },
    createTemplate() {
      store.createTemplate(this.content);
    },
    randomColor() {
      store.changeColor();
    }
  }
}
</script>

<style scoped>

</style>