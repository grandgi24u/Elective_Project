<template>
  <div class="form-profile">
    <v-form ref="profilForm" v-model="valid">
      <div class="form-details">
        <v-text-field
            v-model="name"
            :rules="firstNameRules"
            label="Prénom"
            required
        ></v-text-field>
        <v-text-field
            v-model="surname"
            :rules="lastNameRules"
            label="Nom"
            required
        ></v-text-field>
        <v-text-field
            v-model="email"
            :rules="emailRules"
            label="E-mail"
            required
        ></v-text-field>
        <v-text-field
            v-model="address"
            :rules="addressRules"
            label="Adresse"
            required
        ></v-text-field>
      </div>
      <div class="button-enregistrer">
       <v-btn :disabled="!valid" @click="validateInfo">Enregistrer</v-btn>
      </div>
    </v-form>
  </div>
</template>

<script>
  export default {
    name: 'Profile-vue',
    data: () => ({
      valid: true,
      name: "",
      surname: "",
      email: "",
      address: "",
      firstNameRules: [
        v => !!v || 'Le prénom est obligatoire',
        v => /^[a-zA-Z]+$/.test(v) || 'Le prénom doit contenir uniquement des lettres'
      ],
      lastNameRules: [
        v => !!v || 'Le nom est obligatoire',
        v => /^[a-zA-Z]+$/.test(v) || 'Le nom doit contenir uniquement des lettres'
      ],
      emailRules: [
        v => !!v || "L'e-mail est obligatoire",
        v => /.+@.+/.test(v) ||  "L'e-mail doit être valide"
      ],
      addressRules: [
        v => !!v || "L'adresse est obligatoire"
      ],
    }),
    methods: {
      validateInfo () {
        this.$store.dispatch('auth/updateUser', {
          id: this.$store.state.auth.user.id,
          name: this.name,
          surname: this.surname,
          email: this.email,
          address: this.address
        })
      }
    },
    computed: {
      currentUser() {
        return this.$store.state.auth.user;
      }
    },
    mounted() {
      this.name = this.currentUser.name;
      this.surname = this.currentUser.surname;
      this.email = this.currentUser.email;
      this.address = this.currentUser.address;
    },
  }
</script>

<style>
.form-profile {
  margin-left: 18%;
}
.square {
  width: 50px;
  height: 150px;
}
.form-details {
  width: 50%;
}
.button-enregistrer {
  text-align: center;
}
</style>