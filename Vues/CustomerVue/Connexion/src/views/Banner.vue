<template>
    <v-navigation-drawer
      color="#73A8E7" 
      absolute
      permanent
      left
    >
      <v-list-item two-line @click="Menu('/profile')">
        <v-list-item-content>
          <v-list-item-title><strong>{{currentUser.name}}</strong></v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-btn @click.prevent="logOut">
        Déconnexion
      </v-btn>
      <v-divider></v-divider>

      <v-form ref="loginForm" lazy-validation>
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

              <v-list-item-content @click="Menu(`${item.fct}`)">
                  <v-list-item-title class="item-title"><strong>{{item.title}}</strong></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-form>
      </v-navigation-drawer>
  </template>

  <script>
    export default {
      name: 'Banner-vue',
      search: "",
      data: () => ({
        drawer: false,
        menuArray: [
            { title: 'Restaurants', icon: 'mdi-food-fork-drink', fct: '/restaurants' },
            { title: 'Mes commandes', icon: 'mdi-baguette', fct: '/orders' },
            { title: 'Mes coups de coeur', icon: 'mdi-heart', fct: '/favorite'  },
            { title: 'Réglages', icon: 'mdi-cog', fct: '/reglages'  },
          ],
      }),
      methods: {
        Menu(route) {
          this.$router.push(route);
        },
        logOut() {
          this.$store.dispatch('auth/logout');
          this.$router.push('/login');
        },
      },
      computed: {
        currentUser() {
          return this.$store.state.auth.user;
        },
      },
    }
  </script>

  <style>
    .v-navigation-drawer {
      width: 15%;
    }
    .item-title {
      margin-left: 2%;
    }
  </style>