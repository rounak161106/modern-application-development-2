# JavaScript Notes

## Variable Declarations

In `var` and `let` declarations, the initializer is optional. If a variable is declared without an initializer, it is assigned the value `undefined`.

## Variable Scope

A variable may belong to one of the following scopes:

- **Global scope**: The default scope for all code running in script mode.
- **Module scope**: The scope for code running in module mode.
- **Function scope**: The scope created with a function.

In addition, variables declared with `let` or `const` can belong to an additional scope:

- **Block scope**: The scope created with a pair of curly braces (a block).

## Variable / Function Hoisting

- First of all, all functions and variables in the script are hoisted. If a variable is declared with `let` or `const`, it is hoisted to the top of the script with a **temporal dead zone** value. If a variable is declared with `var`, it is hoisted to the top of the script with an initial value of `undefined`. Functions, however, can be accessed before their definition, since the entire function definition is hoisted to the top of the script.
- If we declare an unnamed function or an arrow function and assign it to a variable, trying to call it before the declaration won't work. During hoisting, the compiler only sees the LHS (the variable), not the RHS (the function), so it doesn't know a function exists there. The variable is hoisted, not the function — this results in `undefined` or a temporal dead zone error, depending on the keyword used.
- We can also declare a variable without any keyword, but this should be avoided. For hoisting purposes, such variables follow `var` behavior.

## Object Property Access

```js
let obj = { name: "Rounak", "age": 18 };
```

- `obj.name` is valid, but `obj.age` is not (since `"age"` was declared as a quoted string key in this style) — so we use `obj["age"]`. Note: in newer JS versions this restriction doesn't really apply, and it works either way.
- Numbers cannot be used as property names directly, e.g. `{13: "Thirteen"}` — this is an error.

## String Formatting

```js
`${name} age is ${age}`
```

## IIFE (Immediately Invoked Function Expression)

```js
(() => {
  console.log("invoked from iife");
})();
```

## Callbacks

Callbacks are functions passed as arguments to other functions. Used extensively in Vue and JS when building websites, e.g. `setTimeout(callback, 1000)`.

```js
function greet(name) {
  return "hello " + name;
}

function run_callback(callback) {
  callback("Rounak");
}

run_callback(greet);
```

## Array Methods

- `map()`, `filter()`, `find()` syntax: `arr.map((x) => {})` — same pattern for all three.
- `reduce()` syntax: `arr.reduce((init, x) => { init + x }, 2);`

All four methods return a value and do **not** modify the original array.

### Sorting

```js
arr.sort(); // default sort
arr.sort((a, b) => a - b); // ascending, for numbers
arr.sort((a, b) => b - a); // descending
```

## `this` Context in Objects

```js
let obj = {
  a: "apple",
  b: function () {
    console.log(this.a);
  }
};
```

This works correctly. However, if an arrow function were used instead of a regular (unnamed) function, it would **not** work and would result in `undefined` when calling `obj.b()`, because arrow functions don't have their own `this` binding — they inherit `this` from the enclosing scope.

### Full Object Example

```js
let obj = {
  var1: "Rounak",
  age: 19,
  func: function () {
    console.log(`${this.var1} age is ${this.age}`);
  },
  func2: function (arg) {
    console.log(arg);
  },
  func2: () => {
    console.log(`${this.name} age is ${this.age}`);
  }
};

obj.func(); // output: "Rounak age is 19" -- context is maintained

let func_new = obj.func;
func_new(); // output: "undefined age is undefined"
// This happens because a copy of the function definition is stored in func_new,
// and it can no longer refer to `this` as the original object's context.
// This is known as "loss of context."
```

### Fixing Loss of Context: `call()`, `apply()`, `bind()`

To restore context, we use three object methods: `call()`, `apply()`, and `bind()`.

```js
let func_new = obj.func.apply(<context_obj>);
let func_new = obj.func.call(<context_obj>);
let func_new = obj.func.bind(<context_obj>)();
```

In all these cases, when using `this` or these three methods to access a property, we never get a `ReferenceError` — we always get `undefined`, since it's searching for a property within an object, not any general variable.

**With arguments:**

```js
let func_new = obj.func.apply(<context_obj>, ["argument1", "argument2", ...]);
let func_new = obj.func.call(<context_obj>, "argument1", "argument2", ...);
let func_new = obj.func.bind(<context_obj>)("argument1", "argument2", ...);
```

### Arrow Functions and `this`

For arrow functions, the behavior is completely different. If we access `this.something` inside an arrow function, it does **not** refer to the current object. Instead, it accesses the **global `this`** and searches for the variable there — this may return `undefined` even if the property exists in the current object.

However, if a variable is defined with `var`, it becomes part of the local/global `this`, so accessing it via `this` will return its value. This does not happen with `let` or `const`, since those are not attached to the global `this` — they remain script-level properties instead.

## Collections (Lists and Dictionaries)

- We can iterate using `in` or `of` for lists, but only `in` for dictionaries.
- Other helper methods include: `Object.keys(arr)`, `Object.values(arr)`, `Object.entries(arr)`.

## Destructuring

Unpacking values from arrays and objects.

```js
let [a, b] = [1, 2, 3]; // a = 1, b = 2
let [a, , b] = [1, 2, 3]; // a = 1, b = 3 (skips index 1)
let [a, ...b] = [1, 2, 3]; // a = 1, b = [2, 3]
```

If the spread operator is used on the RHS, the list is "dissolved" and no nested array structure persists.

```js
let arr = [1, 2, 3];
let new_arr = [...arr, 4, 5, 6]; // output: [1, 2, 3, 4, 5, 6]
```

### Object Destructuring

```js
let obj = {
  prop1: val1,
  prop2: val2,
};

let { prop1, prop2 } = obj;
// Note: variable names on the LHS must match the object's property names.

// To rename while destructuring:
let { prop1: var1, prop2: var2 } = obj;
```

### Object Spread

```js
const obj2 = {
  ...obj,
  prop3: val3,
};

// Result:
// {
//   prop1: val1,
//   prop2: val2,
//   prop3: val3
// }
```