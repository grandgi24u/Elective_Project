<template>
  <div id="app" class="app">
    <Banner 
      @MenuRestaurants="RestaurantsView"
      @MenuFavorite="FavoriteView">
    </Banner>
    <NavBar
      @ShowChange="ShowHamper">
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
  </div>
</template>

<script>
import Banner from './components/Banner';
import NavBar from './components/Nav-bar';
import Restaurants from './components/Restaurants';
import Favorite from './components/Favorite';
import DetailsRestaurants from './components/Details-restaurants';
import Hamper from './components/Hamper';

export default {
  name: 'App',
  components: {
    Banner,
    NavBar,
    Restaurants,
    Favorite,
    DetailsRestaurants,
    Hamper,
  },
  data: () => ({
    showRestaurants: true,
    showFavorite: false,
    showDetailsRestaurants: false,
    showHamper: false,
  }),
  methods: {
      RestaurantsView() {
        this.showFavorite = false;
        this.showRestaurants = true;
        this.showDetailsRestaurants = false;
      },
      FavoriteView() {
        this.showFavorite = true;
        this.showRestaurants = false;
        this.showDetailsRestaurants = false;
      },
      DetailsRestaurantView(name) {
        this.showDetailsRestaurants = true;
        this.showFavorite = false;
        this.showRestaurants = false;
        this.restaurantName = name;
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
