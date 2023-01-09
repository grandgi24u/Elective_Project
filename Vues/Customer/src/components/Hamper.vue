<template>
    <v-navigation-drawer
      color="#EC7063" 
      absolute
      permanent
      right
    >
      <template v-slot:prepend>
        <v-list-item two-line>
          <v-list-item-content>
            <v-list-item-title>Mon panier
              <v-btn class="icon-basket" @click="$emit('ShowChange')" icon>
                <v-icon>mdi-basket</v-icon>
              </v-btn>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </template>

      <v-divider></v-divider>

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

            <v-list-item-content @click="$emit(`${item.fct}`)">
              <v-list-item-title>{{item.title}}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
</template>

<script>
  export default {
    name: 'Hamper-vue',
    search: "",
    data: () => ({
      hamperIsEnable : false,
    }),
    methods: {
      // ShowHamper() {
      //   this.hamperIsEnable = !this.hamperIsEnable;
      // },
    }
  }
</script>

<style>
  .v-navigation-drawer {
    width: 15%;
  }
  .icon-basket {
    float: right;
  }
</style>