<template>
  <v-container class="pa-8" fluid>
    <h1 class="h1">Perfil {{ nome1 }}</h1>
    <v-form>

      <v-container>
      <v-text-field
        v-model="nome"
        :counter="20"
        label="Nome"
        outlined
        dense
        rounded
      ></v-text-field>

      <v-select
        v-model="select"
        :items="items"
        label="Sexo"
        outlined
        dense
        rounded
      ></v-select>
  
      <v-btn @click="salvarPerfil" color="teal lighten-1" class="mr-4" rounded> 
        Salvar
      </v-btn>
      </v-container>

    </v-form>

  </v-container>
</template>

<script>
import * as fb from '@/plugins/firebase'
export default {
  data() {
    
    return {
      nome: "",
      items: [
        'Masculino',
        'Feminino',
        'Não especificar',
      ],
      uid: '',
      temPerfil: false
    };

  },
  async mounted() {
      this.uid = fb.auth.currentUser.uid;
      const userProfile = await fb.profileCollection
      .where("uid", "==", this.uid)
      .get();
    if (userProfile.docs.length > 0) {
      this.temPerfil = true
      const perfil = userProfile.docs[0]
      this.profileid = perfil.id
      this.nome = perfil.data().nome;
    }
  },
  methods: {
    async salvarPerfil() {
      if (this.temPerfil) {
        await fb.profileCollection.doc(this.profileid).update({
          nome: this.nome,
        })
      } else {
        await fb.profileCollection.add({
          uid: this.uid,
          nome: this.nome,
        })
      }
    }
  }
};
</script>

<style>

</style>