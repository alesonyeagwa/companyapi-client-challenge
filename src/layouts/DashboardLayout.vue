<template>
    <main>
        <div class="wrapper">

            <side-bar></side-bar>

            <div id="content">
                <top-nav></top-nav>
                <div class="container">
                    <div class="row">
                        <div class="col">
                            <div v-if="alert.message" :class="`alert ${alert.type}`">{{alert.message}}</div>
                        </div>
                    </div>
                </div>
                <router-view/>
            </div>

        </div>
    </main>
</template>

<style>

</style>

<script>
import SideBar from '@/components/SideBar.vue'
import TopNav from '@/components/TopNav'

require('../assets/css/dashboard.css')

export default {
  components: {
    SideBar,
    TopNav
  },
  computed: {
        alert () {
            return this.$store.state.alert
        }
    },
    watch:{
        $route (to, from){
          // clear alert on location change
          this.$store.dispatch('alert/clear')
        }
    }
}
</script>
