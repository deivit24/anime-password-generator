<template>
  <v-card class="mx-auto" max-width="344">
    <v-img :src="img" height="390px"></v-img>

    <v-card-title>
      {{ title }}
    </v-card-title>

    <v-card-actions>
      <v-btn color="orange lighten-2" text @click="openGeneratePassword">
        Select
      </v-btn>
      <v-spacer></v-spacer>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "AnimeCard",
  props: {
    title: {
      type: String,
      required: true,
    },
    id: {
      type: Number,
      required: true,
    },
    img: {
      type: String,
      required: true,
    },
  },
  methods: {
    openGeneratePassword() {
      this.$emit("open");
    },
  },
});
</script>
