const store = new Vuex.Store({
    state : { // in case of app, we have data, computed and methods, in case of store, we have state, getters and mutations.
        count : 0 
    },
    actions : {
        // here we perform asynchronous operations and then commit the mutations to update the state. mutations only handle synchronous operations. we can also use actions to call other actions and then commit the mutations to update the state.
        incrementAsync : function(context) {
            setTimeout(function() {
                context.commit("increment") // commit the mutation to update the state.
            }, 1000) 
        }
    },
    mutations : {
        increment : function(state) {
            state.count++
        },
        decrement : function(state) {
            state.count--
        }
    },
    getters : {
        doubleCount : function(state) {
            return state.count * 2
        }
    }
})

// we are creating a component to show that we can change the state from the child also, which in turn will change the state in the parent also. we can also use mapState and mapGetters to get the data from the store.
Vue.component("comp", {
    template : `<div>
                    <h1>Count : {{count}}</h1>
                    <button @click="decrement">Decrement</button>
                </div>`,
    methods : {
        decrement() {
            this.$store.commit("decrement")
        }
    },
    computed : {
        count() {
            return this.$store.state.count
        }
    },
})

const app = new Vue({
    el : "#app",
    store,
    computed : {                        // in order to get any data from the store, we need to use computed properties. we can also use methods to get the data from the store, but it is not recommended as it will not be reactive. we can also use mapState and mapGetters to get the data from the store.
        count : function() {
            return this.$store.state.count
        },
        doubleCount : function() {
            return this.$store.getters.doubleCount
        }
    },
    methods : {
        increment : function() {
            this.$store.commit("increment")
        },
        incrementAsync : function() {
            this.$store.dispatch("incrementAsync")
        }
    }
})