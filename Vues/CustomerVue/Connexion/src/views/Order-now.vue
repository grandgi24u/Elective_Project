<template>
  <v-container class="contrainer-restaurants">
    <div v-if="showOrderNow">
      <v-list-item >
        <v-list-item-content class="list-item-restaurants">
          <v-list-item-title style="margin-bottom: 15px">
            <strong>Ma commande : </strong>
          </v-list-item-title>
          <v-list-item-title class="list-item-subtitle" style="margin-bottom: 8px">
            <strong>Etat de la commande :</strong> {{statusOrder}}
          </v-list-item-title>
          <v-list-item-title class="list-item-subtitle" style="margin-bottom: 8px">
            <strong>Adresse de livraison :</strong>
          </v-list-item-title>
          <v-list-item-title class="list-item-subtitle" style="margin-bottom: 8px">
            <strong>Prix :</strong> {{price}} €
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </div>
    <div v-else>
      <v-list-item >
        <v-list-item-content class="list-item-restaurants">
          <v-list-item-title>
            <strong>Aucune commande en cours</strong>
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </div>
    </v-container>
</template>

<script>

 export default {
    name: "Orders-vue",
    data: () => ({
      detailsOrder : [],
      showOrderNow: false,
      statusOrder: '',
      price: '',
    }),
     mounted() {
       this.connection = new WebSocket('ws://localhost:5500');
       this.connection.onopen = () => {
       };
       this.connection.onmessage = (message) => {
         const incomeOrder = JSON.parse(message['data']);
         if (incomeOrder.order_status==="1")
         {
           this.statusOrder = "Commande en attente de validation par le restaurant";
           this.showOrderNow = true;
         } else if (incomeOrder.order_status==="2")
         {
           this.statusOrder = "Commande en cours de préparation";
           this.showOrderNow = true;
         } else if (incomeOrder.order_status==="3")
         {
           this.statusOrder = "Commande remise au livreur";
           this.showOrderNow = true;
         } else if (incomeOrder.order_status==="4")
         {
           this.statusOrder = "Commande livré";
           this.showOrderNow = true;
         } else if (incomeOrder.order_status==="0")
         {
           this.statusOrder = "Commande pas encore validée";
           this.showOrderNow = true;
         }
         this.price = incomeOrder.order_price;
       }
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