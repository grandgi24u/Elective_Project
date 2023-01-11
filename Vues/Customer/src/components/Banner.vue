<template>
    <v-navigation-drawer
      color="#73A8E7" 
      absolute
      permanent
      left
    >
      <v-list-item two-line @click="$emit('ProfileVue')">
       <!-- <v-list-item-avatar>
          <img src="https://randomuser.me/api/portraits/women/81.jpg">
        </v-list-item-avatar> -->

        <v-list-item-content>
          <v-list-item-title>Osman Cekic</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list nav dense>
        <v-list-item-group
          color="primary"
        >
          <v-list-item
            v-for="(item, i) in menuArray"
            :key="i"
          >
            <v-list-item-icon>
              <v-icon v-text="item.icon"></v-icon>
            </v-list-item-icon>

            <v-list-item-content @click="$emit(`${item.fct}`)">
              <v-list-item-title>{{item.title}}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
</template>

<script>
  export default {
    name: 'Banner-vue',
    search: "",
    data: () => ({
      drawer: false,
      menuArray: [
          { title: 'Restaurants', icon: 'mdi-food-fork-drink', fct: 'MenuRestaurants' },
          { title: 'Mes commandes', icon: 'mdi-baguette', fct: 'MenuCommandes' },
          { title: 'Mes coups de coeur', icon: 'mdi-heart', fct: 'MenuFavorite'  },
          { title: 'Réglages', icon: 'mdi-cog', fct: 'MenuRéglages'  },
        ],
    }),
    methods: {

    }
  }
</script>

<style>
  .v-navigation-drawer {
    width: 15%;
  }
</style>