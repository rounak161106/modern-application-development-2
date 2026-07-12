Vue.component("blog", { // Global registration
    props: ["attr1", "attr2"],
    template: `
            <div>
                <h1>{{ message1 }}</h1>
                <h3>{{ compMessage }}</h3>
                <h4><slot></slot></h4>
                <h4>Count: {{ count }}</h4>
                <h4>Attribute 1: {{ attr1 }}</h4>
                <h4>Attribute 2: {{ attr2 }}</h4>
                <button @click="countClick">Add count</button>
                <input type="text" v-model="mytext">
                <button @click="appendText">Append text</button>
            </div>`,
    data: function() {
        return {
            message1: "Hello from component!",
            compMessage: "greetings!",
            count: 0,
            mytext: ""
        }
    },
    methods: {
        countClick: function(){
            this.count++;
            this.$emit("liked")
        },
        appendText: function(){
            this.message1 = this.message1 + this.mytext;
        }
    }
})

const app = new Vue({
    el: "#app",
    data: {
        message: "Hello from main application!",
        compMessage: "This is from main app!",
        allLikes: 0
    },
    methods: {
        addLike: function() {
            this.allLikes++;
        }
    }
}) 

