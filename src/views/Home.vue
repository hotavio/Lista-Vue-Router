<template>
  <v-container class="pa-8" fluid>
    <h1 class="h1">Lista de tarefas</h1>
  
    <v-row>
      <v-col cols="12" lg="6">
        <v-text-field label="Nova tarefa" v-model="novaTarefa" prepend-icon="mdi-pencil"></v-text-field> 
      </v-col>
      <v-col cols="12" lg="6">
      <v-menu
        v-model="menu"
        :close-on-content-click="false"
        transition="scale-transition"
        max-width="290px"
        min-width="auto"
      >

        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="computedDateFormatted"
            label="Data"
            persistent-hint
            prepend-icon="mdi-calendar"
            readonly
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>

        <v-date-picker
          v-model="date"
          no-title
          @input="menu = false"
        ></v-date-picker>

      </v-menu>
      </v-col>
    </v-row>
  <p></p>
  <v-btn color="teal lighten-1" block rounded @click="adicionar">
    Salvar Tarefa
  </v-btn>
  <p></p>
  <v-divider></v-divider>
  <v-list>
    <v-list-item-group>
      <v-list-item v-for="tarefa of tarefas" :key="tarefa.id">
        {{ tarefa.titulo }}
        <v-spacer></v-spacer>
        <v-checkbox
          v-model="checkbox"
        ></v-checkbox>
      </v-list-item>
    </v-list-item-group>
  </v-list>
  <p></p>
  <v-btn text @click='deleteat'>
    <v-icon>mdi-trash-can</v-icon>
  </v-btn>
  </v-container>
</template>

<script>
import * as fb from "@/plugins/firebase"
export default {
  data: vm => ({
    date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
    dateFormatted: vm.formatDate((new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)),
    menu: false,
    novaTarefa: "",
    tarefas: [],
    uid: '',
  }),

  computed: {
    computedDateFormatted () {
      return this.formatDate(this.date)
    },
  },
  mounted() {
    this.uid = fb.auth.currentUser.uid;
    this.buscartarefas()
  },
  methods: {
    async buscartarefas(){
      this.tarefas = []
      const logTasks = await fb.taskCollection
        .where("owner","==", this.uid)
        .get();
      for (const doc of logTasks.docs){
        this.tarefas.push({
          id: doc.id,
          titulo: doc.data().titulo,
        });
      }
    },
    formatDate (date) {
      if (!date) return null

      const [year, month, day] = date.split('-')
      return `${day}/${month}/${year}`
    },

    async adicionar(){
      await fb.taskCollection.add({
        titulo: this.novaTarefa+ "  -  (" + this.formatDate(this.date)+")",
        dataGravacao: new Date().toISOString().slice(0, 10),
        owner: this.uid,
      });
      this.novaTarefa= "";
      this.buscartarefas();
    },

    async deleteat() {
      await fb.profileCollection.doc.data().delete(this.tarefas)
    },
  }
}
</script>

<style>
</style>