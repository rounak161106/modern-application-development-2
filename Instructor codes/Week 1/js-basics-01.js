// go through this file along with this live session for better understanding;
// https://www.youtube.com/live/L3bwP7c3_Ns?si=07W_AeqNw0Teg1oH

// comments in JS - This is a single line comment
// comment

/* 
   This is
   a
   multiline
   comment
*/

// line 1
// line 2
// line 3

// JS code structure 
// console.log("hello"); 
// console.log("world");

// console.log("hello")
// console.log("world")

// console.log("hello"); console.log("world");

// console.log("2" * "2");
// console.log("1 + 2 + 6");

// Declaring a variable

// let message; 
// let hello5;
// let _hello;
// let 5hello // not correct

// message = "hello";
// console.log(message);

// let age = 25.5;
// console.log(age);

// let MESSAGE = "hello2"
// console.log(MESSAGE);


// let isMale = true;    // compound small letter - camelCase
// console.log(isMale);

// isMale = "yes";
// console.log(isMale);

// isMale = false;
// console.log(isMale);

// Datatypes
// Primitive datatypes
// Number - integers and floating value. ___________ N + 10, N + 20n, N, 2^53n

// BigInt - Numeric values that cannot be stored as Numbers. 

// Strings - charactesr enclosed in quotes "". '123', "hello"

// Boolean - Logical type - true, false, --> JSON

// null - refers to empty object
// let value = null; // None in Python
// console.log(value);

// undefined - refers to a variable whose value is not assigned.
// let val;
// console.log(val);

// let val2 = undefined; // same as let val2;
// console.log(val2);


// let val3 = "123v";
// console.log(Number(val3));

// Symbol

// Non-primitive
// Objects - explained below


// Other ways of declaring variables
// let message = "hello";
// message = "world";
// console.log(message);

// const pi = 3.14;
// console.log(pi);

// What const enforces? 
// const pi; // initialization with declaration
// pi = 3.14;
// console.log(pi);

// const pi = 3.14;
// pi = 4.14; // reaassignment forbidden
// console.log(pi);

// 1995 - one way of declaring variables - var
// var message = "Hello from var";
// console.log(message);

// message = "changed message from var";
// console.log(message);

// Scoping in JS - block level scoping, function scoping

// let val1 = 20;

{
    // console.log(val1);
    let val2 = 30;
    const val3 = 40;
    var val4 = 50;
    // console.log(val2);
    // console.log(val3);
    // console.log(val4);
}


// console.log(val2);
// console.log(val3);
// console.log(val4);

// var variable1 = 20;
// {
//     console.log(variable1);
//     let variable2 = 30;
// }
// console.log(variable2);

// var var3 = 20;
// function test() {
//     var var4 = 30;
//     console.log(var3);
// }
// test()
// console.log(var4)

// console.log(variable3);
// var variable3 = 40;

// block scope - single block , conditional statement, loops 

// simple block 
// {
//     let abc = 123;
//     const pqr = 567;
//     val3 = 10;
// }


// if (cond) {
//     let abc = 123;
//     const pqr = 567;
// }

// for(;;) {
//     let abc = 123;
//     const pqr = 567;
// }

// let color = "blue";
// let gender = "Male";

// if (gender == "Male") {
//     color = "green"
//     console.log(color)
//     color = "White";
// } else {
//     color = "black";
// }
// console.log(color)

// Comparisons

// == === equality 
// <=, >=

// "abc", 35, true, 12.67, 1 // ---> truthy 
// false, undefined, null, 0, "" , NaN // ---> falsy

// if (true) {
//     console.log("truthy");
// }

// if (null) {
//     console.log("falsy");
// }
// console.log("21a" == 21); // step 1
// console.log(Number("21a") == 21); // step 2 // NaN == 21
// console.log(Number("21a"));
// console.log(x == 21);  // => step 3

// console.log("zq" < "aqa") // lexicographical comparison
// console.log("zbcd" < "abce") // lexicographical comparison
// console.log("2" + "1" == "21") // lexicographical comparison
// console.log("21" == "2" + "1" ) // lexicographical comparison 
// console.log(21 == ("2" + "1")) 
// console.log(21 === ("2" + "1")) // strict equality
// console.log("21" === 21) // strict equality
// console.log(21 === 21) // strict equality
// console.log("21" === "21") // strict equality


// "aqa" -- 1
// "zq" -- 2

// 2 < 1

// console.log("21" === 21); 

// console.log(null == undefined); // true
// console.log(null === undefined); // false

// Functions 
// conventional functions - named functions
// function add(a, b) {
//     var val1 = 10;
//     return a + b;
// }

// console.log(val1); // NA
// console.log(add(4,6));

// function expressions - unnamed functions 
// const mySum = function(a, b) { // 
//     return a + b;
// }

// let sum = mySum(4,6);    

// arrow function 
// const product = (a, b) => a*b; // callbacks
// const square = (a, b) => {
//     let Asqr = a**2;
//     let Bsqr = b**2;
//     return Asqr + Bsqr;
// }
// // const product = (a, b) => {return a*b}; // callbacks

// console.log(sum(4, 7));
// console.log(product(3,4))


// Objects
// const obj1 = { // context
//     a: "hello",
//     myFunc: function(a, b) { // 
//         return a + b;
//     }
// }

// console.log(obj1.myFunc);

