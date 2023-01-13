<template>
  <v-dialog v-model="dialog" persistent max-width="600px" min-width="360px">
    <div>
      <v-tabs v-model="tab" show-arrows background-color="deep-purple accent-4" icons-and-text dark grow>
        <v-tabs-slider color="black"></v-tabs-slider>
        <v-tab class="nav-login" v-for="(val, i) in tabs" :key="i">
          <v-icon large>{{ val.icon }}</v-icon>
          <div class="caption py-1">{{ val.name }}</div>
        </v-tab>
        <v-tab-item>
          <v-card class="px-4">
            <v-card-text>
              <v-form ref="loginForm" v-model="valid" lazy-validation>
                <v-row>
                  <v-col cols="12">
                    <v-text-field v-model="loginEmail" :rules="loginEmailRules" label="E-mail" required></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field v-model="loginPassword" :append-icon="show1?'eye':'eye-off'" :rules="[rules.required, rules.min]" :type="show1 ? 'text' : 'password'" name="input-10-1" label="Mot de passe" hint="Il doit contenir au moins 8 caractères" counter @click:append="show1 = !show1"></v-text-field>
                  </v-col>
                  <v-col class="d-flex" cols="12" sm="6" xsm="12">
                  </v-col>
                  <v-spacer></v-spacer>
                  <v-col class="d-flex" cols="12" sm="3" xsm="12" align-end>
                    <v-btn x-large block :disabled="!valid" color="success" @click="validateLogin"> Valider </v-btn>
                  </v-col>
                </v-row>
              </v-form>
            </v-card-text>
          </v-card>
        </v-tab-item>
        <v-tab-item>
          <v-card class="px-4">
            <v-card-text>
              <v-form ref="registerForm" v-model="valid" lazy-validation>
                <v-row>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field v-model="firstName" :rules="[rules.required]" label="Prénom" maxlength="20" required></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field v-model="lastName" :rules="[rules.required]" label="Nom" maxlength="20" required></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field v-model="address" :rules="addressRules" label="Adresse" required></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field v-model="password" :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'" :rules="[rules.required, rules.min]" :type="show1 ? 'text' : 'password'" name="input-10-1" label="Mot de passe" hint="Il doit contenir au moins 8 caractères" counter @click:append="show1 = !show1"></v-text-field>
                  </v-col>
                  <v-spacer></v-spacer>
                  <v-col class="d-flex ml-auto" cols="12" sm="3" xsm="12">
                    <v-btn x-large block :disabled="!valid" color="success" @click="validateRegister">Créer mon compte</v-btn>
                  </v-col>
                </v-row>
              </v-form>
            </v-card-text>
          </v-card>
        </v-tab-item>
      </v-tabs>
    </div>
    <div class="form-group">
      <div v-if="message" class="alert alert-danger" role="alert">{{message}}</div>
    </div>
  </v-dialog>

</template>

<script>
import User from '../models/user';

export default {
  data: () => ({
    dialog: true,
    tab: 0,
    tabs: [
      {name:"Connexion", icon:"mdi-account"},
      {name:"Enregistrement", icon:"mdi-account-outline"}
    ],
    valid: true,
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    verify: "",
    loginPassword: "",
    loginEmail: "",
    loginEmailRules: [
      v => !!v || "Obligatoire",
      v => /.+@.+\..+/.test(v) || "Le mail n'est pas valide"
    ],
    emailRules: [
      v => !!v || "Obligatoire",
      v => /.+@.+\..+/.test(v) || "Le mail n'est pas valide"
    ],
    address: "",
    addressRules: [
      v => !!v || "Obligatoire",
    ],
    show1: false,
    rules: {
      required: value => !!value || "Obligatoire",
      min: v => (v && v.length >= 8) || "8 caractères minimum"
    },
    user: new User('', '', '', ''),
    message: ''
  }),
  name: 'LoginPage',
  methods: {
    validateRegister() {
      if (this.$refs.registerForm.validate()) {
        console.log("Nom :", this.firstName);
        console.log("Prénom :", this.lastName);
        console.log("Mail :", this.email);
        console.log("Adresse :", this.address);
        console.log("Mot de passe :", this.password);
      }
    },
    validateLogin () {
      if(this.$refs.loginForm.validate()) {
        this.$store.dispatch('auth/login', {email: this.loginEmail, password: this.loginPassword}).then(
            () => {
              this.$router.push('/restaurants');
            },
            error => {
              this.message =
                  (error.response && error.response.data) ||
                  error.message ||
                  error.toString();
            }
        );
      }
    }
  },
}
</script>

<style scoped>
label {
  display: block;
  margin-top: 10px;
}

.card-container.card {
  max-width: 350px !important;
  padding: 40px 40px;
}

.card {
  background-color: #f7f7f7;
  padding: 20px 25px 30px;
  margin: 0 auto 25px;
  margin-top: 50px;
  -moz-border-radius: 2px;
  -webkit-border-radius: 2px;
  border-radius: 2px;
  -moz-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  -webkit-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
}

.profile-img-card {
  width: 96px;
  height: 96px;
  margin: 0 auto 10px;
  display: block;
  -moz-border-radius: 50%;
  -webkit-border-radius: 50%;
  border-radius: 50%;
}
</style>