<template>
    <v-dialog v-model="dialog" persistent max-width="600px" min-width="360px">
      <div>
        <v-tabs v-model="tab" show-arrows background-color="deep-purple accent-4" icons-and-text dark grow>
          <v-tabs-slider color="black"></v-tabs-slider>
          <v-tab class="nav-login" v-for="i in tabs" :key="i">
            <v-icon large>{{ i.icon }}</v-icon>
            <div class="caption py-1">{{ i.name }}</div>
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
    </v-dialog>
</template>

<script>
import axios from "axios";
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
    }
  }),

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
        console.log("Mail :", this.loginEmail);
        console.log("Mot de passe :", this.loginPassword);
        let data = { email: this.loginEmail, password: this.loginPassword }
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

<style>
  .col-sm-3 {
    max-width: 100%;
  }
  .nav-login {
    background-color: #EC7063 ;
  }
  .theme--light.v-card {
    background-color: #F4F6F6;
  }
  .v-btn {
    background-color: black;
  }
</style>