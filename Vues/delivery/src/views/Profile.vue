<template>
  <main id="about-page">
    <div class="container">
    <v-row
        justify="center"
        class="mt-2"
    >
      <v-img
          max-width="100"
          :src="avatar"
      ></v-img>
    </v-row>
      <v-form ref="registerForm" v-model="valid" class="mt-4" lazy-validation>
        <v-row>
          <v-col cols="12" sm="6" md="6">
            <v-text-field v-model="surname" label="Prénom" maxlength="20" @update="updateUser" required></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="6">
            <v-text-field v-model="name" label="Nom" maxlength="20" required></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field v-model="email" label="E-mail" required></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field v-model="address" label="Adresse" required></v-text-field>
          </v-col>
          <v-col cols="12" hidden="hidden">
            <v-text-field v-model="id" label="Adresse" required></v-text-field>
          </v-col>
          <v-col class="d-flex">
            <v-btn x-large block :disabled="!valid" color="#73A8E7" @click="updateUser">Modifier</v-btn>
          </v-col>
        </v-row>
      </v-form>
    </div>
  </main>
</template>

<script>
import avatar from '../assets/avatar.png'

export default {
  name: 'ProfilePage',

  data: () => ({
    avatar,
    valid: true,
    name: "",
    surname: "",
    email: "",
    address: "",
    id: "",
  }),
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push('/login');
    }
    this.name = this.currentUser.name;
    this.surname = this.currentUser.surname;
    this.email = this.currentUser.email;
    this.address = this.currentUser.address;
  },
  methods: {
    updateUser() {
      //this.$store.state.auth.user.surname = this.surname;
      this.$store.dispatch('auth/updateUser', {
        id: this.currentUser.id,
        surname: this.surname,
        name: this.name,
        email: this.email,
        address: this.address
      });
    }
  }
};
</script>