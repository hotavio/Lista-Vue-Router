<template>
  <v-container fill-height fluid tex-center>
    <v-container>
      <v-row>
        <v-col class="teal--text text-center mx-auto pb-4"
        cols="1"
        sm="4"
        offset="4"
        ><h1 class="h1">Login</h1></v-col
      >
      </v-row>
      <v-row class="elavation-3 mx-auto">
        <v-col cols="auto">
          <v-img 
            max-height="150" 
            max-width="250"
            src="@/assets/images/firebase.png"
          ></v-img>
        </v-col>
        <v-col>
          <v-form>
            <v-text-field label="Email" v-model="user.email" outlined rounded prepend-icon="mdi-account"></v-text-field>
            <v-text-field 
            label="Senha" 
            v-model="user.password" 
            :type="show ? 'text' : 'password'"
            outlined rounded 
            prepend-icon="mdi-lock" 
            :append-icon="show ? 'mdi-eye-off' : 'mdi-eye' " 
            @click:append="show =! show"
            >
            </v-text-field>
            <v-btn class="ml-9" color="teal lighten-1" rounded @click="login">Login</v-btn>
            <v-btn class="ml-2" color="warning" rounded @click="reset">Cancelar</v-btn>
          </v-form>
        </v-col>
      </v-row>
    </v-container>
    <v-snackbar color="red" v-model="errorlogin" danger multline timeout='2000'>
      Usuário ou senha invalidos
    </v-snackbar>

    <v-dialog v-model="novaConta" persistent max-width=350>
      <v-card>
        <v-card-title class="text-h10">Conta não encontrada.</v-card-title>
          <v-card-tex>
            A conta não foi localizada. 
            Deseja Criar uma nova conta com 
            os dados informados?
          </v-card-tex>
        <v-card-action>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" rounded text @click="criarNovaConta">Sim</v-btn>
          <v-btn color="red darken-1" rounded text @click="novaConta = false"
          >Não</v-btn
          >
        </v-card-action>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import * as fb from '@/plugins/firebase'
export default {
  data() {
    return {
      user: {},
      show: false,
      errorlogin: false,
      novaConta: false,
    };
  },
  methods: {
    reset() {
      this.user = {};
    },
    async login() {
      try{
        await fb.auth.signInWithEmailAndPassword(this.user.email,this.user.password)
        this.$router.push({ name: 'Home' })
      } catch(error) {
        const errorCode = error.code
        switch(errorCode) {
          case "auth/wron-password":
            this.errorlogin = true
            break
          case "auth/invalid-email":
            this.errorlogin = true
            break
          case "auth/user-not-found":
            this.novaConta = true
            break
          default:
            this.errorlogin = true
            break
        }
      }
    },
    async criarNovaConta() {
      this.novaConta = false
      await fb.auth.createUserWithEmailAndPassword(
        this.user.email,
        this.user.password
      );
      this.login();
    },
  },
};
</script>

<style>

</style>