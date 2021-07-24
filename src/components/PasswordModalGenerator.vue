<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="500" persistent>
      <v-card dark :loading="loading">
        <v-card-title class="text-h5 blue darken-4">
          {{ title }}
        </v-card-title>

        <v-card-text>
          {{ password }}
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" text @click="close">
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "PasswordModalGenerator",
  props: {
    dialog: {
      type: Boolean,
      required: true,
    },
    item: {
      type: Object,
      required: true,
    },
  },
  data: () => ({
    password: "",
    title: "",
    loading: false,
  }),
  watch: {
    item: function handleChange(val) {
      let title;
      let other_names;

      if (val.title) {
        title = val?.title;
      } else {
        other_names = val?.alternative_names;
        title = val?.name;
      }
      this.title = title;
      this.generatePassword(this.title, other_names);
    },
  },
  methods: {
    close() {
      this.$emit("close");
    },
    generatePassword(title: string, other_names: []) {
      this.password = title;
      console.log(other_names);
    },
  },
});
</script>
