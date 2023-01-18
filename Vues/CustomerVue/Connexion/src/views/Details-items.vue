<template>
  <v-container class="contrainer-restaurants">
        <v-btn icon  @click="RetourRestaurant()">
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>

        <img class="logo-item" src="../assets/repas/entree1_Mauricette.jpg">

        <div class="description-item">
          <v-form ref="validFormItem" lazy-validation>
           <v-list-item-content>
              <v-list-item-title><strong>{{menuName}}</strong></v-list-item-title>
            </v-list-item-content>
            <v-list-item-content>
              <v-list-item-title>{{menuPrice}} €</v-list-item-title>
            </v-list-item-content>
            <v-list-item-content>
              <v-list-item-title>{{menuDescription}}</v-list-item-title>
            </v-list-item-content>

            <div v-if="DisplayItemsRequired">
              <v-divider></v-divider>
              Composé de :
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
              Possibilité d'ajouter :
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
                <v-list-item-content style="padding-left: 10px">
                    <v-checkbox :value="item._id" v-model="itemOptionnel" label="Je veux"></v-checkbox>
                </v-list-item-content>
              </v-list-item>

            </div>

            <v-col class="d-flex ml-auto" cols="12" sm="3" xsm="12">
              <v-btn @click="AddMenuToHamper()">Ajouter à mon panier</v-btn>
            </v-col>
           </v-form>
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
      itemOptionnel: [],
      DisplayItemsRequired: false,
      DisplayItemsOptional: false,
      menuName: '',
      menuDescription: '',
      menuPrice: '',
      id: '',
      restaurantName: '',
    }),
     methods: {
       RetourRestaurant()
       {
         this.$router.push({ name: 'menu', params: { restaurantId: this.id }});
       },
       AddMenuToHamper() {
         if ((this.$store.state.orderModule.order) == null) {
              this.$store.dispatch('orderModule/register', {
                price: this.menuPrice,
                restaurantId: this.id
              }).then (() => {
                this.$store.dispatch('orderModule/registerMenu', {
                  id: this.$store.state.orderModule.order._id,
                  menuId: this.$route.params.menuId,
                }).then (() => {
                  for (const value of this.itemOptionnel) {
                   this.$store.dispatch('orderModule/registerItemOptionnel', {
                      id: this.$store.state.orderModule.order._id,
                      itemId: value,
                    })
                  }
                })
              })
            } else {
                 this.$store.dispatch('orderModule/registerMenu', {
                   id: this.$store.state.orderModule.order._id,
                   menuId: this.$route.params.menuId,
                 }).then (() => {
                   for (const value of this.itemOptionnel) {
                     this.$store.dispatch('orderModule/registerItemOptionnel', {
                       id: this.$store.state.orderModule.order._id,
                       itemId: value,
                     })
                   }
                 })
            }
       },
     },
     computed: {
       currentUser() {
         return this.$store.state.auth.user;
       },
     },
     mounted() {
       this.id = this.$route.params.restaurantId;
         RestaurantService.getDetailsMenu(this.$route.params.menuId, this.$route.params.restaurantId).then(
         response => {
           this.detailsMenu = response.data;
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
    display: flex;
    width: 100%;
  }
  .description-item {
    margin-left: 5%;
    margin-top: 3%;
  }
  .v-image__image {
    border-radius: 18px;
  }
  .logo-item {
    margin-left: 6%;
    margin-top: 3%;
  }
  .text-field-quantity {
    background-color: #D4D4D4;
    width: 15%;
  }
</style>