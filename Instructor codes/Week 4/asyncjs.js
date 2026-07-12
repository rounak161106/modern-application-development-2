// Things that take time:

// - API requests - fetch("http://127.0.0.1:5000/users") - data -JSON
// - File reading
// - Database queries
// - Timers
// - Network requests - http

// JavaScript handles this using asynchronous programming.

// console.log("Start");

// setTimeout(function(){
//     console.log("Data received");
// }, 2000);

// console.log("End");

// function fetchData(argument){
//     setTimeout(function(){ // Intentional delay
//         argument("Data loaded");
//     }, 2000); // expecting data ---> perform operations
// }

// const mylog = function(result){
//     console.log(result);
// }

// mylog("dummy");

// fetchData(argument = mylog);

// Nested callbacks 

// getUser(func1); // ---> user

// getOrders(id, func2); // ---> orders from a particular user

// getOrderDetails(order, func3); //----> orderdetails of a specific order

// let func1 = function(user){   
//     getOrders(user.id, );
//     });
// }

// let func2 = function(orders){
//         getOrderDetails(orders[0], function(details){
//             console.log(details);
//         }
//     }

// let func3 = function(orders){
//         getOrderDetails(orders[0], function(details){
//             console.log(details);
//         }

// getUser(function(user){
//     getOrders(user.id, function(orders) {
//         getOrderDetails(orders[0], function(details){
//             console.log(details);
//         })
//     })
// })

// Callback hell - pyramid of doom
// - Deep nesting
// - Hard to read
// - Hard to debug
// - Error handling becomes messy

// Promise

// A Promise is an object that represents the future result 
// of an asynchronous operation.

// | State     | Meaning                     |
// | --------- | --------------------------- |
// | Pending   | Work not finished           |
// | Fulfilled | Work completed successfully |
// | Rejected  | Work failed                 |

// Promise - basic example 

// let myPromise = new Promise(function(resolve, reject){
//     let success = false;
//     if(success){
//         resolve("Task completed");
//     } else {
//         reject("Task failed");
//     }
// });

// console.log(myPromise)

// Consuming a promise
// myPromise
//     .then(function(result){ console.log(result);})
//     .catch(function(result){ console.error(result);})





    // .catch(function(error){
    //     console.error(error);
    // });

// Promise - more practical example 

// function fetchUser(){
//     return new Promise(function(resolve, reject){
//         setTimeout(function(){
//             let success = false;
//             if(success){
//                 resolve({name:"Adarsh", id:101});
//             } else {
//                 reject("Task failed");
//             }
//         },2000);
//     });
// }

// console.log("Start");

// console.log(fetchUser())

// fetchUser()
//     .then(function(user){
//         console.log("User:", user);
//     })
//     .catch((error) => console.log(error));
    
//     console.log("End");

// fetch(http://localhost:5000/users) (delay)---> [<user1>, <user2>]

// Promise chaining 

// function step1(){
//     return new Promise(resolve => {
//         setTimeout(()=> resolve("Step 1 done"),1000);
//     });
// }

// function step2(){
//     return new Promise(resolve => {
//         setTimeout(()=> resolve("Step 2 done"),1000);
//     });
// }

// step1()
// .then(function(result){
//     console.log(result);
//     return step2();
// })
// .then(function(result){
//     console.log(result);
// })
// .catch(function(err){
//     console.error(err);
// })

// The return of first then is handled by consecutive thens.
// If any of the promises break, it will be handled by the catch block ignoring all the previous thens


// Promise chaining - practical example

// function loginUser(username, password) {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       console.log("Logging in user...");

//       if (username === "admin" && password === "1234") {
//         resolve({ userId: 101 });
//       } else {
//         reject("Invalid credentials");
//       }

//     }, 1000);
//   });
// }

// function fetchUserProfile(userId) {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       console.log("Fetching user profile...");
//       resolve({ userId: userId, name: "Adarsh", role: "admin" });
//     }, 1000);
//   });
// }

// function fetchPermissions(role) {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       console.log("Fetching permissions...");
//       if(role === "admin"){
//             resolve(["read", "write", "delete"]);
//         }
//         else{
//             resolve(["read"]);
//         }
//     }, 1000);
//   });
// }

// loginUser("admin", "1235") // return promise
//   .then((user) => {
//     return fetchUserProfile(user.userId);
//   })
//   .then((profile) => {
//     return fetchPermissions(profile.role);
//   })
//   .then((permissions) => {
//     console.log("Permissions:", permissions);
//   })
//   .catch((error) => {
//     console.error("Error:", error);
//   })
//   .finally(() => {
//     console.log("Authentication flow completed");
//   });

// Example 2

// Promise.resolve("Task Completed")

// let myProm = new Promise((resolve)=> {
//     resolve("Start")
// })

// Promise.resolve("Start")
//   .then((msg) => {
//     console.log(msg);
//     return "Step 1";
//   })
//   .then((msg) => {
//     console.log(msg);
//     throw new Error("Something broke");
//   })
//   .then((msg) => {
//     console.log(msg);
//   })
//   .catch((err) => {
//     console.log("Caught:", err.message);
//   })
//   .finally(() => {
//     console.log("Finally executed");
//   });

// Async await - Async/await allows writing asynchronous code 
// that looks like synchronous code.

// function step1(){
//     return new Promise(resolve => {
//         setTimeout(()=> resolve("Step 1 done"),1000);
//     });
// }

// function step2(resp){
//     return new Promise(resolve => {
//         setTimeout(()=> resolve( resp + " Step 2 done"),1000);
//     });
// }

// async function runTask(){
//     let result = await step1(); // returns promise
//     console.log(result);
// }

// const resp1 = await step1() //----> promise

// runTask();

// async → function returns a promise
// await → wait for promise to finish

// Async/Await Version of Chaining
// async function runProcess(){
//     let r1 = await step1();
//     // console.log(r1);

//     let r2 = await step2(r1);
//     console.log(r2);
// }


// runProcess();

// Error Handling with Async/Await

// async function run(){
//     try{
//         let user = await fetchUser();
//         console.log(user);
//     }catch(error){
//         console.error(error);
//     }
// }

// run() 

// Comparing all three

// Callback
// function(a){
//     function(b){
//         function(c)
//              ...

// Promise

// .then()
// .then()
// .then()

// Async Await

// 
// async func1() {
    // await step1()
    // await step2()
    // await step3()
// }