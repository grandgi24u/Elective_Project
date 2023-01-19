<template>
  <v-card>
    <v-toolbar
        class="toolbar"
        color="#73A8E7"
        fixed
        >

      <img class="logo" src="../assets/logo-cesi-eat.png" @click="RetourTousRestaurants()" height="76%" >
      <v-spacer></v-spacer>
     <!-- <v-spacer></v-spacer>

      <v-btn icon v-if="showResearchRestaurant">
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-text-field
          placeholder="Rechercher"
          single-line
          hide-details
          v-model="searchValueRestaurants"
          @input="emitSearchValue"
          v-if="showResearchRestaurant"/>

      <v-btn icon v-if="showResearchItems">
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-text-field
          placeholder="Rechercher"
          single-line
          hide-details
          @input="emitSearchValueItem"
          v-model="searchValueItem"
          v-if="showResearchItems"/>
      <v-spacer></v-spacer>-->
      <v-toolbar-title v-if="showLabelProfile" class="title"><strong>Mon profil</strong></v-toolbar-title>
      <v-toolbar-title v-if="showLabelHamper" class="title"><strong>Récapitulatif de ma commande</strong></v-toolbar-title>

      <v-btn class="icon-basket" @click="ViewHamper()" icon>
        <v-icon>mdi-basket</v-icon>
      </v-btn>
    </v-toolbar>

      <v-navigation-drawer
          color="var(--dark)"
          absolute
          permanent
          right
          style="height: 100vh"
          v-if="ShowHamper"
      >
        <template v-slot:prepend>
          <v-list-item two-line>
            <v-list-item-content>
              <v-list-item-title style="color:#73A8E7"><strong>Mon panier</strong>
                <v-btn style="float:right" class="icon-basket" @click="ViewHamper()" icon>
                  <v-icon style="color:#73A8E7">mdi-basket</v-icon>
                </v-btn>
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>

        <v-divider></v-divider>

        <v-list dense>
          <v-list-item-group
              color="primary"
          >

          <div v-if="detailsMenu.length || detailsItem.length">
            <v-list-item
                v-for="(item, i) in detailsMenu"
                :key="i"
                class="list-item"
                style="margin-bottom:10px"
            >
              <v-btn @click="DeleteMenuInOrder(item._id, item.menu_price)" icon>
                <v-icon style="color:#73A8E7">mdi-minus</v-icon>
              </v-btn>

              <v-img
                  :src="require(`../assets/repas/entree1_Mauricette.jpg`)"
                  max-width="97px"
                  class="pa-2"
              />

              <v-list-item-content class="list-elements">
                <v-list-item-title style="color:#73A8E7"><strong>{{item.menu_name}}</strong></v-list-item-title>
                <v-list-item-title style="color:#73A8E7">Prix : {{item.menu_price}} €</v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-list-item
                v-for="(item, i) in detailsItemOption"
                :key="i"
                class="list-item"
                style="margin-bottom:10px"
            >
              <v-btn @click="DeleteItemInOrderOption(item._id, item.item_price)" icon>
                <v-icon style="color:#73A8E7">mdi-minus</v-icon>
              </v-btn>

              <v-img
                  :src="require(`../assets/repas/entree1_Mauricette.jpg`)"
                  max-width="97px"
                  class="pa-2"
              />

              <v-list-item-content class="list-elements">
                <v-list-item-title style="color:#73A8E7"><strong>{{item.item_name}}</strong></v-list-item-title>
                <v-list-item-title style="color:#73A8E7">Prix : {{item.item_price}} €</v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-list-item
                v-for="(item, i) in detailsItem"
                :key="i"
                class="list-item"
                style="margin-bottom:10px"
            >
              <v-btn @click="DeleteItemInOrder(item._id, item.item_price)" icon>
                <v-icon style="color:#73A8E7">mdi-minus</v-icon>
              </v-btn>

              <v-img
                  :src="require(`../assets/repas/entree1_Mauricette.jpg`)"
                  max-width="97px"
                  class="pa-2"
              />

              <v-list-item-content class="list-elements">
                <v-list-item-title style="color:#73A8E7"><strong>{{item.item_name}}</strong></v-list-item-title>
                <v-list-item-title style="color:#73A8E7">Prix : {{item.item_price}} €</v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-divider class="divider-total"></v-divider>
            <v-list-item-content style="margin-left: 5%">
              <v-list-item-title class="label-total" style="color:#73A8E7">Total : {{priceOrder}} €</v-list-item-title>
            </v-list-item-content>
            <v-list-item-content style="padding:15px">
              <v-btn @click="ValidHamper()">Détail de ma commande</v-btn>
            </v-list-item-content>
          </div>
          <div v-else>
            <v-list-item-content style="margin-left: 5%;color:#73A8E7">
              <v-list-item-title class="label-total">Pas d'article ajouté</v-list-item-title>
            </v-list-item-content>
          </div>
          </v-list-item-group>
        </v-list>
      </v-navigation-drawer>
  </v-card>
</template>

