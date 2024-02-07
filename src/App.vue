<template>
  <v-app>
    <v-main>
      <v-container>
        <v-row>
          <v-col>
            <Delivery/>
          </v-col>
          <v-col>
            <orderinfo/>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <Most/>
          </v-col>
          <v-col>
            <graphMs/>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <Comparison />
          </v-col>
        </v-row>
        <!-- 추가된 버튼 -->
        <v-row>
          <v-col>
            <v-btn>
              Button
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
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
