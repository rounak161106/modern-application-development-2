Vue.component("blog", {
    template : "<h1>Hello from component!</h1>"
})


const app = new Vue({
    el : "#app",
    data : {
        message : "hello from main app"
    }
}
)