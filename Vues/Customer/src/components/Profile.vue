<template>
  <div class="form-profile">
    <v-form ref="form">
      <div class="form-details">
        <v-text-field
            v-model="firstName"
            :rules="firstNameRules"
            label="Prénom"
            required
        ></v-text-field>
        <v-text-field
            v-model="lastName"
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
        <v-text-field
            v-model="password"
            :rules="passwordRules"
            label="Mot de passe"
            required
            type="password"
        ></v-text-field>
      </div>
      <div class="button-enregistrer">
       <v-btn type="submit" @click="submit">Enregistrer</v-btn>
      </div>
    </v-form>
  </div>
</template>

<script>
  export default {
    name: 'Profile-vue',
    data: () => ({
      firstName: '',
      firstNameRules: [
        v => !!v || 'Le prénom est obligatoire',
        v => /^[a-zA-Z]+$/.test(v) || 'Le prénom doit contenir uniquement des lettres'
      ],
      lastName: '',
      lastNameRules: [
        v => !!v || 'Le nom est obligatoire',
        v => /^[a-zA-Z]+$/.test(v) || 'Le nom doit contenir uniquement des lettres'
      ],
      email: '',
      emailRules: [
        v => !!v || "L'e-mail est obligatoire",
        v => /.+@.+/.test(v) ||  "L'e-mail doit être valide"
      ],
      address: '',
      addressRules: [
        v => !!v || "L'adresse est obligatoire"
      ],
      password: '',
      passwordRules: [
        v => !!v || 'Le mot de passe est obligatoire',
        v => (v && v.length >= 8) || 'Le mot de passe doit contenir au moins 8 caractères.'
      ],
    }),
    methods: {
    }
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