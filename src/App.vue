<template>
  <v-app>
    <NavBar />
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "App",
  components: {
    NavBar: () => import("@/components/NavBar.vue"),
  },
  data: () => ({
    //
  }),
});
</script>
