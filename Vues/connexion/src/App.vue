<template>
  <div id="app">
    <v-app-bar
        color="deep-purple accent-4"
        dense
        dark
    >
      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-spacer></v-spacer>

      <v-btn v-if="currentUser" to="/profile" class="nav-link">
        {{ currentUser.name }}
      </v-btn>

      <v-btn @click.prevent="logOut">
        Déconnexion
      </v-btn>

    </v-app-bar>
    <v-app>
      <router-view />
    </v-app>
  </div>
</template>

<script>
export default {
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  },
  methods: {
    logOut() {
      this.$store.dispatch('auth/logout');
      this.$router.push('/login');
    }
  }
};
</script>