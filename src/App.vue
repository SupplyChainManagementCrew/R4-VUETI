<template>
  <v-app>
    <v-main>
      <Delivery/>
      <orderinfo/>
      <Most/>
      <graphMs/>
      <Comparison />
    </v-main>
    <v-btn>
  Button
</v-btn>
  </v-app>
</template>

<script>
import Delivery from './components/Delivery.vue'
import orderinfo  from './components/orderInfo.vue'
import Most from './components/Most.vue'
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
