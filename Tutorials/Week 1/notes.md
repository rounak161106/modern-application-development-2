# JavaScript Notes

## Variable Declarations

1. In `var` and `let` declarations, the initializer is optional. If a variable is declared without an initializer, it is assigned the value `undefined`.
2. variables declared using var can be redeclared in the same scope without any error, this is not the case with let and const.
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
- We can also declare a variable without any keyword (an implicit global), but this should be avoided. Unlike `var`, these are **not hoisted at all** — the property is only created on the global object when that line actually executes. Referencing it earlier throws a `ReferenceError`, not `undefined`.

## Object Property Access

```js
let obj = { name: "Rounak", "age": 18 };
```

- Quoting a key in an object literal (`"age": 18`) doesn't change anything — it becomes the exact same string key as an unquoted one. So both `obj.name` and `obj.age` are valid dot-notation access here; there's no restriction to work around.
- Numeric property names are also allowed, e.g. `{13: "Thirteen"}` is valid (the number is coerced to the string key `"13"`).
- Bracket notation (`obj["age"]`) is still needed when the key is dynamic (stored in a variable) or isn't a valid identifier (e.g. contains spaces or starts with a digit, like `"1st place"`).

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
- `reduce()` syntax: `arr.reduce((init, x) => init + x, 2);`
  - Careful with brace syntax: `(init, x) => { init + x }` does **not** work as expected — using `{}` as the arrow function body requires an explicit `return`, otherwise the callback returns `undefined` on every iteration. Either drop the braces (`=> init + x`) or write `=> { return init + x; }`.

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

To restore context, we use three object methods: `call()`, `apply()`, and `bind()` — but they behave differently, and it's important not to treat them as interchangeable:

- **`call()`** and **`apply()`** invoke the function **immediately** and return whatever the function returns (not a new function).
- **`bind()`** does **not** invoke the function — it returns a new function with `this` permanently bound, which you then call separately (hence the extra `()` at the end).

```js
let result1 = obj.func.apply(<context_obj>);   // calls obj.func right away, result1 = return value
let result2 = obj.func.call(<context_obj>);    // calls obj.func right away, result2 = return value
let func_new = obj.func.bind(<context_obj>);   // does NOT call obj.func — returns a bound function
func_new();                                     // this actually calls it
```

**With arguments** — `apply()` takes arguments as an array, while `call()` and `bind()` take them individually:

```js
obj.func.apply(<context_obj>, ["argument1", "argument2"]);       // runs immediately
obj.func.call(<context_obj>, "argument1", "argument2");          // runs immediately
let func_new = obj.func.bind(<context_obj>, "argument1", "argument2");
func_new(); // runs now
```

### Arrow Functions and `this`

For arrow functions, the behavior is completely different. If we access `this.something` inside an arrow function, it does **not** refer to the current object. Instead, it accesses the **global `this`** and searches for the variable there — this may return `undefined` even if the property exists in the current object.

However, at the top level of a classic (non-module, non-strict-mode) script, a variable declared with `var` becomes a property of the global object (e.g. `window` in browsers), so it can be accessed via `this.varName` there. This does **not** hold in general — it doesn't apply inside functions, in ES modules, or in strict mode. `let` and `const` never attach to the global object regardless of scope, so `this.varName` won't find them even at the top level.

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

