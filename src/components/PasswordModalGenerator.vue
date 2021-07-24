<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="500" persistent>
      <v-card dark :loading="loading">
        <v-card-title class="text-h5 mb-5 blue darken-4">
          {{ title }}
        </v-card-title>

        <v-card-text>
          <p id="password">{{ password }}</p>
          <v-row class="mt-3">
            <v-col>
              <v-select
                :items="['Easy', 'Medium', 'Hard', 'Impossible']"
                v-model="select"
                :label="'Level Of Difficulty'"
              ></v-select>
            </v-col>
          </v-row>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" text @click="close">
            Close
          </v-btn>
          <v-btn color="success" text @click="copy">
            <v-icon>mdi-content-copy</v-icon>
            Copy Password
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-snackbar v-model="snackbar" color="success" timeout="3000">
      Copied Password!
    </v-snackbar>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { v4 as uuidv4 } from "uuid";
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
    select: "",
    canCopy: false,
    snackbar: false,
  }),
  watch: {
    select: function handleChange(val) {
      let title;
      let other_names;
      this.select = val;
      if (this.item.title) {
        title = this.item?.title;
      } else {
        other_names = this.item?.alternative_names;
        title = this.item?.name;
      }
      this.title = title;
      this.generatePassword(this.title, other_names, this.select);
    },
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
      this.generatePassword(this.title, other_names, this.select);
    },
  },
  created() {
    this.canCopy = !!navigator.clipboard;
    this.select = "Medium";
  },
  methods: {
    close() {
      this.select = "Medium";
      this.$emit("close");
    },
    generatePassword(title: string, other_names: [], level: string) {
      const code = "!@#$%^&*()_+";
      const random1 = (str: string) => {
        return Math.floor(Math.random() * str.length);
      };

      const uuid = uuidv4();
      let newUUID = "";
      for (let i = 0; i < uuid.length; i++) {
        if (uuid[i] == "-") {
          newUUID += code[random1(code)];
        } else {
          newUUID += uuid[i];
        }
      }
      let firstPass = newUUID.slice(0, 9);
      let thirdPass = newUUID.slice(10, 20);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let first: any;
      if (other_names?.length > 0) {
        first = other_names;
      }
      if (first?.length > 0) {
        first = first[0];
      } else {
        first = title;
      }
      let secondPass = title.replace(/ /g, "");
      let lastPass = first.replace(/ /g, code[random1(code)]);

      if (level == "Easy") {
        this.password = secondPass;
      } else if (level == "Medium") {
        this.password = firstPass + secondPass;
      } else if (level == "Hard") {
        this.password = lastPass + firstPass + secondPass;
      } else {
        this.password = firstPass + secondPass + thirdPass + lastPass;
      }
    },
    async copy() {
      await navigator.clipboard.writeText(this.password);
      this.snackbar = true;
    },
  },
});
</script>
