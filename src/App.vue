<template>
  <v-app>
    <v-main>
      <v-container>
        <v-row>
          <v-col cols="12" sm="4">
            <graphMs/>
          </v-col>
          <v-col cols="12" sm="4">
            <Most/>
          </v-col>
          <v-col cols="12" sm="4">
            <Comparison />
          </v-col>
          <v-col cols="12" sm="6">
            <orderinfo/>
          </v-col>
          <v-col cols="12" sm="6">
            <Delivery/>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
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
