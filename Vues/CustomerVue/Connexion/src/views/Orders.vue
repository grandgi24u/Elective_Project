<template>
  <v-container class="contrainer-restaurants">
      <v-list-item
          v-for="(item, i) in historyOrder"
          :key="i"
      >
        <v-list-item-content class="list-item-restaurants">
          <v-list-item-title style="margin-bottom: 15px">
            <strong>Commande chez {{restaurantNames[i]}}</strong>
          </v-list-item-title>
          <v-list-item-title class="list-item-subtitle" style="margin-bottom: 8px">
            <strong>Prix :</strong> {{item.order_price}} €
          </v-list-item-title>
          <v-list-item-title class="list-item-subtitle" style="margin-bottom: 8px">
            <strong>Date :</strong> Le {{tableDates[i]}}
          </v-list-item-title>
          <v-divider></v-divider>
        <!--  <v-list-item-title class="list-item-btn">
            <v-col class="ml-auto" cols="12" sm="3" xsm="12">
              <v-btn @click="$emit('AddToHamper')">Commander à nouveau</v-btn>
            </v-col>
          </v-list-item-title> -->
        </v-list-item-content>
      </v-list-item>
    </v-container>
</template>

<script>
 import RestaurantService from "../services/restaurant.service";
 const moment = require('moment');

 export default {
    name: "Orders-vue",
    data: () => ({
      historyOrder : [],
      tabRestaurantId : [],
      restaurantNames: [],
      tableDates: [],
      order_date: '',
    }),
     mounted() {
       RestaurantService.getHistoryOrder(this.$store.state.auth.user.id).then(
           response => {
             this.historyOrder = response.data;

             for (let i = 0; i < response.data.length; i++)
             {
               RestaurantService.getRestaurantById(response.data[i].restaurantId).then(
                   response => {
                     this.restaurantNames.push(response.data.restaurant_name);
                   },
                   error => {
                     this.content =
                         (error.response && error.response.data) ||
                         error.message ||
                         error.toString();
                   }
               )
             }

             for (let a = 0; a < response.data.length; a++)
             {
               const formattedDate = moment(response.data[a].order_date).format('DD-MM-YYYY à HH:mm');
               this.tableDates.push(formattedDate);
             }
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
  .v-image-orders .v-image__image {
    height: 100px;
    width: 100px;
  }
  .list-item-subtitle {
    margin-left: 5%;
  }
  .list-item-btn {
    text-align: center;
  }
  .list-item-btn .ml-auto{
    max-width: 100%;
  }
</style>