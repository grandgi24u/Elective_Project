<template>
  <v-app>
    <v-main class="div-main">
      <login-form/>
    </v-main>
  </v-app>
</template>

<script>
import LoginForm from "@/components/LoginForm.vue";

export default {
  name: 'App',
  components: {
    LoginForm,
  },
  data: () => ({
    //
  }),
  methods: {
    //
  },
};
</script>

<style>
  .div-main {
    background-color: lightcoral ;
  }
</style>