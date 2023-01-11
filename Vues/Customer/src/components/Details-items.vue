<template>
  <v-container class="div-container">
      <div class="div-menu-item">
        <v-btn icon @click="$emit('RetourDetailsRestaurants', restaurant)">
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
        <img class="logo-item" src="../assets/repas/entree1_Mauricette.jpg">
        <div class="description-item">
         <v-list-item-content>
            <v-list-item-title>{{restaurant}}</v-list-item-title>
          </v-list-item-content>
          <v-list-item-content>
            <v-list-item-title>Prix : 15e</v-list-item-title>
          </v-list-item-content>
          <v-list-item-content>
            <v-list-item-title>Ce repas est très bon</v-list-item-title>
          </v-list-item-content>
          <v-col class="d-flex ml-auto" cols="12" sm="3" xsm="12">
            <v-btn @click="validateHamper">Ajouter à mon panier</v-btn>
          </v-col>
        </div>
      </div>
  </v-container> 
</template>

<script>
 export default {
    name : "Details-Items-vue",
    props: {
      itemId: {
        type: Number,
        required: true,
      },
      restaurant: {
        type: String,
        required: true,
      },
    },
    data: () => ({
      restaurants: {
        Mauricette :
            {
              favori : "oui",
              adresse : {
                rue : "4 avenue du général",
                ville : "Nancy",
                code_postal : "54000"
              },
              Entrée : [
                {
                  id : 1,
                  nom : "Entrée 1",
                  img : "entree1_Mauricette.jpg",
                  description : "Description de l'entrée 1",
                  price : 15,
                },
                {
                  id : 2,
                  nom : "Entrée 2",
                  img : "entree2_Mauricette.jpg",
                },
                {
                  id : 3,
                  nom : "Entrée 3",
                  img : "entree3_Mauricette.jpg",
                },
                {
                  id : 4,
                  nom : "Entrée 4",
                  img : "entree4_Mauricette.jpg",
                },
                {
                  id : 5,
                  nom : "Entrée 5",
                  img : "entree5_Mauricette.jpg",
                },
              ],
              Menu : [
                {
                  nom : "Menu 1",
                  img : "menu1_Mauricette.jpg",
                },
                {
                  nom : "Menu 2",
                  img : "menu2_Mauricette.jpg",
                },
                {
                  nom : "Menu 3",
                  img : "menu3_Mauricette.jpg",
                },
                {
                  nom : "Menu 4",
                  img : "menu4_Mauricette.jpg",
                },
                {
                  nom : "Menu 5",
                  img : "menu5_Mauricette.jpg",
                },
              ],
              Dessert : [
                {
                  nom : "Dessert 1",
                  img : "dessert1_Mauricette.jpg",
                },
                {
                  nom : "Dessert 2",
                  img : "dessert2_Mauricette.jpg",
                },
                {
                  nom : "Dessert 3",
                  img : "dessert3_Mauricette.jpg",
                },
                {
                  nom : "Dessert 4",
                  img : "dessert4_Mauricette.jpg",
                },
                {
                  nom : "Dessert 5",
                  img : "dessert5_Mauricette.jpg",
                },
              ],
            },
      },
    }),
    methods: {

    }
  }
</script>

<style>
  .list-choice {
    margin-left: 16%;
    width: 20%;
    border-right : 1px dashed black;
  }
  .div-container {
    display : flex; 
  }
  .div-menu-item {
    margin-left: 18%;
    display: flex;
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
  .d-flex {
    margin-top: 15%;
  }
</style>