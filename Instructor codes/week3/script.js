const app = new Vue({
    el: "#app",
    data: {
        mytasks: [],
        // mytasks: ["Task 1", "Task 2", "Task 3", "Task 4"],
        task: "",
        info: "Enter a task with length more than 7 characters.",
        danger: true,
        green: false
    },
    methods:{
        addTask: function (){
            let thisTask = {}
            thisTask.id = this.mytasks.length + 1;
            thisTask.name = this.task;
            thisTask.isCompleted = false;
            this.mytasks.push(thisTask);
            this.task = ""; // resetting the value input field
        },
        markComplete: function(id){
            // console.log(id)
            let thisTask = this.mytasks.find((task) => task.id == id); // here task is the element(object) not the index
            // let thisTask = { id: "3", name: "Task 3", isCompleted: false},
            thisTask.isCompleted = true;
        }
    },
    computed: {
        completedTasks: function() {
            let cTasks = this.mytasks.filter((task) => task.isCompleted == true); // returns element
            return cTasks.length;
        },
        // pendingTasks: function() {
        //     let cTasks = this.mytasks.filter((task) => task.isCompleted == false); // returns element
        //     return cTasks.length;
        // }
        pendingTasks: function() {
            return this.mytasks.length - this.completedTasks;
        }
    },
    watch: {
        task: function(newVal, oldVal) {
            if(newVal.length < 8){
                this.info = "length is still less than 8, add more details!"
                this.danger = true
                this.green = false
            }
            else{
                this.info = "Good to go, click on add!"
                this.danger = false
                this.green = true
            }
        }
    }
})

// [
//     { id: "1", name: "Task 1", isCompleted: false},
//     { id: "2", name: "Task 2", isCompleted: false},
//     { id: "3", name: "Task 3", isCompleted: false},
//     { id: "4", name: "Task 4", isCompleted: false},
// ]

12345