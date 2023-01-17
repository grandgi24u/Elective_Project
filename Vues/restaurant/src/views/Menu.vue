<template>
  <main>
    <div class="container">
      <template>
        <v-card>
          <v-toolbar
              color="white"
              flat
          >
            <v-toolbar-title>Carte</v-toolbar-title>
            <template v-slot:extension>
              <v-tabs
                  v-model="model"
                  centered
                  slider-color="cyan"
                  color="black"
              >
                <v-tab :href="`#tab-1`">Menu</v-tab>
                <v-tab :href="`#tab-2`">Items</v-tab>
              </v-tabs>
            </template>
          </v-toolbar>

          <v-tabs-items v-model="model">
            <!--TAB #1-->
            <v-tab-item :value="`tab-1`">
              <v-card flat>
                <v-card-text>
                  <v-data-table
                      :expanded.sync="expanded"
                      single-expand
                      show-expand
                      :headers="headers"
                      :items="menus"
                      :items-per-page="5"
                      class="mb-3"

                      item-key="menu_name"

                  >
                    <template v-slot:expanded-item="{headers,item}">
                      <td :colspan="headers.length" class="white">
                        <v-simple-table>
                          <template v-slot:default>
                            <thead>
                            <tr style="background-color: rgb(115, 168, 231)">
                              <th class="text-left" style="width:40%">
                                Item requis
                              </th>
                              <th class="text-left" style="width:50%">
                                Description
                              </th>
                              <th class="text-left" style="width:10%">
                                  Actions
                              </th>

                            </tr>
                            </thead>
                            <tbody>
                            <tr
                                v-for="(i, index) in item.id_required_items"
                                :key="index"
                            >
                              <td>
                                {{currentItem.find(x => x._id === i).item_name}}
                              </td>
                              <td>
                                {{currentItem.find(x => x._id === i).item_description}}
                              </td>
                              <td>
                                <v-icon
                                    small
                                    @click="unbindRequiredItem(i,item)"
                                >
                                  mdi-delete
                                </v-icon>
                              </td>
                            </tr>
                            </tbody>
                          </template>
                        </v-simple-table>
                        <v-simple-table>
                          <template v-slot:default>
                            <thead>
                            <tr style="background-color: rgb(115, 168, 231)">
                              <th class="text-left" style="width:40%">
                                Item optionnel
                              </th>
                              <th class="text-left" style="width:50%">
                                Description
                              </th>
                              <th class="text-left" style="width:10%">
                                Actions
                              </th>

                            </tr>
                            </thead>
                            <tbody>
                            <tr
                                v-for="(j, index2 ) in item.id_optional_items"
                                :key="index2"
                            >
                              <td>
                                {{currentItem.find(x => x._id === j).item_name}}
                              </td>
                              <td>
                                {{currentItem.find(x => x._id === j).item_description}}
                              </td>
                              <td>
                                <v-icon
                                    small
                                    @click="unbindOptionalItem(j,item)"
                                >
                                  mdi-delete
                                </v-icon>
                              </td>
                            </tr>
                            </tbody>
                          </template>
                        </v-simple-table>
                      </td>
                    </template>


                    <v-dialog v-model="dialogDelete" max-width="500px">
                      <v-card>
                        <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
                          <v-btn color="blue darken-1" text @click="deleteMenuConfirm">OK</v-btn>
                          <v-spacer></v-spacer>
                        </v-card-actions>
                      </v-card>
                    </v-dialog>

                    <template v-slot:[`item.actions`]="{ item }">
                      <v-icon
                          small
                          class="mr-2"
                          @click="editMenu(item)"
                      >
                        mdi-pencil
                      </v-icon>
                      <v-icon
                          small
                          @click="deleteMenu(item)"
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
                          @keydown.esc="dialog = false"
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
                                  <v-combobox
                                      :items="items_restaurant"
                                      v-model="selectRequiredItem"
                                      item-text="item_name"
                                      item-value="item_name"
                                      label="Item requis"
                                      multiple
                                  ></v-combobox>
                                </v-col>
                                <v-col
                                    cols="12"
                                    sm="6"
                                >
                                  <v-combobox
                                      :items="items_restaurant"
                                      v-model="selectOptionalItem"
                                      item-text="item_name"
                                      item-value="item_name"
                                      label="Item optionnel"
                                      multiple
                                  ></v-combobox>
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
                                      v-model="editedMenu.menu_name"
                                      label="Nom"
                                  ></v-text-field>
                                </v-col>
                                <v-col cols="12">
                                  <v-text-field
                                      v-model="editedMenu.menu_price"
                                      label="Prix"
                                      required
                                      type="number"
                                      min="0"
                                  ></v-text-field>
                                </v-col>
                                <v-col cols="12">
                                  <v-text-field
                                      v-model="editedMenu.menu_description"
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
                            <v-btn color="blue darken-1" text @click="deleteMenuConfirm">OK</v-btn>
                            <v-spacer></v-spacer>
                          </v-card-actions>
                        </v-card>
                      </v-dialog>
                    </v-col>
                    <v-col cols="0" md="4">
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-card>
            </v-tab-item>
            <!--#TAB 2-->
            <v-tab-item :value="`tab-2`">
              <v-card flat>
                <v-card-text>
                  <v-data-table
                      :headers="headers2"
                      :items="items_restaurant"
                      :items-per-page="5"
                      class="mb-3"
                  >

                    <v-dialog v-model="dialogItemDelete" max-width="500px">
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
                          @keydown.esc="dialog_item = false"
                          v-model="dialog_item"
                          persistent
                          max-width="600px"
                      >
                        <template v-slot:activator="{ on, attrs }">

                          <v-btn dark x-large block color="#73A8E7" v-bind="attrs" v-on="on">Créer Item</v-btn>

                        </template>
                        <v-card>
                          <v-card-title>
                            <span class="text-h5">Créer Item</span>
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
                                @click="dialog_item = false"
                            >
                              Close
                            </v-btn>
                            <v-btn
                                color="blue darken-1"
                                text
                                @click="create_item"
                            >
                              Create
                            </v-btn>
                          </v-card-actions>
                        </v-card>
                      </v-dialog>

                      <v-dialog
                          v-model="dialogItemEdit"
                          max-width="600px"
                      >
                        <v-card>
                          <v-card-title>
                            <span class="text-h5">Edit Item</span>
                          </v-card-title>
                          <v-card-text>
                            <v-container>
                              <v-row>
                                <v-col cols="12">
                                  <v-text-field
                                      v-model="editedItem.item_name"
                                      label="Nom"
                                  ></v-text-field>
                                </v-col>
                                <v-col cols="12">
                                  <v-text-field
                                      v-model="editedItem.item_price"
                                      label="Prix"
                                      required
                                      type="number"
                                      min="0"
                                  ></v-text-field>
                                </v-col>
                                <v-col cols="12">
                                  <v-text-field
                                      v-model="editedItem.item_description"
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
                                @click="dialogItemEdit = false"
                            >
                              Cancel
                            </v-btn>
                            <v-btn
                                color="blue darken-1"
                                text
                                @click="edit_item"
                            >
                              Edit
                            </v-btn>
                          </v-card-actions>
                        </v-card>
                      </v-dialog>

                      <v-dialog v-model="dialogItemDelete" max-width="500px">
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
                </v-card-text>
              </v-card>
            </v-tab-item>
          </v-tabs-items>
        </v-card>
      </template>
    </div>
  </main>
