<template>
  <main>
    <div class="container">
      <header class="jumbotron mb-8">
        <h3>
          <strong>Menu</strong>
        </h3>
      </header>
      <v-data-table
          :headers="headers"
          :items="menus"
          :items-per-page="5"
          class="mb-3"
      ></v-data-table>

      <v-row>
        <v-col cols="0" md="4">

        </v-col>
        <v-col cols="12" md="4">
          <v-dialog
              v-model="dialog"
              persistent
              max-width="600px"
          >
            <template v-slot:activator="{ on, attrs }">

              <v-btn dark x-large block color="#73A8E7" v-bind="attrs" v-on="on">Créer Menu</v-btn>

            </template>
            <v-card>
              <v-card-title>
                <span class="text-h5">Créer Menu</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12">
                      <v-text-field
                          v-model="name"
                          label="Nom*"
                          required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                          v-model="price"
                          label="Prix*"
                          required
                          type="number"
                          min="0"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                          v-model="description"
                          label="Description*"
                          required
                      ></v-text-field>
                    </v-col>
                    <v-col
                        cols="12"
                        sm="6"
                    >
                    </v-col>
                    <v-col
                        cols="12"
                        sm="6"
                    >
                    </v-col>
                  </v-row>
                </v-container>
                <small>*Obligatoire</small>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                    color="blue darken-1"
                    text
                    @click="dialog = false"
                >
                  Close
                </v-btn>
                <v-btn
                    color="blue darken-1"
                    text
                    @click="create_menu"
                >
                  Save
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-col>
        <v-col cols="0" md="4">

        </v-col>
      </v-row>
    </div>
  </main>
</template>

<script>
export default {
  name:"MenuPage",
  data(){
    return {
      headers: [
        {
          text: 'Nom',
          align: 'start',
          sortable: false,
          value: 'menu_name'
        },
        { text: 'Description', value: 'menu_description' },
        { text: 'Prix', value: 'menu_price' },
        { text: 'Action', value: 'delete' }
      ],
      menus : [],
      name:"",
      description:"",
      price:"",
      dialog: false
    }},

  methods:{
    create_menu() {
      this.dialog = false
      this.$store.dispatch('restaurantStore/createMenu',{name:this.name, description:this.description, price:this.price}).then(()=>{
        this.menus = this.$store.state.restaurantStore.menu
      });
    }
  },
  computed: {
    currentMenus(){
      return this.$store.state.restaurantStore.menu
    },
    currentUser() {
      return this.$store.state.auth.user
    },
    currentRestaurant() {
      return JSON.parse(localStorage.getItem('restaurant'))
    }
  },
  mounted() {
    this.$store.dispatch('restaurantStore/getMenus').then(() => {
      this.menus = this.$store.state.restaurantStore.menu
    });
  }
}
</script>