const app = new Vue({
    el : "#app", 
    data : {
        mytasks : [],
        task : "",
        info : "Enter a task with length more than 7 characters",
        danger : true,
        okay : false
    },
    methods : {
        add_task : function(){
            let task = {}
            task.id = this.mytasks.length + 1
            task.name = this.task
            task.isCompleted = false
            this.mytasks.push(task)
            this.task = ""
        }, 
        mark_complete : function(id){
            let thistask = this.mytasks.find((task) => task.id == id)
            thistask.isCompleted = true
        }
    },
    computed : {
        completedTasks : function(){
            let tasks = this.mytasks.filter((task) => task.isCompleted == true)
            return tasks.length
        }, 
        pendingTasks : function(){
            // let tasks = this.mytasks.filter((task) => task.isCompleted == true)
            return this.mytasks.length - this.completedTasks 
        }
    }, 
    watch : {
        task : function(newvalue, oldvalue){
            if(newvalue.length < 8){
                this.info = "Length is still less than 7"
                this.danger = true
                this.okay = false
            }
            else{
                this.info = "Good to go, click on add!!"
                this.danger = false
                this.okay = true
            }
        }
    }
})