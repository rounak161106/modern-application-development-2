console.log("hello")



var a = 10;
let b = 20;
const c = 30;

var age = 20;

let obj = {
    name : "Rounak",
    age : 19,
    func : function(){
        console.log(`${this.name} age is ${this.age}`)
    },
    func2 : () => {
        console.log(`${this.name} age is ${this.age}`)
    }
}

console.log(a)
console.log(b)
console.log(c)
obj.func()
obj.func2()