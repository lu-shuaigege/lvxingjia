export default {
    install(Vue, options) {
        Vue.prototype.routerLink = function (path, query = {}) {
            this.$router.push({path: path, query: query});
        }
    }
}
