<template>
  <div>
      <div id="nav">
        <router-link to="/">Home</router-link> |
        <router-link to="/about">About</router-link>
        <span v-if="!auth.status.loggedIn"> | <router-link to="/login">Login</router-link> </span>
        <span v-if="auth.status.loggedIn"> | <router-link to="/dashboard">Dashboard</router-link> </span>
        <span v-if="auth.status.loggedIn"> | <a href="#" @click="logout">Sign out</a> </span>
      </div>
      <div class="container">
        <div class="row">
          <div class="col">
            <div v-if="alert.message" :class="`alert ${alert.type}`">{{alert.message}}</div>
          </div>
        </div>
      </div>
      <router-view/>
  </div>
</template>

<style>
  #nav {
    padding: 30px;
  }

  #nav a {
    font-weight: bold;
    color: #2c3e50;
  }

  #nav a.router-link-exact-active {
    color: #42b983;
  }
</style>
<script>
export default {
    name: 'app',
    computed: {
        alert () {
            return this.$store.state.alert
        },
        auth () {
            return this.$store.state.auth
        }
    },
    methods: {
      logout () {
        var proceeed = confirm('Are you sure you want to log out?')
        if(proceeed){
         this.$store.dispatch('auth/logout')
        }
      }
    },
    watch:{
        $route (to, from){
          // clear alert on location change
          this.$store.dispatch('alert/clear')
        }
    }
};
</script>
