<template>
    <main>
      <div class="container">
        <header class="jumbotron mb-8">
          <h3>
            <strong>{{currentRestaurant.restaurant_name}}</strong> Profile
          </h3>
        </header>
        <p>
          <strong>Identifiant:</strong>
          {{currentUser.id}}
        </p>
        <p>
          <strong>Prénom, nom:</strong>
          {{currentUser.surname}} {{currentUser.name}}
        </p>
        <p>
          <strong>Email:</strong>
          {{currentUser.email}}
        </p>
        <p>
          <strong>Address:</strong>
          {{currentUser.address}}
        </p>
        <p>
          <strong>Nom du restaurant:</strong>
          {{currentRestaurant.restaurant_name}}
        </p>
        <p>
          <strong>Description du Restaurant:</strong>
          {{currentRestaurant.restaurant_description}}
        </p>
        <p>
          <strong>Type:</strong>
          {{currentRestaurant.food_type}}
        </p>
      </div>
    </main>
</template>

<script>
export default {
  name: 'ProfilePage',
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },

    currentRestaurant() {
      return JSON.parse(localStorage.getItem('restaurant'));
    }
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push('/login');
    }
  }
};
</script>