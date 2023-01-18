<template>
  <main>
    <h3>Historiques des commandes</h3>
    <v-simple-table>
      <template v-slot:default>
        <thead>
        <tr>
          <th class="text-left">
            Date
          </th>
          <th class="text-left">
            Price
          </th>
        </tr>
        </thead>
        <tbody>
        <tr
            v-for="(item,key) in history"
            :key="key"
        >
          <td data-label="Date">
            {{item.order_date}}
          </td>
          <td data-label="Price">
            {{item.order_price}}
          </td>

        </tr>
        </tbody>
      </template>
    </v-simple-table>
  </main>
</template>

<script>
import HistoryService from "@/services/history.service";

export default {
  name: 'HistoryPage',
  data: () => ({
    history: []
  }),
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  },
  mounted() {
    if (!this.$store.state.auth.user) {
      this.$router.push('/login');
    }
    HistoryService.getHistoryByUser({id: this.currentUser._id}).then(response => {
      this.history=response;
    });  }
};
</script>