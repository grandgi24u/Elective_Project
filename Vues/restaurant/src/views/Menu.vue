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
      >

        <v-dialog v-model="dialogDelete" max-width="500px">
        <v-card>
          <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
            <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>

        <template v-slot:[`item.actions`]="{ item }">
          <v-icon
              small
              class="mr-2"
              @click="editItem(item)"
          >
            mdi-pencil
          </v-icon>
          <v-icon
              small
              @click="deleteItem(item)"
          >
            mdi-delete
          </v-icon>
        </template>
      </v-data-table>

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
                  Create
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>

          <v-dialog
              v-model="dialogEdit"
              max-width="600px"
          >
            <v-card>
              <v-card-title>
                <span class="text-h5">Edit Menu</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12">
                      <v-text-field
                          v-model="editedItem.menu_name"
                          label="Nom"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                          v-model="editedItem.menu_price"
                          label="Prix"
                          required
                          type="number"
                          min="0"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                          v-model="editedItem.menu_description"
                          label="Description"
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
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                    color="blue darken-1"
                    text
                    @click="dialogEdit = false"
                >
                  Cancel
                </v-btn>
                <v-btn
                    color="blue darken-1"
                    text
                    @click="edit_menu"
                >
                  Edit
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>

          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
                <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
                <v-spacer></v-spacer>
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
        { text: 'Actions', value: 'actions', sortable: false }
      ],
      menus : [],
      name:"",
      description:"",
      price:"",
      dialog: false,
      dialogEdit: false,
      dialogDelete: false,

      editedIndex: -1,

      editedItem: {
        menu_name: '',
        menu_description:'',
        menu_price: 0,
        id: "",
      },
    }},

  methods:{

    editItem (item) {
      this.editedIndex = this.menus.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogEdit = true
    },

    deleteItem (item) {
      this.editedIndex = this.menus.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    deleteItemConfirm () {
      this.$store.dispatch('restaurantStore/deleteMenu',{id:this.editedItem._id}).then(()=>{
        this.menus = this.$store.state.restaurantStore.menu
      });
      this.closeDelete()
    },

    closeDelete () {
      this.dialogDelete = false
    },


    create_menu() {
      this.dialog = false
      this.$store.dispatch('restaurantStore/createMenu',{name:this.name, description:this.description, price:this.price}).then(()=>{
        this.menus = this.$store.state.restaurantStore.menu
      });
    },

    edit_menu() {
      this.dialogEdit = false
      this.$store.dispatch('restaurantStore/editMenu',{name:this.editedItem.menu_name, description:this.editedItem.menu_description, price:this.editedItem.menu_price, id:this.editedItem._id}).then(()=>{
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