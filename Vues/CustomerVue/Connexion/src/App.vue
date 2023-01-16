<template>
  <v-app>
    <div id="app">
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

        <Banner
            @MenuRestaurants="RestaurantsView"
            @MenuFavorite="FavoriteView"
            @OrdersVue="OrdersView"
            v-if="showBanner">
        </Banner>
        <NavBar
            v-if="showNavBar"
            @ShowChange="ShowHamper"
            @ResearchRestaurant="DisplayResearchRestaurant"
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
            v-bind:itemId="item"
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
    </div>
  </v-app>
</template>

<script>
import Banner from './views/Banner';
import NavBar from './views/Nav-bar';
import Restaurants from './views/Restaurants';
import Favorite from './views/Favorite';
import DetailsRestaurants from './views/Details-restaurants';
import DetailsItems from './views/Details-items';
import Hamper from './views/Hamper';
import Profile from './views/Profile';
import Orders from './views/Orders';
import DetailsHamper from './views/Details-hamper';

export default {
  components: {
    Banner,
    NavBar,
    Restaurants,
    Favorite,
    DetailsRestaurants,
    Hamper,
    Profile,
    DetailsItems,
    Orders,
    DetailsHamper,
  },
  props: ['showBanner',
          'showNavBar',
          'showRestaurants',
          'showLogin',
          'showOrders',
          'showProfile',
          'showLabelProfile',
          'showResearchRestaurant',
          'showDetailsRestaurants'],
  data: () => ({
    showFavorite: false,
    showDetailsItems: false,
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
      this.showDetailsItems = false;
      this.showDetailsHamper = false;
    },
    FavoriteView() {
      this.showFavorite = true;
      this.showDetailsItems = false;
      this.showDetailsHamper = false;
    },
    DetailsRestaurantView() {
      this.showFavorite = false;
      this.showDetailsItems = false;
      this.showDetailsHamper = false;
    },
    OrdersView() {
      this.showFavorite = false;
      this.showDetailsItems = false;
      this.showDetailsHamper = false;
    },
    ShowHamper()
    {
      this.showHamper = !this.showHamper;
    },
    DetailsItemsView(id)
    {
      this.showDetailsItems = true;
      this.showDetailsHamper = false;
      this.item = id ;
     // this.restaurantName = restaurant;
    },
    DisplayDetailsRestaurants()
    {
      this.showDetailsItems = false;
      this.showDetailsHamper = false;
      //this.restaurantName = restaurant;
    },
    DisplayDetailsHamper()
    {
      this.showFavorite = false;
      this.showDetailsItems = false;
      this.showDetailsHamper = true;
      this.showLabelHamper = true;
      this.showHamper = false;
    },
    DisplayResearchRestaurant() {

    },
    handleSearchValue(value) {
      this.searchValueRestaurants = value;
      console.log(value);
    },
  }
};
</script>

<style>
.container {
  max-width: none;
}
</style>