<script>
import RestaurantService from "../services/restaurant.service";

  export default {
    name: 'Nav-bar',
    props: ['showLabelProfile', 'showLabelHamper', 'showResearchItems'],
    data: () => ({
      searchValueRestaurants: '',
      searchValueItem: '',
      showResearchRestaurant: '',
      drawer: false,
      ShowHamper: false,
      detailsMenu: [],
      detailsItem: [],
      detailsItemOption: [],
      priceOrder: '',
    }),
    mounted()
    {
      this.showResearchRestaurant = true;
    },
    methods: {
      ValidHamper()
      {
        this.ShowHamper = false;
        this.$router.push('/validcommande');
      },
      UpdatePriceOrder()
      {

      },
      DeleteMenuInOrder(id, price) {
        this.$store.dispatch('orderModule/deleteMenu', {
          menuId: id,
          orderId: this.$store.state.orderModule.order._id
        }).then (() => {
          this.detailsMenu.splice(0, this.detailsMenu.length);
          this.priceOrder = this.priceOrder - price;
          for(const value of this.$store.state.orderModule.order.id_menus) {
            RestaurantService.getDetailsMenu(value, this.$store.state.orderModule.order.restaurantId).then(
                response => {
                  this.detailsMenu.push(response.data);
                },
                error => {
                  this.content =
                      (error.response && error.response.data) ||
                      error.message ||
                      error.toString();
                }
            )
          }
          this.UpdatePriceOrder(this.priceOrder);
        })
      },
      DeleteItemInOrder(id, price) {
        this.$store.dispatch('orderModule/deleteItem', {
          itemId: id,
          orderId: this.$store.state.orderModule.order._id
        }).then (() => {
          this.detailsItem.splice(0, this.detailsItem.length);
          this.priceOrder = this.priceOrder - price;
          for(const value of this.$store.state.orderModule.order.id_items) {
            RestaurantService.getDetailsItem(value, this.$store.state.orderModule.order.restaurantId).then(
                response => {
                  this.detailsItem.push(response.data);
                },
                error => {
                  this.content =
                      (error.response && error.response.data) ||
                      error.message ||
                      error.toString();
                }
            )
          }
          this.UpdatePriceOrder(this.priceOrder);
        })
      },
      DeleteItemInOrderOption(id, price) {
        this.$store.dispatch('orderModule/deleteItemOption', {
          itemId: id,
          orderId: this.$store.state.orderModule.order._id
        }).then (() => {
          this.detailsItemOption.splice(0, this.detailsItemOption.length);
          this.priceOrder = this.priceOrder - price;
          for(const value of this.$store.state.orderModule.order.id_items_optional) {
            RestaurantService.getDetailsItem(value, this.$store.state.orderModule.order.restaurantId).then(
                response => {
                  this.detailsItemOption.push(response.data);
                },
                error => {
                  this.content =
                      (error.response && error.response.data) ||
                      error.message ||
                      error.toString();
                }
            )
          }
          this.UpdatePriceOrder(this.priceOrder);
        })
      },
      emitSearchValue() {
        this.$emit('search-value-changed', this.searchValueRestaurants);
      },
      emitSearchValueItem() {
        this.$emit('search-item', this.searchValueItem);
      },
      RetourTousRestaurants()
      {
        this.$router.push('/restaurants');
      },
      ViewHamper()
      {
        this.priceOrder = 0;
        this.ShowHamper = !this.ShowHamper;
        this.detailsMenu.splice(0, this.detailsMenu.length);
        this.detailsItem.splice(0, this.detailsItem.length);
        this.detailsItemOption.splice(0, this.detailsItemOption.length);

        if ((this.$store.state.orderModule.order) !== null) {
          // On récupère les menus
          for (const value of this.$store.state.orderModule.order.id_menus) {
            RestaurantService.getDetailsMenu(value, this.$store.state.orderModule.order.restaurantId).then(
                response => {
                  this.detailsMenu.push(response.data);
                  this.priceOrder = this.priceOrder + response.data.menu_price ;
                },
                error => {
                  this.content =
                      (error.response && error.response.data) ||
                      error.message ||
                      error.toString();
                }
            )
          }

          // On récupère les items
          for (const value of this.$store.state.orderModule.order.id_items_optional) {
            RestaurantService.getDetailsItem(value, this.$store.state.orderModule.order.restaurantId).then(
                response => {
                  this.detailsItemOption.push(response.data);
                  this.priceOrder = this.priceOrder + response.data.item_price ;
                },
                error => {
                  this.content =
                      (error.response && error.response.data) ||
                      error.message ||
                      error.toString();
                }
            )
          }

          // On récupère les items
          for (const value of this.$store.state.orderModule.order.id_items) {
            RestaurantService.getDetailsItem(value, this.$store.state.orderModule.order.restaurantId).then(
                response => {
                  this.detailsItem.push(response.data);
                  this.priceOrder = this.priceOrder + response.data.item_price ;
                },
                error => {
                  this.content =
                      (error.response && error.response.data) ||
                      error.message ||
                      error.toString();
                }
            )
          }
        }
      },
    },
  }
</script>

<style>
  .title {
    text-align: center;
  }
  .v-sheet.v-card:not(.v-sheet--outlined) {
    box-shadow: none;
  }
  .v-application .ml-auto  {
    margin-left: 0px;
  }
  .list-item {
    margin-bottom: 5%;
  }
  .restaurant-name-hamper {
    margin-bottom: 5%;
    margin-left: 3%;
  }
  .list-elements {
    margin-left: 3%;
  }
</style>