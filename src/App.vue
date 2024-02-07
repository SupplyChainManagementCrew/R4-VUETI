<template>
<v-app>
<v-main>
<v-container>
        <v-row no-gutters>
          <v-col>
            <v-sheet class="pa-2 ma-2">
              <Delivery />
            </v-sheet>
          </v-col>
          <v-col>
            <v-sheet class="pa-2 ma-2">
              <orderinfo />
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
const links = ["Dashboard", "Messages", "Profile", "Updates"];
</script>

<script>
import Delivery from "./components/Delivery.vue";
import orderinfo from "./components/orderInfo.vue";
import Most from "./components/Most.vue";
import graphMs from "./components/graph-ms.vue";
import Comparison from "./components/Comparison.vue";

export default {
  data: () => ({
    links: ["Dashboard", "Messages", "Profile", "Updates"],
    name: "App",
    components: {
      Delivery,
      orderinfo,
      Most,
      graphMs,
      Comparison,
    },
  }),
};
</script>