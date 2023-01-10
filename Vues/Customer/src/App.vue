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
      v-bind:restaurant="restaurantName">
    </DetailsRestaurants>
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
  },
  data: () => ({
    showRestaurants: true,
    showFavorite: false,
    showDetailsRestaurants: false,
    showHamper: false,
    showProfile: false,
    showResearchRestaurant: true,
  }),
  methods: {
      RestaurantsView() {
        this.showFavorite = false;
        this.showRestaurants = true;
        this.showDetailsRestaurants = false;
        this.showProfile = false;
        this.showResearchRestaurant = true;
      },
      FavoriteView() {
        this.showFavorite = true;
        this.showRestaurants = false;
        this.showDetailsRestaurants = false;
        this.showProfile = false;
      },
      DetailsRestaurantView(name) {
        this.showDetailsRestaurants = true;
        this.showFavorite = false;
        this.showRestaurants = false;
        this.showProfile = false;
        this.restaurantName = name;
      },
      ProfileView() {
        this.showFavorite = false;
        this.showRestaurants = false;
        this.showDetailsRestaurants = false;
        this.showProfile = true;
        this.showResearchRestaurant = false;
      },
      ShowHamper()
      {
        this.showHamper = !this.showHamper;
      }
    }
};
</script>

<style>
  .container { 
    max-width: none; 
  }
</style>
