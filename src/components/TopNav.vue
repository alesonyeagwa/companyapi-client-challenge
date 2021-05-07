<template>
    <nav class="navbar navbar-expand-lg">
      <div class="container-fluid">

        <div class="navbar-header">
            <button type="button" id="sidebarCollapse" class="btn btn-info navbar-btn">
                <i class="glyphicon glyphicon-align-left"></i>
                <span>Toggle Sidebar</span>
            </button>
        </div>

        <div class="collapse show navbar-collapse justify-content-end" id="bs-example-navbar-collapse-1">
          <ul class="nav navbar-nav navbar-right">
            <li class="me-3">Hi {{user.username}}!</li>
            <li><a href="#" @click="logout">Sign out</a></li>
          </ul>
        </div>
      </div>
    </nav>
</template>
<script>
export default {
  mounted: () => {
    var sidebarCollapse = document.getElementById('sidebarCollapse')
    var sidebar = document.getElementById('sidebar')
    sidebarCollapse.addEventListener('click', (event) => {
      sidebarCollapse.classList.toggle('active')
      sidebar.classList.toggle('active')
    })
  },
  methods: {
    logout () {
      var proceeed = confirm('Are you sure you want to log out?')
      if(proceeed){
        this.$store.dispatch('auth/logout')
      }
    }
  },
  computed: {
    user(){
      return this.$store.state.auth.user
    }
  }
}
</script>
