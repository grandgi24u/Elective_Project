<template>
  <main>
    {{content}}
  </main>

</template>

<script>
import UserService from '../services/user.service';

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
    UserService.getUsers().then(
        response => {
          this.content = response.data;
        },
        error => {
          this.content =
              (error.response && error.response.data) ||
              error.message ||
              error.toString();
        }
    );
  }
};
</script>