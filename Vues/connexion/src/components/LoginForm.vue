<template >
    <v-container>
      <v-card
          elevation="2"
          class="pa-4"
      >
        <div class="text-center">
          <h2>Connexion</h2>
        </div>
      <v-form
          ref="form"
          v-model="valid"
          lazy-validation
      >
        <div class="text-center">
          <div style="width: 50%; transform: translateX(50%)">
            <v-text-field
                v-model="email"
                :rules="emailRules"
                label="E-mail"
                required
            ></v-text-field>
            <v-text-field
                v-model="password"
                :rules="passwordRules"
                label="Mot de passe"
                required
            ></v-text-field>
          </div>
          <v-btn
              :disabled="!valid"
              color="success"
              class="mr-4"
              @click="validate"
          >
            Validate
          </v-btn>
        </div>
      </v-form>
  </v-card>
    </v-container>

</template>

<script>
import axios from "axios";
export default {
  data: () => ({
    valid: true,
    email: '',
    emailRules: [
      v => !!v || "L'email est requis",
      v => /.+@.+\..+/.test(v) || "L'email n'a pas un format valide",
    ],
    password: '',
    passwordRules: [
      v => !!v || 'Le mot de passe est requis',
    ],
  }),

  methods: {
    validate () {
      this.$refs.form.validate()
      if(this.valid) {
        let data = { email: this.email, password: this.password }
        axios.post('http://localhost:4000/signin', data)
            .then(function (response) {
              console.log(response);
            })
            .catch(function (error) {
              console.log(error);
            });
      }
    }
  },
}
</script>
