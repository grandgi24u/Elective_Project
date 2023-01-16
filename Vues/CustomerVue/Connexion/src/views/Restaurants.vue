<template>
  <v-container>
      <v-row justify="space-around" class="list-meals pa-1">
        <v-col
          cols="12"
          sm="1"
          md="12"
        >
          <v-sheet
            class="py-4 px-1"
          >
            <v-chip-group
              mandatory
              active-class="primary--text"
              class="chip-group-class"
              left
            >
              <v-chip
                v-for="meal in meals"
                :key="meal.id"
                class="chip-class-1"
              >
                <v-img :src="require(`../assets/repas/${meal.src}`)" contain/>
                <div class="meal-name">
                  {{ meal.name }}
                </div>
              </v-chip>
            </v-chip-group>
          </v-sheet>
        </v-col>
      </v-row>
      <v-item-group
        class="pa-restaurant" 
        multiple
      >
      <v-divider class="divider-menu"></v-divider>
        <v-form ref="loginForm" lazy-validation>
          <v-row>
            <v-col
              v-for="item in filteredItems"
              :key="item.id"
              cols="12"
              md="4"
            >
              <v-item v-slot="{ active, toggle }" class="pa-3">
                <v-img
                  :src="require(`../assets/restaurant/restaurant-1.jpg`)"
                  height="150px"
                  class="pa-2"
                  @click="DetailsRestaurant(item._id, item.restaurant_name)"
                >
                  <v-btn
                    icon
                    dark
                    class="btn-like"
                  >
                    <v-icon
                      @click="toggle">
                        {{ active ? 'mdi-heart' : 'mdi-heart-outline' }}
                    </v-icon>
                  </v-btn>
                </v-img>
              </v-item>
              <div class="title-name">
                {{item.restaurant_name}}
              </div>
            </v-col>
          </v-row>
        </v-form>
      </v-item-group>
    </v-container>
</template>

<script>
import RestaurantService from '../services/restaurant.service';

 export default {
    name: "Restaurants-vue",
    props: ['searchValueRestaurants'],
    data: () => ({
      restaurants : [],
      meals: [
        {
          id : 1,
          name : "Pizza",
          src : "pizza.jpg",
        },
        {
          id : 2,
          name : "Burger",
          src : "burger.jpg",
        },
        {
          id : 3,
          name : "Sushis",
          src : "sushis.jpg",
        },
        {
          id : 4,
          name : "Pâtes",
          src : "pates.jpg",
        },
        {
          id : 5,
          name : "Kebab",
          src : "kebab.jpg",
        },
        {
          id : 6,
          name : "Salade",
          src : "salade.jpg",
        },
      ],
    }),
   mounted() {
     RestaurantService.getRestaurants().then(
         response => {
            console.log(response.data);
            this.restaurants = response.data;
         },
         error => {
           this.content =
               (error.response && error.response.data) ||
               error.message ||
               error.toString();
         }
     );
   },
   computed: {
      filteredItems() {
        return this.restaurants.filter(item =>
            item.restaurant_name.toLowerCase().includes(this.searchValueRestaurants.toLowerCase())
        );
      },
    },
   methods: {
     DetailsRestaurant(id, name)
     {
       this.$router.push({ name: 'menu', params: { restaurantId: id, restaurantName: name }});
     }
   },
  }
</script>

<style>
  .pa-1 {

  } 
  .pa-restaurant {

  }
  .title-name {
    width: 100%;
    text-align: center;
    float: right;
    font-weight: bold;
  } 
  .btn-like {
    float: right;
  }
  .pa-3 {
    width: 65%;
    margin: auto;
  }
  .divider-menu {
    margin-bottom: 2%;
  }
  .list-meals {
    height: 180px;
  }
  /* .chip-group-class {
    height : 30%;
  } */
  .v-chip.v-size--default {
    height : 30%;
  }
  .v-responsive {
    padding-bottom: 45%;
  }
  .v-slide-group__next {
    height:  126px;
  }
  .v-slide-group__prev {
    height:  126px;
  }
  .v-image__image {
    border-radius: 18px;
  }
</style>