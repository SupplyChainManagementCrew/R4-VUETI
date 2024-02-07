<template>
  <v-container class="bg-surface-variant">
    <v-row no-gutters>
      <v-col>
        <v-sheet class="pa-2 ma-2">
          <graphMs />
        </v-sheet>
      </v-col>
      <v-col>
        <v-sheet class="pa-2 ma-2">
         <Most/>
        </v-sheet>
      </v-col>
            <v-col>
        <v-sheet class="pa-2 ma-2">
           <Comparison/>
        </v-sheet>
      </v-col>

      <v-responsive width="100%"></v-responsive>

      <v-col>
        <v-sheet class="pa-2 ma-2">
          <orderinfo/>
        </v-sheet>
      </v-col>

      <v-col>
        <v-sheet class="pa-2 ma-2">
          <Delivery/>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Delivery from './components/Delivery.vue'
import orderinfo  from './components/orderInfo.vue'
import Most from './components/Most.vue';
import graphMs from './components/graph-ms.vue'
import Comparison from './components/Comparison.vue'
export default {
  name: 'App',
  components: {
    Delivery,
    orderinfo,
    Most,
    graphMs,
    Comparison
  }
}
</script>
