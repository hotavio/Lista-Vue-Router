<template>
  <v-app>
    <v-app-bar app color="teal lighten-1" light elavation="1">
      <v-app-bar-nav-icon @click.stop="sidebar =! sidebar"></v-app-bar-nav-icon>
      <v-spacer></v-spacer>
      <v-icon>mdi-account-box2</v-icon>
      
      <v-switch
        label= "Dark Mode"
        @click="$vuetify.theme.dark =! $vuetify.theme.dark"
        v-model="switch1"
        inset
        color="secondary"
      ></v-switch>

    </v-app-bar>
    
    <v-navigation-drawer app v-model="sidebar" :mini-variant.sync="mini">
      <v-list dense color="teal lighten-1" light>
        <v-list-item class="px-2">
          <v-list-item-action>
            <v-icon @click.stop="sidebar =! sidebar">mdi-chevron-left</v-icon>
          </v-list-item-action>
          <v-list-item-title>
            <h3>Minha Lista</h3>
          </v-list-item-title>
        </v-list-item>
      </v-list>
      <v-list-item class="px-2" @click="mini =! mini">
        <v-list-item-avatar>
          <v-icon>mdi-account</v-icon>
        </v-list-item-avatar>
      <v-list-item-content>Usuário</v-list-item-content>
      <v-btn icon small><v-icon>mdi-chevron-left</v-icon></v-btn>
      </v-list-item>
      <v-divider></v-divider>

      <v-list>
        <v-list-item v-for="item of items" :key="item.title" link :to="item.to">
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>{{ item.title }}</v-list-item-content>
        </v-list-item>
      </v-list>

    </v-navigation-drawer>
    
    <v-main> 
      <router-view></router-view>
    </v-main>
    
    <v-footer app class="py-3"
      ><span class="caption">MyTodoList &copy;2022</span></v-footer>
  </v-app>
</template>

<script>

export default {
  data() {
    return {
      sidebar: true,
      mini: true,
      items: [
        {title: "Home", icon: "mdi-home", to: "/"},
        {title: "Perfil", icon: "mdi-account-cog", to: "/perfil"},
        {title: "Sair", icon: "mdi-exit-to-app", to: "/login"},
      ],
      switch1: true,
    };
  },
};
</script>

<style>

</style>