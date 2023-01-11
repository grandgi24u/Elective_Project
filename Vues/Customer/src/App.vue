<template>
  <div id="app" class="app">
    <Banner 
      @MenuRestaurants="RestaurantsView"
      @MenuFavorite="FavoriteView"
      @ProfileVue="ProfileView"
      @OrdersVue="OrdersView">
    </Banner>
    <NavBar
      @ShowChange="ShowHamper"
      @ResearchRestaurant="DisplayResearchRestaurant"
      v-bind:showResearchRestaurant="showResearchRestaurant">
    </NavBar>
    <Hamper 
      v-if="showHamper"
      @ShowChange="ShowHamper">
    </Hamper>
    <Restaurants 
      v-if="showRestaurants"
      @DetailsRestaurant="DetailsRestaurantView">
    </Restaurants>
    <Favorite 
      v-if="showFavorite">
    </Favorite>
    <DetailsRestaurants 
      v-if="showDetailsRestaurants"
      v-bind:restaurant="restaurantName"
      @DetailsItems="DetailsItemsView">
    </DetailsRestaurants>
    <DetailsItems
        v-if="showDetailsItems"
        v-bind:itemId="item"
        v-bind:restaurant="restaurantName"
        @RetourDetailsRestaurants="DisplayDetailsRestaurants">
    </DetailsItems>
    <Profile
      v-if="showProfile">
    </Profile>
    <Orders
        v-if="showOrders">
    </Orders>
  </div>
</template>

<script>
import Banner from './components/Banner';
import NavBar from './components/Nav-bar';
import Restaurants from './components/Restaurants';
import Favorite from './components/Favorite';
import DetailsRestaurants from './components/Details-restaurants';
import DetailsItems from './components/Details-items';
import Hamper from './components/Hamper';
import Profile from './components/Profile';
import Orders from './components/Orders';

export default {
  name: 'App',
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
  },
  data: () => ({
    showRestaurants: true,
    showFavorite: false,
    showDetailsRestaurants: false,
    showDetailsItems: false,
    showHamper: false,
    showProfile: false,
    showResearchRestaurant: true,
    showOrders: false,
  }),
  methods: {
      RestaurantsView() {
        this.showFavorite = false;
        this.showRestaurants = true;
        this.showDetailsRestaurants = false;
        this.showDetailsItems = false;
        this.showProfile = false;
        this.showResearchRestaurant = true;
        this.showOrders = false;
      },
      FavoriteView() {
        this.showFavorite = true;
        this.showRestaurants = false;
        this.showDetailsRestaurants = false;
        this.showDetailsItems = false;
        this.showProfile = false;
        this.showOrders = false;
      },
      DetailsRestaurantView(name) {
        this.showDetailsRestaurants = true;
        this.showFavorite = false;
        this.showRestaurants = false;
        this.showDetailsItems = false;
        this.showProfile = false;
        this.showOrders = false;
        this.restaurantName = name;
      },
      ProfileView() {
        this.showFavorite = false;
        this.showRestaurants = false;
        this.showDetailsRestaurants = false;
        this.showDetailsItems = false;
        this.showProfile = true;
        this.showOrders = false;
        this.showResearchRestaurant = false;
      },
      OrdersView() {
        this.showFavorite = false;
        this.showRestaurants = false;
        this.showDetailsRestaurants = false;
        this.showDetailsItems = false;
        this.showProfile = false;
        this.showOrders = true;
        this.showResearchRestaurant = true;
      },
      ShowHamper()
      {
        this.showHamper = !this.showHamper;
      },
      DetailsItemsView(id, restaurant)
      {
        this.showDetailsRestaurants = false;
        this.showDetailsItems = true;
        this.item = id ;
        this.restaurantName = restaurant;
      },
      DisplayDetailsRestaurants(restaurant)
      {
        this.showDetailsRestaurants = true;
        this.showDetailsItems = false;
        this.restaurantName = restaurant;
      },
      DisplayResearchRestaurant()
      {

      }
    }
};
</script>

<style>
  .container { 
    max-width: none; 
  }
</style>
