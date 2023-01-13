<template>
    <v-navigation-drawer
      color="#EC7063" 
      absolute
      permanent
      right
    >
      <template v-slot:prepend>
        <v-list-item two-line>
          <v-list-item-content>
            <v-list-item-title><strong>Mon panier</strong>
              <v-btn class="icon-basket" @click="$emit('ShowChange')" icon>
                <v-icon>mdi-basket</v-icon>
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
          <div class="restaurant-name-hamper">
            <strong>Commande chez {{restaurant}}</strong>
          </div>
          <v-list-item
            v-for="(item, i) in items"
            :key="i"
            class="list-item"
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
          <v-divider class="divider-total"></v-divider>
          <v-list-item-content>
            <v-list-item-title class="label-total">Total : {{total}}</v-list-item-title>
          </v-list-item-content>
          <v-col class="ml-auto" cols="12" sm="3" xsm="12">
            <v-btn @click="$emit('ValidHamper')">Valider mon panier</v-btn>
          </v-col>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
</template>
<script>
  export default {
    name: 'Hamper-vue',
    data: () => ({
      hamperIsEnable : false,
      total : 17,
      restaurant : "Mauricette",
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
      ]
    }),
    methods: {
      // ShowHamper() {
      //   this.hamperIsEnable = !this.hamperIsEnable;
      // },
    }
  }
</script>

<style>
  .list-elements {
    margin-left: 3%;
    margin-bottom: 50px;
  }
  .label-total {
    font-size: 20px;
    text-align: center;
  }
  .divider-total {
    width: 70%;
    margin-left: 15%;
  }
  .list-item {
    padding-left: 5px;
    margin-top: 4%;
  }
  .restaurant-name-hamper {
    text-align: center;
  }
  .icon-basket {
    margin-left: 45%;
  }
</style>