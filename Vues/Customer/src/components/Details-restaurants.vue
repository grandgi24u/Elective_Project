<template>
  <v-container class="div-container">
    <div class="list-choice">
          <v-list nav dense>
            <v-list-item-group
              color="primary"
            >
            <v-list-subheader>Bienvenue chez {{restaurant}}</v-list-subheader>
              <v-list-item
                v-for="(item, i) in scroll"
                :key="i"
              >
                <v-list-item-icon>
                  <v-icon v-text="item.icon"></v-icon>
                </v-list-item-icon>

                <v-list-item-content @click="ClickMenu(`${item.name}`)">
                  <v-list-item-title><strong>{{item.name}}</strong></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
      </div>
      <div class="div-menu">
        <v-row>
          <v-col
            v-for="item in restaurants[restaurant][choice]"
            :key="item.id"
            cols="12"
            md="4"  
          >
            <v-img
              :src="require(`../assets/repas/${item.img}`)"
              height="150px"
              class="pa-2"
            />
            <div class="title-name">
              {{item.nom}}
            </div>
          </v-col>
        </v-row>
      </div>
  </v-container> 
</template>

<script>
 export default {
    name : "Details-Restaurant-vue",
    props: {
      restaurant: {
        type: String,
        required: true,
      },
    },
    data: () => ({
      choice : "Entrée",
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
                nom : "Entrée 1", 
                img : "entree1_Mauricette.jpg", 
              },
              {
                nom : "Entrée 2", 
                img : "entree2_Mauricette.jpg", 
              },
              {
                nom : "Entrée 3",
                img : "entree3_Mauricette.jpg", 
              },
              {
                nom : "Entrée 4", 
                img : "entree4_Mauricette.jpg", 
              },
              {
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
        Régalo : 
        {
          favori : "non",
          adresse : {
            rue : "4 avenue du général",
            ville : "Nancy",
            code_postal : "54000"
          },
          Entrée : [
              {
                nom : "Entrée 1", 
                img : "entree1_Regalo.jpg", 
              },
              {
                nom : "Entrée 2", 
                img : "entree2_Regalo.jpg", 
              },
              {
                nom : "Entrée 3",
                img : "entree3_Regalo.jpg", 
              },
              {
                nom : "Entrée 4", 
                img : "entree4_Regalo.jpg", 
              },
            ],
            Menu : [
              {
                nom : "Menu 1", 
                img : "menu1_Regalo.jpg", 
              },
              {
                nom : "Menu 2", 
                img : "menu2_Regalo.jpg", 
              },
              {
                nom : "Menu 3",
                img : "menu3_Regalo.jpg", 
              },
              {
                nom : "Menu 4", 
                img : "menu4_Regalo.jpg", 
              },
              {
                nom : "Menu 5", 
                img : "menu5_Regalo.jpg", 
              },
            ],
            dessert : [
              {
                nom : "Dessert 1", 
                img : "dessert1_Regalo.jpg", 
              },
              {
                nom : "Dessert 2", 
                img : "dessert2_Regalo.jpg", 
              },
              {
                nom : "Dessert 3",
                img : "dessert3_Regalo.jpg", 
              },
              {
                nom : "Dessert 4", 
                img : "dessert4_Regalo.jpg", 
              },
              {
                nom : "Dessert 5", 
                img : "dessert5_Regalo.jpg", 
              },
            ],
        },
      },
      scroll: [
        {
          id : 1,
          name : "Entrée",
          // icon: 'mdi-clock',
        },
        {
          id : 2,
          name : "Menu",
          // icon: 'mdi-account',
        },
        {
          id : 3,
          name : "Dessert",
          // icon: 'mdi-flag',
        },
        {
          id : 4,
          name : "Boisson",
        },
      ],
    }),
    methods: {
      ClickMenu(choice) {
        this.choice = choice;
      },
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
  .div-menu {
    margin-left: 4%;
  }
</style>