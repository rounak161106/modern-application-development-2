Vue.component("blog", {
    props : ["attr1", "attr2", "msg"],
    template : `<div>
                <p><slot></slot></p>
                <p>{{ message1 }}</p>
                <p>This is second heading!</p>
                <p>{{ compMessage }}</p>
                <p>Attribute 1 : {{ attr1 }}</p>
                <p>Attribute 2 : {{ attr2 }}</p>
                <p>Msg : {{ msg }}</p>
                <p>Count : {{ count }}</p>
                <button @click="updatecount">Click Me</button>
                </div>`, 
    data : function(){
        return {
            message1 : "This is first heading!",
            compMessage : "Greetings!",
            count : 0
        }
    },
    methods : {
        updatecount : function(){
            this.count++;
            this.$emit("clicked")
        }
    }
})

const app = new Vue({
    el : "#app",
    data : {
        message : "hello from main app",
        compMessage : "hello from app to the component", // the idea is simple. add this to an att. of the defined component using v bind and then we can access that from props in the defined component
        totcount : 0
    },
    methods : {
        inccount : function() {
            this.totcount++
        }
    }
}
)