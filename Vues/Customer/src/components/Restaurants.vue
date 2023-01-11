<template>
    <v-card
      class="mx-auto" 
    >
    <v-container>
      <v-row justify="space-around" class="list-meals pa-1">
        <v-col
          cols="12"
          sm="1"
          md="12"
        >
          <v-sheet
            elevation="10"
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
                  {{ meal.name }}
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
        <v-row>
          <v-col
            v-for="item in items"
            :key="item.id"
            cols="12"
            md="4"  
          >
            <v-item v-slot="{ active, toggle }" class="pa-3">
              <v-img
                :src="require(`../assets/restaurant/${item.src}`)"
                height="150px"
                class="pa-2"
                @click="$emit('DetailsRestaurant', item.name)"
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
              {{item.name}}
            </div>
          </v-col>
        </v-row>
      </v-item-group>
    </v-container>
  </v-card>
</template>

<script>
 export default {
    name: "Restaurants-vue",
    data: () => ({
      items: [
        {
          id : 1,
          name : "Mauricette",
          src : "restaurant-1.jpg",
        },
        {
          id : 2,
          name : "Tourbinette",
          src : "restaurant-2.jpg",
        },
        {
          id : 3,
          name : "Régalo",
          src : "regalo.jpg",
        },
        {
          id : 4,
          name : "SushiTime",
          src : "restaurant-3.jpg",
        },
        {
          id : 5,
          name : "Pompette",
          src : "restaurant-4.jpg",
        },
        {
          id : 6,
          name : "Tartinette",
          src : "restaurant-5.jpg",
        },
      ],
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
    methods: {
      ShowRestaurant(restaurant) {
        console.log(restaurant);
      },
    }
  }
</script>

<style>
  .pa-1 {
    margin-left: 8%;
  } 
  .pa-restaurant {
    margin-left: 17%;
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
    margin-left: 15%;
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