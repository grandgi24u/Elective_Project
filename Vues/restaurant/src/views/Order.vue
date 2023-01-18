<template>
  <main>
    <div class="container box">
      <template>
        <v-card>
          <v-toolbar
              color="white"
              flat
          >
            <v-toolbar-title>Commandes Validées</v-toolbar-title>
          </v-toolbar>
          <v-data-table
              :headers="headers2"
              :items="currentActiveOrder"
              :items-per-page="5"
              class="mb-3">
            <template v-slot:[`item.actions`]="{ item }">
              <v-btn
                  color="white"
                  text
                  @click="dialog_detail_order = true"
                  style="background-color: #73A8E7"
                  class="text-center"
              >Détails</v-btn>
              <v-dialog :retain-focus="false" v-model="dialog_detail_order" max-width="500px">
                <v-card>
                  <v-card-title class="text-h6 justify-center">Détail</v-card-title>
                  {{item}}

                  <v-card-actions class="justify-center">
                    <v-btn
                        color="white"
                        text
                        @click="dialog_detail_order = false"
                        style="background-color: #73A8E7"
                        class="text-center"
                    >Ok</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </template>
          </v-data-table>
        </v-card>


        <v-card>
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
//import MenuService from "@/services/menu.service";
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

      headers2: [
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
      this.$store.dispatch('orderStore/acceptOrder',{order}).then(() => {
        this.orders = this.$store.state.orderStore.order
      });
      this.dialog_accept_order=false;
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
      if(incomeOrder.order_status==="1"){
        if(!this.$store.state.orderStore.order.find(x => x._id === incomeOrder._id)){
          this.$store.state.orderStore.order.push(incomeOrder);
        }
      } else if (incomeOrder.order_status==="2"){
        if(!this.$store.state.orderStore.validateOrder.find(x => x._id === incomeOrder._id)){
          this.$store.state.orderStore.validateOrder.push(incomeOrder);
        }
      }
    }
    this.$store.dispatch('orderStore/getOrder');
    this.$store.dispatch('orderStore/getActiveOrder');
  }
};
</script>