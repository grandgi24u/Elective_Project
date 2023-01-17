<template>
  <v-container class="div-container">

    <v-list nav dense>
      <v-list-item-group
          color="primary"
      >
        <v-list>
          <v-btn icon @click="RetourTousRestaurants()">
            <v-icon>mdi-arrow-left</v-icon>
          </v-btn>
          Bienvenue chez {{restaurantName}}
        </v-list>
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


      <div class="div-menu-restaurant" v-if="displayMenus">
        <v-row>
          <v-col
            v-for="item in filteredMenus"
            :key="item.id"
            cols="12"
            md="4"
            style="padding-top: 0;"
          >
            <v-card
                class="mx-auto my-12"
                max-width="374"
            >
              <template slot="progress">
                <v-progress-linear
                    color="deep-purple"
                    height="10"
                    indeterminate
                ></v-progress-linear>
              </template>

              <v-img
                  :src="require(`../assets/repas/menu1_Mauricette.jpg`)"
                  height="150"
                  @click="DetailsItem(item._id, id)"
              />

              <v-card-title style="padding-bottom: 0">{{item.menu_name}}</v-card-title>

              <v-card-text>
                <div class="my-4 text-subtitle-1">
                  {{item.menu_price}} €
                </div>

                <div style="text-align: justify">{{item.menu_description}}</div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </div>

    <div class="div-menu-restaurant" v-if="displayItems">
      <v-row>
        <v-col
            v-for="item in filteredItems"
            :key="item.id"
            cols="12"
            md="4"
        >
          <v-card
              class="mx-auto my-12"
              max-width="374"
          >
            <template slot="progress">
              <v-progress-linear
                  color="deep-purple"
                  height="10"
                  indeterminate
              ></v-progress-linear>
            </template>

            <v-img
                :src="require(`../assets/repas/menu1_Mauricette.jpg`)"
                height="150"
            />

            <v-card-title style="padding-bottom: 0">{{item.item_name}}</v-card-title>

            <v-card-text>
              <div class="my-4 text-subtitle-1">
                Prix : {{item.item_price}} €
              </div>

              <div style="text-align: justify;margin-bottom: 10px">{{item.item_description}}</div>

              <div>  <v-btn @click="AddItemToHamper()">Ajouter à mon panier</v-btn></div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </div>

  </v-container>
</template>

<script>
import RestaurantService from '../services/restaurant.service';

 export default {
    name : "Details-Restaurant-vue",
    props: ['restaurantId', 'searchValueItem'],
    data: () => ({
      listMenus : [],
      drawer: true,
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
      AddItemToHamper() {
        /*if ((this.$store.state.orderModule.order) == null) {
          console.log(this.$route.params.menuId)
          this.$store.dispatch('orderModule/register', {
            price: this.menuPrice,
            restaurantId: this.id,
            menuId: this.$route.params.menuId,
          })
        } else {
          console.log(this.$store.state.orderModule.order);
        }*/
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
     computed: {
       filteredMenus() {
         return this.listMenus.filter(item =>
             item.menu_name.toLowerCase().includes(this.searchValueItem.toLowerCase())
         );
       },
       filteredItems() {
         return this.listItems.filter(item =>
             item.item_name.toLowerCase().includes(this.searchValueItem.toLowerCase())
         );
       },
     },
  }
</script>

<style>
  .list-choice {
    width: 20%;
  }
  .div-container {
    display : flex;
    margin-left: 0px;
    padding: 0px;
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