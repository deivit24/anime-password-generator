<template>
  <div>
    <v-app-bar color="deep-purple accent-4" dark height="64">
      <v-toolbar-title>Anime Password Generator</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-menu left bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn text v-bind="attrs" v-on="on">
            <v-icon>mdi-dots-vertical</v-icon>
            Options
          </v-btn>
        </template>

        <v-list>
          <v-list-item>
            <v-list-item-title>K-POP</v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>Manga</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "NavBar",
});
</script>
