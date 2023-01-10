<template>
    <v-card
      class="mx-auto" 
    >
      <v-container>
        Mes favoris
      </v-container>
    </v-card>
</template>

<script>
 export default {
    name: "Favorite-vue",
    data: () => ({

    }),
    methods: {

    }
  }
</script>

<style>
  .pa-1 {
    margin-left: 8%;
  } 
  .pa-restaurant {
    margin-left: 12%;
  }
  .title-name {
    width: 100%;
    text-align: center;
    float: right;
    font-weight: bold;
  } 
  .btn-like {
    float: right;
  }
  .pa-3 {
    width: 65%;
    margin: auto;
  }
  .divider-menu {
    margin-bottom: 2%;
  }
  .list-meals {
    margin-left: 15%;
    height: 230px;
  }
  .v-chip.v-size--default {
    height : 30%;
  }
  .v-responsive {
    padding-bottom: 45%;
  }
  .v-slide-group__next {
    height:  126px;
  }
  .v-slide-group__prev {
    height:  126px;
  }
  .v-image__image {
    border-radius: 18px;
  }
</style>