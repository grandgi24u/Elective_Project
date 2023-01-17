<template>
  <v-container class="div-container">
    <v-btn icon @click="RetourTousRestaurants()">
      <v-icon>mdi-arrow-left</v-icon>
    </v-btn>

    <div class="list-choice">
          <v-list nav dense>
            <v-list-item-group
              color="primary"
            >
            <v-list>Bienvenue chez {{restaurantName}}</v-list>
              <v-list-item
                v-for="(item, i) in menuLists"
                :key="i"
                @click="ViewChoice(item.name)"
              >
                <v-list-item-icon>
                  <v-icon></v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                  <v-list-item-title><strong>{{item.name}}</strong></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
      </div>

      <div class="div-menu-restaurant" v-if="displayMenus">
        <v-row>
          <v-col
            v-for="item in listMenus"
            :key="item.id"
            cols="12"
            md="4"  
          >
            <v-img
                :src="require(`../assets/repas/menu1_Mauricette.jpg`)"
                height="150px"
                class="pa-2"
                @click="DetailsItem(item._id, id)"
            />
            <div class="title-name">
              {{item.menu_name}}
            </div>
            <div class="subtitle-name">
              {{item.menu_price}} €
            </div>
          </v-col>
        </v-row>
      </div>

    <div class="div-menu-restaurant" v-if="displayItems">
      <v-row>
        <v-col
            v-for="item in listItems"
            :key="item.id"
            cols="12"
            md="4"
        >
          <v-img
              :src="require(`../assets/repas/menu1_Mauricette.jpg`)"
              height="150px"
              class="pa-2"
          />

          <div class="title-name">
            {{item.item_name}}
          </div>
          <div class="subtitle-name">
            {{item.item_description}}
          </div>
        </v-col>
      </v-row>
    </div>
  </v-container> 
</template>

<script>
import RestaurantService from '../services/restaurant.service';

 export default {
    name : "Details-Restaurant-vue",
    props: ['restaurantId'],
    data: () => ({
      listMenus : [],
      listItems : [],
      displayItems : false,
      displayMenus : true,
      id: "",
      restaurantName: "",
      menuLists: [
        {
          id : 1,
          name : "Menu"
          // icon: 'mdi-clock',
        },
        {
          id : 2,
          name : "Items"
          // icon: 'mdi-account',
        },
      ],
    }),
    methods: {
      DetailsItem(menuId, id)
      {
        this.$router.push({ name: 'details', params: { restaurantId: id, menuId: menuId }});
      },
      ViewChoice(name)
      {
        if (name == "Menu")
        {
          this.displayMenus = true;
          this.displayItems = false;
        } else {
          this.displayMenus = false;
          this.displayItems = true;
        }
      },
      RetourTousRestaurants()
      {
        this.$router.push('/restaurants');
      }
    },
   mounted() {
       this.id = this.$route.params.restaurantId;

       RestaurantService.getMenus(this.$route.params.restaurantId).then(
           response => {
             this.listMenus = response.data;
             console.log(response.data);
           },
           error => {
             this.content =
                 (error.response && error.response.data) ||
                 error.message ||
                 error.toString();
           }
       ),

       RestaurantService.getItems(this.$route.params.restaurantId).then(
           response => {
             this.listItems = response.data;
           },
           error => {
             this.content =
                 (error.response && error.response.data) ||
                 error.message ||
                 error.toString();
           }
       ),
       RestaurantService.getRestaurantById(this.$route.params.restaurantId).then(
            response => {
              //console.log(response.data)
              this.restaurantName = response.data.restaurant_name;
            },
            error => {
              console.log("fonctionne pas"),
                  this.content =
                      (error.response && error.response.data) ||
                      error.message ||
                      error.toString();
            }
        );
     },
  }
</script>

<style>
  .list-choice {
    width: 20%;
    border-right : 1px dashed black;
  }
  .div-container {
    display : flex;
    margin-left: 0px
  }
  .div-menu-restaurant {
    margin-left: 2%;
  }
  .subtitle-name {
    width: 100%;
    text-align: center;
    float: right;
  }
</style>