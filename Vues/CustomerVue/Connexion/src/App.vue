<template>
  <v-app>
    <div id="app" class="app">
      <Sidebar
          @MenuRestaurants="RestaurantsView"
          @MenuFavorite="FavoriteView"
          @OrdersVue="OrdersView"
          v-if="showBanner">
      </Sidebar>
    <main>

  <!--  <v-app-bar
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
      <Login
        v-if="showLogin">
    </Login>
    </v-app-bar>    -->

        <router-view/>



        <NavBar
            v-if="showNavBar"
            @ShowChange="ShowHamper"
            v-bind:showResearchRestaurant="showResearchRestaurant"
            v-bind:showLabelProfile="showLabelProfile"
            v-bind:showLabelHamper="showLabelHamper"
            v-on:search-value-changed="handleSearchValue"
           >
        </NavBar>
        <Hamper
            v-if="showHamper"
            @ShowChange="ShowHamper"
            @ValidHamper="DisplayDetailsHamper">
        </Hamper>
        <Restaurants
            v-if="showRestaurants"
            @DetailsRestaurant="DetailsRestaurantView"
            v-bind:searchValueRestaurants="searchValueRestaurants">
        </Restaurants>
        <Favorite
            v-if="showFavorite">
        </Favorite>
        <DetailsRestaurants
            v-if="showDetailsRestaurants"
            @DetailsItems="DetailsItemsView">
        </DetailsRestaurants>
        <DetailsItems
            v-if="showDetailsItems"
            @RetourDetailsRestaurants="DisplayDetailsRestaurants">
        </DetailsItems>
        <Profile
            v-if="showProfile">
        </Profile>
        <Orders
            v-if="showOrders">
        </Orders>
        <DetailsHamper
            v-if="showDetailsHamper">
        </DetailsHamper>
      </main>
    </div>
  </v-app>
</template>

<script>
//import Banner from './views/Banner';
import NavBar from './views/Nav-bar';
import Restaurants from './views/Restaurants';
import Favorite from './views/Favorite';
import DetailsRestaurants from './views/Details-restaurants';
import DetailsItems from './views/Details-items';
import Hamper from './views/Hamper';
import Profile from './views/Profile';
import Orders from './views/Orders';
import DetailsHamper from './views/Details-hamper';
import Sidebar from "./components/Sidebar.vue";

export default {
  components: {
    //Banner,
    NavBar,
    Restaurants,
    Favorite,
    DetailsRestaurants,
    Hamper,
    Profile,
    DetailsItems,
    Orders,
    DetailsHamper,
    Sidebar,
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
          'showDetailsItems'],
  data: () => ({
    showFavorite: false,
    showHamper: false,
    showLabelHamper: false,
    showDetailsHamper: false,
    searchValueRestaurants: "",
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
    RestaurantsView() {
      this.showFavorite = false;
      this.showDetailsHamper = false;
    },
    FavoriteView() {
      this.showFavorite = true;
      this.showDetailsHamper = false;
    },
    DetailsRestaurantView() {
      this.showFavorite = false;
      this.showDetailsHamper = false;
    },
    OrdersView() {
      this.showFavorite = false;
      this.showDetailsHamper = false;
    },
    ShowHamper()
    {
      this.showHamper = !this.showHamper;
    },
    DetailsItemsView(id)
    {
      this.showDetailsHamper = false;
      this.item = id ;
    },
    DisplayDetailsRestaurants()
    {
      this.showDetailsHamper = false;
    },
    DisplayDetailsHamper()
    {
      this.showFavorite = false;
      this.showDetailsHamper = true;
      this.showLabelHamper = true;
      this.showHamper = false;
    },
    handleSearchValue(value) {
      this.searchValueRestaurants = value;
      console.log(value);
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
  main {
    flex: 1 1 0;
    @media (max-width: 1024px) {
      padding-left: 5rem;
      width: 100%;
    }
  }
}
</style>