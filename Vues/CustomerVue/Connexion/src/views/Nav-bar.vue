<template>
 <v-card>
  <v-toolbar class="toolbar" color="#D4D4D4" fixed>

    <img class="logo" src="../assets/logo-cesi-eat.png" @click="RetourTousRestaurants()" height="76%" >

    <v-spacer></v-spacer>

    <v-btn icon v-if="showResearchRestaurant">
      <v-icon>mdi-magnify</v-icon>
    </v-btn>

    <v-text-field
      placeholder="Rechercher"
      single-line
      hide-details
      v-model="searchValueRestaurants"
      @input="emitSearchValue"
      v-if="showResearchRestaurant"/>

    <v-toolbar-title v-if="showLabelProfile" class="title"><strong>Mon profil</strong></v-toolbar-title>
    <v-toolbar-title v-if="showLabelHamper" class="title"><strong>Récapitulatif de ma commande</strong></v-toolbar-title>

    <v-spacer></v-spacer>

    <v-btn class="icon-basket" @click="$emit('ShowChange')" icon>
      <v-icon>mdi-basket</v-icon>
    </v-btn>
  </v-toolbar>
  </v-card>  
</template>

<script>
  export default {
    name: 'Nav-bar',
    props: ['showResearchRestaurant', 'showLabelProfile', 'showLabelHamper'],
    data: () => ({
      searchValueRestaurants: '',
    }),
    methods: {
      emitSearchValue() {
        this.$emit('search-value-changed', this.searchValueRestaurants);
      },
      RetourTousRestaurants()
      {
        this.$router.push('/restaurants');
      }

    }
  }
</script>

<style>
  .title {
    text-align: center;
  }
  .toolbar {

  }
  .logo {
    margin-left: 2%;
  }
</style>