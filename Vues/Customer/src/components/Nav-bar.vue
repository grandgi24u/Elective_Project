<template>
 <v-card>
  <v-toolbar class="toolbar" color="#D4D4D4" fixed>
    <v-spacer></v-spacer>

    <img src="../assets/logo-cesi-eat.png" height="76%" >

    <v-spacer></v-spacer>

    <v-btn icon>
      <v-icon>mdi-magnify</v-icon>
    </v-btn>
    <v-text-field
      placeholder="Rechercher"
      single-line
      hide-details
    ></v-text-field>

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
    data: () => ({
      // ShowHamper() {
      //   this.hamperIsEnable = !this.hamperIsEnable;
      // },
    }),
  }
</script>

<style>

</style>