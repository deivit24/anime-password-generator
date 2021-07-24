<template>
  <v-card width="500px">
    <v-form>
      <v-container>
        <v-row>
          <v-col cols="12">
            <v-select
              :items="items"
              v-model="select"
              :label="'Search By: ' + select"
            ></v-select>
          </v-col>
          <v-col cols="12">
            <v-text-field
              :loading="loading"
              :disabled="!select"
              label="Search"
              :key="select"
              v-model="search"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import { Anime } from "@/api/api";

export default Vue.extend({
  name: "AnimeForm",
  data: () => ({
    items: ["anime", "character"],
    select: "",
    search: "",
    loading: false,
  }),
  watch: {
    search: async function handleChange(val) {
      try {
        this.loading = true;
        this.$emit("loading", this.loading);
        if (val.length <= 2) {
          this.$emit("results", []);
        } else {
          const res = await Anime.getSearchItem(this.select, val);
          this.$emit("results", res.results);
        }
      } catch (error) {
        console.log(error);
      } finally {
        this.loading = false;
        this.$emit("loading", this.loading);
      }
    },
  },
});
</script>
