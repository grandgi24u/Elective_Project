<template>
  <v-list class="mx-auto-orders">
    <v-list-item-group v-model="model">
      <v-list-item
          v-for="(item, i) in restaurants"
          :key="i"
      >
        <v-list-item-content class="list-item-restaurants">
          <v-list-item-title>
            <strong>{{item.name}}</strong>
          </v-list-item-title>
          <v-list-item-title class="list-item-subtitle">
            <strong>Prix :</strong> {{item.price}}
          </v-list-item-title>
          <v-list-item-title class="list-item-subtitle">
            <strong>Date :</strong> {{item.date}}
          </v-list-item-title>
          <v-list-item-title class="list-item-btn">
            <v-col class="ml-auto" cols="12" sm="3" xsm="12">
              <v-btn @click="$emit('AddToHamper')">Commander à nouveau</v-btn>
            </v-col>
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list-item-group>
  </v-list>
</template>

<script>
 export default {
    name: "Orders-vue",
    data: () => ({
      restaurants: [
        {
          id : 1,
          name : "Mauricette",
          src : "restaurant-1.jpg",
          price : 15,
          date : "11/01/2023"
        },
        {
          id : 3,
          name : "Régalo",
          src : "regalo.jpg",
          price : 35,
          date : "09/01/2023"
        },
      ],
    }),
    methods: {

    }
  }
</script>

<style>
  .mx-auto-orders {
    margin-left: 16%;
  }
  .v-image-orders .v-image__image {
    height: 100px;
    width: 100px;
  }
  .mx-auto-orders {
    margin-left: 17%;
  }
  .list-item-subtitle {
    margin-left: 5%;
  }
  .list-item-btn {
    text-align: center;
  }
  .list-item-btn .ml-auto{
    max-width: 100%;
  }
</style>