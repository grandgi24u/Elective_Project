<template>
 <v-card>
  <v-toolbar class="toolbar" color="#73A8E7" fixed>

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

    <v-btn icon v-if="showResearchItems">
      <v-icon>mdi-magnify</v-icon>
    </v-btn>

    <v-text-field
        placeholder="Rechercher"
        single-line
        hide-details
        @input="emitSearchValueItem"
        v-model="searchValueItem"
        v-if="showResearchItems"/>

    <v-toolbar-title v-if="showLabelProfile" class="title"><strong>Mon profil</strong></v-toolbar-title>
    <v-toolbar-title v-if="showLabelHamper" class="title"><strong>Récapitulatif de ma commande</strong></v-toolbar-title>

    <v-btn class="icon-basket" @click="$emit('ShowChange')" icon>
      <v-icon>mdi-basket</v-icon>
    </v-btn>
  </v-toolbar>
  </v-card>
</template>

<script>
  export default {
    name: 'Nav-bar',
    props: ['showResearchRestaurant', 'showLabelProfile', 'showLabelHamper', 'showResearchItems'],
    data: () => ({
      searchValueRestaurants: '',
      searchValueItem: '',
    }),
    methods: {
      emitSearchValue() {
        this.$emit('search-value-changed', this.searchValueRestaurants);
      },
      emitSearchValueItem() {
        this.$emit('search-item', this.searchValueItem);
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
</style>