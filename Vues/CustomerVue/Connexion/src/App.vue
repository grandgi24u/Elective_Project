<template>
  <v-app>
    <div class="app">
      <Sidebar />
      <main>
        <NavBar />
        <router-view />
      </main>
    </div>
  </v-app>
</template>

<script>
import Sidebar from "./components/Sidebar.vue";
import NavBar from "./views/Nav-bar.vue";
export default {
  components: {
    Sidebar,
    NavBar
  },
  props: ['showBanner',
          'showNavBar',
          'showRestaurants',
          'showLogin',
          'showOrders',
          'showProfile',
          'showLabelProfile',
          'showResearchRestaurant',
          'showDetailsRestaurants',
          'showDetailsItems',
          'showResearchItems'],
  data: () => ({
    showFavorite: false,
    showHamper: false,
    showLabelHamper: false,
    showDetailsHamper: false,
    searchValueRestaurants: "",
    searchValueItem: "",
  }),
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  },
  methods: {
    logOut() {
      this.$store.dispatch('auth/logout');
      this.$router.push('/login');
    },
  }
};
</script>

<style lang="scss">
:root {
  --primary: #73A8E7;
  --primary-alt: #22c55e;
  --grey: #64748b;
  --dark: #1e293b;
  --dark-alt: #334155;
  --light: #f1f5f9;
  --sidebar-width: 300px;
}
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Fira sans', sans-serif;
}
body {
  background: var(--light);
}
button {
  cursor: pointer;
  appearance: none;
  border: none;
  outline: none;
  background: none;
}
.app {
  display: flex;
  flex-wrap: wrap;
  align-items: stretch;
  min-height: 100vh;
  main {
    flex: 1 1 0;
    @media (max-width: 1024px) {
      padding-left: 4rem;
      width: 100%;
    }
    @media (max-width: 767px) {
      padding-top: 0;
    }
  }
}
</style>