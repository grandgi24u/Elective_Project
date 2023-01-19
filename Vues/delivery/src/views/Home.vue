<template>
  <main>
    <v-card>
      <div class="ma-5">
        <img style="max-width: 150px;"
             src="../assets/img.png" alt="">
      </div>

      <v-card-title>Bienvenu {{ currentUser.name }} {{ currentUser.surname }} sur Ces'eat !</v-card-title>
      <v-card-text>
        <div>Espace livraison</div>
      </v-card-text>
    </v-card>

    {{content}}
  </main>
</template>

<script>
export default {
  name: 'HomePage',
  data() {
    return {
      content: ''
    };
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push('/login');
    }
  }
};
</script>