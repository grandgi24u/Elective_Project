<template>
  <main>
    <h3>Historiques des commandes</h3>
    <v-simple-table>
      <template v-slot:default>
        <thead>
        <tr>
          <th class="text-left">
            Name
          </th>
          <th class="text-left">
            Calories
          </th>
        </tr>
        </thead>
        <tbody>
        <tr
        >
          <td></td>
          <td></td>
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
    this.history = HistoryService.getHistoryByUser({id: this.currentUser.id});
  }
};
</script>