</template>


<script>
export default {
  name: "MenuPage",
  data() {
    return {
      model: 'tab-1',
      headers: [
        {
          text: 'Nom',
          align: 'start',
          sortable: false,
          value: 'menu_name'
        },
        {text: 'Description', value: 'menu_description'},
        {text: 'Prix (€)', value: 'menu_price'},
        {text: 'Actions', value: 'actions', sortable: false},
        { text: '', value: 'data-table-expand' },
      ],
      headers2: [
        {
          text: 'Nom',
          align: 'start',
          sortable: false,
          value: 'item_name'
        },
        {text: 'Description', value: 'item_description'},
        {text: 'Prix (€)', value: 'item_price'},
        {text: 'Actions', value: 'actions', sortable: false}
      ],

      menus: [],
      items_restaurant: [],
      selectRequiredItem: [],
      selectOptionalItem: [],

      name: "",
      description: "",
      price: "",
      dialog: false,
      dialog_item: false,
      dialogEdit: false,
      dialogDelete: false,
      dialogItemEdit: false,
      dialogItemDelete: false,

      expanded: [],
      singleExpand: false,

      editedMenu: {
        menu_name: '',
        menu_description: '',
        menu_price: 0,
        id: "",
      },

      editedItem: {
        item_name: '',
        item_description: '',
        item_price: 0,
        id: "",
      }
    }
  },

  methods: {

    editMenu(item) {
      this.editedMenu = Object.assign({}, item)
      this.dialogEdit = true
    },
    editItem(item) {
      this.editedItem = Object.assign({}, item)
      this.dialogItemEdit = true
    },

    deleteMenu(item) {
      this.editedMenu = Object.assign({}, item)
      this.dialogDelete = true
    },
    deleteItem(item) {
      this.editedItem = Object.assign({}, item)
      this.dialogItemDelete = true
    },
    deleteMenuConfirm() {
      this.$store.dispatch('restaurantStore/deleteMenu', {id: this.editedMenu._id}).then(() => {
        this.menus = this.$store.state.restaurantStore.menu
      });
      this.closeDelete()
    },

    deleteItemConfirm() {
      this.$store.dispatch('restaurantStore/deleteItem', {id: this.editedItem._id}).then(() => {
        this.items_restaurant = this.$store.state.restaurantStore.item
      });
      this.closeDelete()
    },

    closeDelete() {
      this.dialogDelete = false
      this.dialogItemDelete = false
    },


    create_menu() {
      this.dialog = false
      this.$store.dispatch('restaurantStore/createMenu', {
        name: this.name,
        description: this.description,
        price: this.price,
        requiredItem: this.selectRequiredItem,
        optionalItem: this.selectOptionalItem
      }).then(() => {
        this.menus = this.$store.state.restaurantStore.menu
      });
    },
    create_item() {
      this.dialog_item = false
      this.$store.dispatch('restaurantStore/createItem', {
        name: this.name,
        description: this.description,
        price: this.price
      }).then(() => {
        this.items_restaurant = this.$store.state.restaurantStore.item
      });
    },
    edit_menu() {
      this.dialogEdit = false
      this.$store.dispatch('restaurantStore/editMenu', {
        name: this.editedMenu.menu_name,
        description: this.editedMenu.menu_description,
        price: this.editedMenu.menu_price,
        id: this.editedMenu._id
      }).then(() => {
        this.menus = this.$store.state.restaurantStore.menu
      });
    },

    edit_item() {
      this.dialogItemEdit = false
      this.$store.dispatch('restaurantStore/editItem', {
        name: this.editedItem.item_name,
        description: this.editedItem.item_description,
        price: this.editedItem.item_price,
        id: this.editedItem._id
      }).then(() => {
        this.items_restaurant = this.$store.state.restaurantStore.item
      });
    },

    unbindRequiredItem(item,menu){
      this.$store.dispatch('restaurantStore/unbindRequiredItem',{
        item_id : item,
        menu: menu
      }).then(() => {
        this.menus = this.$store.state.restaurantStore.menu
      });
    },

  unbindOptionalItem(item,menu){
    this.$store.dispatch('restaurantStore/unbindOptionalItem',{
      item_id : item,
      menu: menu
    }).then(() => {
      this.menus = this.$store.state.restaurantStore.menu
    });
  }
},


  computed: {
    currentMenus() {
      return this.$store.state.restaurantStore.menu
    },
    currentUser() {
      return this.$store.state.auth.user
    },

    currentItem() {
      return this.$store.state.restaurantStore.item
    },

    currentRestaurant() {
      return JSON.parse(localStorage.getItem('restaurant'))
    }
  },
  mounted() {
    this.$store.dispatch('restaurantStore/getMenus').then(() => {
      this.menus = this.$store.state.restaurantStore.menu
    });

    this.$store.dispatch('restaurantStore/getItems').then(() => {
      this.items_restaurant = this.$store.state.restaurantStore.item
    });
  }
}
</script>