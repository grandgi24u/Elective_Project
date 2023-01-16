<template>
  <div class="form-profile">
    <v-form ref="profilForm">
      <div class="form-details">
        <v-text-field
            v-model="firstName"
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
       <v-btn type="submit" @click="validateInfoProfil">Enregistrer</v-btn>
      </div>
    </v-form>
  </div>
</template>

<script>
  export default {
    name: 'Profile-vue',
    data: () => ({
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
      validateInfoProfil () {
        if(this.$refs.profilForm.validate()) {
            this.$router.push('/updateUser/11', {
              name: this.surname,
              email: this.email,
            });
        }
      }
    },
    computed: {
      currentUser() {
        return this.$store.state.auth.user;
      },
      firstName: {
        get() {
          return this.currentUser.name;
        },
        set(value) {
          this.currentUser.name = value;
        }
      },
      surname: {
        get() {
          return this.currentUser.surname;
        },
        set(value) {
          this.currentUser.surname = value;
        }
      },
      email: {
        get() {
          return this.currentUser.email;
        },
        set(value) {
          this.currentUser.email = value;
        }
      },
      address: {
        get() {
          return this.currentUser.address;
        },
        set(value) {
          this.currentUser.address = value;
        }
      },
    },
    mounted() {
      if (!this.currentUser) {
        this.$router.push('/login');
      }
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