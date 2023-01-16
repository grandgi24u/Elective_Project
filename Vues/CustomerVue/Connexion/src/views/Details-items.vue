<template>
  <v-container class="div-container">
      <div class="div-menu-item">
        <v-btn icon  @click="RetourRestaurant(id)">
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
        <img class="logo-item" src="../assets/repas/entree1_Mauricette.jpg">
        <div class="description-item">
         <v-list-item-content>
            <v-list-item-title><strong>{{menuName}}</strong></v-list-item-title>
          </v-list-item-content>
          <v-list-item-content>
            <v-list-item-title>{{menuPrice}} €</v-list-item-title>
          </v-list-item-content>
          <v-list-item-content>
            <v-list-item-title>{{menuDescription}}</v-list-item-title>
          </v-list-item-content>

          <v-divider></v-divider>

          <div v-if="DisplayItemsRequired">
            Items obligatoires:
            <v-list-item
                v-for="item in detailsMenu.id_required_items"
                :key="item.id"
            >
              <v-list-item-content>
                <v-list-item-title><strong>{{item.item_name}}</strong></v-list-item-title>
              </v-list-item-content>
              <v-list-item-content>
                <v-list-item-title>{{item.item_description}}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </div>

          <div v-if="DisplayItemsOptional">
            Items optionels:
            <v-list-item
                v-for="item in detailsMenu.id_optional_items"
                :key="item.id"
            >
              <v-list-item-content>
                <v-list-item-title><strong>{{item.item_name}}</strong></v-list-item-title>
              </v-list-item-content>
              <v-list-item-content>
                <v-list-item-title>{{item.item_description}}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </div>
          <!-- <v-row>
             <v-col
                 v-for="item in detailsMenu"
                 :key="item.id"
                 cols="12"
                 md="4"
             >
               <div class="title-name">
                 {{item.menu_name}}
               </div>
             </v-col>
           </v-row>-->

          <v-col class="d-flex ml-auto" cols="12" sm="3" xsm="12">
            <v-btn @click="$emit('AddToHamper')">Ajouter à mon panier</v-btn>
          </v-col>
        </div>
      </div>
  </v-container> 
</template>

<script>
 import RestaurantService from "../services/restaurant.service";

 export default {
    name : "Details-Items-vue",
    props: ['restaurantId',
     'menuId'],
    data: () => ({
      detailsMenu: [],
      DisplayItemsRequired: false,
      DisplayItemsOptional: false,
      menuName: '',
      menuDescription: '',
      menuPrice: '',
      id: '',
      restaurantName: '',
    }),
     methods: {
       RetourRestaurant(id)
       {
         this.$router.push({ name: 'menu', params: { restaurantId: id }});
       },
     },
     mounted() {
       console.log(this.$route.params.restaurantId),
       console.log(this.$route.params.menuId);
       this.id = this.$route.params.restaurantId;

           RestaurantService.getDetailsMenu(this.$route.params.menuId, this.$route.params.restaurantId).then(
           response => {
             this.detailsMenu = response.data;
             console.log(this.detailsMenu.id_required_items)
             if ((this.detailsMenu.id_required_items) != "")
             {
               this.DisplayItemsRequired = true;
             } else {
               this.DisplayItemsRequired = false;
             }
             if ((this.detailsMenu.id_optional_items) != "")
             {
               this.DisplayItemsOptional = true;
             } else {
               this.DisplayItemsOptional = false;
             }
             this.menuName = this.detailsMenu.menu_name;
             this.menuDescription = this.detailsMenu.menu_description;
             this.menuPrice= this.detailsMenu.menu_price;
           },
           error => {
             this.content =
                 (error.response && error.response.data) ||
                 error.message ||
                 error.toString();
           }
       )
     },
  }
</script>

<style>
  .div-container {
    display : flex; 
  }
  .div-menu-item {
    margin-left: 18%;
    display: flex;
    width: 100%;
  }
  .description-item {
    margin-left: 5%;
    margin-top: 3%;
    width: 50%;
  }
  .v-image__image {
    border-radius: 18px;
  }
  .logo-item {
    margin-left: 6%;
    margin-top: 3%;
  }
  .d-flex {
    margin-top: 15%;
  }
</style>