<template>
  <v-container>
    <v-row justify="center" class="mt-5">
      <v-col cols="12" class="text-center">
        <AnimeForm @loading="onLoad" @results="getResults" class="mx-auto" />
      </v-col>
      <v-col cols="12" v-if="loading" class="text-center">
        <v-progress-circular
          :size="100"
          color="primary"
          indeterminate
          class="mx-auto"
        ></v-progress-circular>
      </v-col>
      <template v-if="!loading">
        <v-col v-for="item in items" :key="item.mal_id">
          <AnimeCard
            :title="item.name ? item.name : item.title"
            :img="item.image_url"
            :id="item.mal_id"
            @open="openGeneratePassword(item)"
          />
        </v-col>
      </template>
    </v-row>
    <PasswordModalGenerator
      :dialog="dialog"
      :item="item"
      @close="dialog = false"
    />
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "Home",
  components: {
    AnimeForm: () => import("@/components/AnimeForm.vue"),
    AnimeCard: () => import("@/components/AnimeCard.vue"),
    PasswordModalGenerator: () =>
      import("@/components/PasswordModalGenerator.vue"),
  },
  data: () => ({
    loading: false,
    items: [] as [],
    dialog: false,
    item: {},
  }),
  methods: {
    onLoad(val: boolean) {
      this.loading = val;
    },
    getResults(val: []) {
      this.items = val;
    },
    openGeneratePassword(item: Record<string, unknown>) {
      this.dialog = true;
      this.item = item;
    },
  },
});
</script>
