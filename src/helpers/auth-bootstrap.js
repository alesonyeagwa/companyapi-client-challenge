export default{
    init() {
        const user = JSON.parse(localStorage.getItem('user'))
        var token = user && user.token ? user.token : null
        if (token && window.axios) {
            window.axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
        }
    }
}