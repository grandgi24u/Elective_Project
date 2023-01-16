<template>
  <div class="container">
    <header class="jumbotron">
      <h3>
        <strong>{{currentUser.name}}</strong> Profile
      </h3>
    </header>
    <p>
      <strong>Id:</strong>
      {{currentUser.id}}
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
      <strong>Restaurant name:</strong>
      {{currentRestaurant.name}}
    </p>
  </div>
</template>

<script>
export default {
  name: 'ProfilePage',
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    currentRestaurant() {
      return this.$store.state.auth.restaurant;
    }
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push('/login');
    }
  }
};
</script>