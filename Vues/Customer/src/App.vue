<template>
  <div id="app" class="app">
    <Banner 
      @MenuRestaurants="RestaurantsView"
      @MenuFavorite="FavoriteView"
      @ProfileVue="ProfileView">
    </Banner>
    <NavBar
      @ShowChange="ShowHamper"
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
  },
  data: () => ({
    showRestaurants: true,
    showFavorite: false,
    showDetailsRestaurants: false,
    showDetailsItems: false,
    showHamper: false,
    showProfile: false,
    showResearchRestaurant: true,
  }),
  methods: {
      RestaurantsView() {
        this.showFavorite = false;
        this.showRestaurants = true;
        this.showDetailsRestaurants = false;
        this.showDetailsItems = false;
        this.showProfile = false;
        this.showResearchRestaurant = true;
      },
      FavoriteView() {
        this.showFavorite = true;
        this.showRestaurants = false;
        this.showDetailsRestaurants = false;
        this.showDetailsItems = false;
        this.showProfile = false;
      },
      DetailsRestaurantView(name) {
        this.showDetailsRestaurants = true;
        this.showFavorite = false;
        this.showRestaurants = false;
        this.showDetailsItems = false;
        this.showProfile = false;
        this.restaurantName = name;
      },
      ProfileView() {
        this.showFavorite = false;
        this.showRestaurants = false;
        this.showDetailsRestaurants = false;
        this.showDetailsItems = false;
        this.showProfile = true;
        this.showResearchRestaurant = false;
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
      }
    }
};
</script>

<style>
  .container { 
    max-width: none; 
  }
</style>
