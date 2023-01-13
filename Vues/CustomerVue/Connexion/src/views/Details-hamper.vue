<template>
    <v-container class="container-details-hamper">
      <div class="description-order">
        <v-list class="mx-auto-orders">
          <v-list-item-group v-model="model">
            <v-list-item>
              <v-list-item-content class="list-item-restaurants">
                <v-list-item-title>
                  <strong>{{restaurant}}</strong>
                </v-list-item-title>
                <v-list-item-title class="list-item-subtitle">
                  <strong>Lieu de livraison :</strong> {{address}}
                </v-list-item-title>
                <v-list-item-title class="list-item-subtitle">
                  <strong>Total de la commande :</strong>
                </v-list-item-title>
                <v-list-item-title class="list-item-btn">
                  <v-col class="ml-auto" cols="12" sm="3" xsm="12">
                    <v-btn @click="$emit('AddToHamper')">Valider ma commande</v-btn>
                  </v-col>
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </div>
      <div class="details-items-order">
        <v-list-item-title class="title-hamper"><strong>Votre commande est composée de :</strong></v-list-item-title>
        <v-list-item
            v-for="(item, i) in items"
            :key="i"
            class="list-items-hamper"
        >
          <v-btn icon>
            <v-icon>mdi-minus</v-icon>
          </v-btn>

          <v-img
              :src="require(`../assets/repas/${item.src}`)"
              height="15px"
              width="10%"
              class="pa-2"
          />

          <v-list-item-content class="list-elements">
            <v-list-item-title><strong>{{item.name}}</strong></v-list-item-title>
            <v-list-item-title>Prix : {{item.price}}</v-list-item-title>
            <v-list-item-title>Quantité : {{item.qte}}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </div>
    </v-container>
</template>

<script>
 export default {
    name: "Details-hamper-vue",
    data: () => ({
      restaurant: "Mauricette",
      address: "4 avenue Dupont",
      items: [
        {
          id : 1,
          name : "Menu 1",
          price : "12e",
          qte : "1",
          src : "menu1_Mauricette.jpg",
        },
        {
          id : 2,
          name : "Entrée 1",
          price : "5e",
          qte : "2",
          src : "entree1_Mauricette.jpg",
        },
      ],
    }),
    methods: {

    }
  }
</script>

<style>
  .mx-auto-orders {
    margin-left: 16%;
  }
  .v-image-orders .v-image__image {
    height: 100px;
    width: 100px;
  }
  .mx-auto-orders {
    margin-left: 17%;
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
  .description-order {
    width: 60%;
    margin-left: 9%;
    border-right: 1px dashed black;
    pointer-events: none;
  }
  .list-item-subtitle-textarea {
    margin-left: 20%;
  }
  .textarea-description {
    background-color: #F4F6F6;
  }
  .container-details-hamper {
    display: flex;
  }
  .list-items-hamper {
    width: 58%;
    margin-left: 10%;
  }
  .title-hamper {
    margin-left: 5%;
    margin-bottom: 2%;
  }
</style>