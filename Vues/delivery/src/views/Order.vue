<template>
  <main>
    <div class="container box">
      <template>
          <v-card
              color="#385F73"
              dark
          >
            <v-card-title class="text-h5">
              Livraison
            </v-card-title>
            <div v-if="currentActiveOrder">
              <v-card-subtitle>Date : {{currentActiveOrder.order_date}}<br/>
                Adresse : {{currentActiveOrder.user.address}}<br/>
                Prénom : {{currentActiveOrder.user.name}} {{currentActiveOrder.user.surname}}<br/>
                Prix : {{currentActiveOrder.order_price}}<br /> <br/>
              <h5>Restaurant :</h5><br/>
              Nom : {{currentActiveOrder.restaurant.restaurant_name}}<br/>
              Adresse : {{currentActiveOrder.restaurant.restaurant_address}}</v-card-subtitle>
              <v-card-actions>
                <v-btn text @click="validateLivraison()">
                  Valider la livraison
                </v-btn>
              </v-card-actions>
            </div>
          </v-card>

        <v-card class="mt-2">
          <v-toolbar
              color="white"
              flat
          >
            <v-toolbar-title>Commandes</v-toolbar-title>
          </v-toolbar>
          <v-data-table
              :headers="headers"
              :items="currentOrder"
              :items-per-page="5"
              class="mb-3">
            <template v-slot:[`item.actions`]="{ item }">
              <v-btn
                  color="white"
                  text
                  @click="dialog_accept_order = true"
                  style="background-color: #73A8E7"
                  class="text-center"
              >Accept</v-btn>
              <v-dialog :retain-focus="false" v-model="dialog_accept_order" max-width="500px">
                <v-card>
                  <v-card-title class="text-h5 justify-center">Voulez-vous accepter cette commande ?</v-card-title>
                  <v-card-actions class="justify-center">
                    <v-btn
                        color="white"
                        text
                        @click="accept_order(item)"
                        style="background-color: #73A8E7"
                        class="text-center"
                    >Accept</v-btn>
                    <v-btn
                        color="white"
                        text
                        @click="dialog_accept_order = false"
                        style="background-color: #73A8E7"
                        class="text-center"
                    >Cancel</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </template>
          </v-data-table>
        </v-card>
      </template>
    </div>
  </main>

</template>

<script>
import UserService from "@/services/user.service";
import OrderService from "@/services/order.service";

export default {
  name: 'OrderPage',
  data() {
    return {
      headers: [
        {
          text: 'Date',
          align: 'left',
          sortable: false,
          value: 'order_date'
        },
        {text: 'Prix', value: 'order_price'},
        {text: 'Actions', value: 'actions', align: 'center',sortable: false},
      ],
      dialog_accept_order: false,
      dialog_detail_order: false,
      connection:null,
      content: '',
    };
  },
  methods:{
    accept_order(order){
      if(this.$store.state.orderStore.validateOrder === null) {
        this.$store.dispatch('orderStore/acceptOrder',{order}).then(() => {
          this.orders = this.$store.state.orderStore.order
        });
      }
      this.dialog_accept_order=false;
    },
    validateLivraison() {
      if(this.$store.state.orderStore.validateOrder !== null) {
        const order = this.$store.state.orderStore.validateOrder;
        this.$store.dispatch('orderStore/valideDelivery',{order});
      }
    }
  },
  computed:{
    currentOrder() {
      return this.$store.state.orderStore.order
    },
    currentActiveOrder() {
      return this.$store.state.orderStore.validateOrder
    },
  },
  mounted() {
    if (!this.$store.state.auth.user) {
      this.$router.push('/login');
    }
    this.connection = new WebSocket('ws://localhost:5500');
    this.connection.onopen = () => {
      console.log("connected");
    };
    this.connection.onmessage = (message) => {
      const incomeOrder = JSON.parse(message['data']);
      const delivery = JSON.parse(localStorage.getItem('delivery'));
      if(incomeOrder.order_status==="3"){
        if(!this.$store.state.orderStore.order.find(x => x._id === incomeOrder._id)){
          this.$store.state.orderStore.order.push(incomeOrder);
        }
      }else if(incomeOrder.order_status==="4" && incomeOrder.deliveryId === delivery[0]._id){
        UserService.getUser(incomeOrder.userid).then(res => {
          incomeOrder.user = res;
          OrderService.getRestaurant(incomeOrder.restaurantId).then(res => {
            incomeOrder.restaurant = res;
            this.$store.state.orderStore.validateOrder = incomeOrder;
          });
        });
      }
    }
    this.$store.dispatch('orderStore/getOrder');
    this.$store.dispatch('orderStore/getActiveOrder');
  }
};
</script>

<style>

@media (max-width: 767px) {
  .box{
    padding: 0;
  }
  .v-sheet.v-card {
    border-radius: 0px;
  }
}
</style>