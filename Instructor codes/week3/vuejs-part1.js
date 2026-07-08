// First Vue App

// var app = new Vue({ // options object
//   el: '#app', // element
//   data: { // state of the app  UI = f(state)
//     message: "hello india",
//     height: 135
//   }
// }
// ) // creating a vue app 

// var app = new Vue({

// });

// Vue Directives:
// 1. Bind Elements 'v-bind'

// var app2 = new Vue({
//   el: '#app-2',
//   data: {
//     message: 'You loaded this page on ' + new Date().toLocaleString(),
//     val: "font-size: 30px;"
//   }
// })

// 2. Conditional rendering 'v-if' {% if %}
// var app3 = new Vue({
//   el: '#app-3',
//   data: {
//     seen: true
//   }
// })

// 3. Loops in Vue 'v-for' {% for x in list %}
// var app4 = new Vue({
//   el: '#app-4',
//   data: {
//     number: 3,
//     todos: [
//       { text: 'Learn JavaScript' },
//       { text: 'Learn Vue' },
//       { text: 'Build something awesome' }
//     ]
//   }
// })

// let myList = [
//       { text: 'Learn JavaScript' },
//       { text: 'Learn Vue' },
//       { text: 'Build something awesome' }
//     ]

// for(let i of myList) { // in index
//     console.log(i.text)
// }

// 4. Handling user interaction 
// 4.1 Handling inputs from user (Two-way data binding) 'v-model'
// var app5 = new Vue({
//   el: '#app-5',
//   data: {
//     message: '' // initial state
//   }
// })

// 4.2 Handling user events with 'v-on' and event handlers
// var app6 = new Vue({
//   el: '#app-6',
//   data: {
//     message: '',
//     info: {
//         "course": "MAD-II"
//     }
//   },
//   methods: {
//     reverseMessage: function () {
//       this.message = this.message.split('').reverse().join('')
//     //   message.split("") --> ['H', 'e', 'l'. . .]
//     //   this.info.course;
//     // array.reverse() ---> ['!', 's', ....]

//     }
//   }
// })

// app6.message

// Computed Properties
// var app7 = new Vue({
//   el: '#app-7',
//   data: {
//     message: 'Helloo',
//     firstname: 'MADii',
//     lastname: 'course'
//   },
//   computed: {
//     fullname: function() {
//         return this.firstname + " " + this.lastname;
//     },
//     reversed: function() {
//         return this.message.split('').reverse().join('')
//     }
//   }
// })

// Watchers
// var app8 = new Vue({
//   el: '#app-8',
//   data: {
//     message: '',
//     info: 'Cannot proceed until length is 8!',
//     oldVal: ''
//   },
//   watch:{
//     message: function(newValue, oldValue) {
//         this.oldVal = oldValue;
//         if(newValue.length >= 8){
//             this.info = "Perfect! you can go ahead!"
//         }
//         else{
//             this.info = "Not yet 8! add more char!"
//         }
//     }
//   }
// })

// message = "" ==> "a"

// oldValue = "" ==> "a" ==> "ad"
// newValue = "a" ==> "ad" ==> "ada"

// message("a", "")
// message("ad", "a")