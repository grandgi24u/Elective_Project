<template>
 <v-card>
  <v-toolbar class="toolbar" color="#D4D4D4" fixed>

    <img class="logo" src="../assets/logo-cesi-eat.png" height="76%" >

    <v-spacer></v-spacer>

    <v-btn icon v-if="showResearchRestaurant">
      <v-icon>mdi-magnify</v-icon>
    </v-btn>

    <v-text-field
      placeholder="Rechercher"
      single-line
      hide-details
      @click="$emit('ResearchRestaurant')"
      v-if="showResearchRestaurant"/>
    <!-- <v-autocomplete
         v-model="newTag"
         :items="tagsFound"
         :loading="loading"
         :search-input.sync="searchInput"
         color="white"
         hide-no-data
         hide-selected
     ></v-autocomplete>

     <input type="text" v-model="searchValue" placeholder="Search Recipe" id="search-input">-->

    <v-toolbar-title v-if="!showResearchRestaurant" class="title"><strong>Mon profil</strong></v-toolbar-title>

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
    props: ['showResearchRestaurant'],
    data: () => ({

    }),
  }
</script>

<style>
.title {
  text-align: center;
}
.toolbar {
  margin-left: 16%;
}
.logo {
  margin-left: 2%;
}
</style>