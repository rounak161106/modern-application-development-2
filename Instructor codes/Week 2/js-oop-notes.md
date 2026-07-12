# Object Oriented Programming (OOP) in JavaScript

## Introduction

Object-Oriented Programming (OOP) is a programming paradigm where code
is organized using objects.\
Objects contain:

-   Properties → Data
-   Methods → Behavior

Example:

``` js
let student = {
    name: "Adarsh",
    age: 21,
    greet() {
        console.log("Hello, my name is " + this.name);
    }
};

student.greet();
```

------------------------------------------------------------------------

# 1. Classes and Objects

## Class

A class is a blueprint used to create objects.

``` js
class Student {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }

    greet() {
        console.log("Hello, my name is " + this.name);
    }
}
```

## Object

An object is an instance of a class.

``` js
let s1 = new Student("Adarsh", 21);
s1.greet();
```

------------------------------------------------------------------------

# 2. Constructor

Constructor is a special method used to initialize object properties.

``` js
class Car {
    constructor(brand, year) {
        this.brand = brand;
        this.year = year;
    }
}

let car1 = new Car("Toyota", 2022);
console.log(car1.brand);
```

------------------------------------------------------------------------

# 3. Class Methods

Methods are functions defined inside the class.

``` js
class Calculator {

    add(a, b) {
        return a + b;
    }

    multiply(a, b) {
        return a * b;
    }
}

let calc = new Calculator();
console.log(calc.add(2,3));
```

------------------------------------------------------------------------

# 4. Getter and Setter

Used to control access to properties.

``` js
class Student {

    constructor(name) {
        this._name = name;
    }

    get name() {
        return this._name;
    }

    set name(value) {
        this._name = value;
    }
}

let s = new Student("Adarsh");
console.log(s.name);

s.name = "Rahul";
console.log(s.name);
```

------------------------------------------------------------------------

# 5. Static Methods

Static methods belong to the class, not the object.

``` js
class MathUtils {

    static add(a, b) {
        return a + b;
    }
}

console.log(MathUtils.add(5,3));
```

------------------------------------------------------------------------

# 6. Inheritance

Inheritance allows one class to use another class properties and
methods.

``` js
class Animal {

    constructor(name) {
        this.name = name;
    }

    speak() {
        console.log(this.name + " makes sound");
    }
}

class Dog extends Animal {

}

let d = new Dog("Tommy");
d.speak();
```

------------------------------------------------------------------------

# 7. Super Keyword

Used to call parent constructor.

``` js
class Animal {

    constructor(name) {
        this.name = name;
    }
}

class Dog extends Animal {

    constructor(name, breed) {
        super(name);
        this.breed = breed;
    }
}

let d = new Dog("Tommy", "Labrador");
console.log(d.name);
```

------------------------------------------------------------------------

# 8. Complete Example

``` js
class Person {

    constructor(name) {
        this._name = name;
    }

    get name() {
        return this._name;
    }

    set name(value) {
        this._name = value;
    }

    greet() {
        console.log("Hello " + this._name);
    }

    static info() {
        console.log("Person class");
    }
}

class Student extends Person {

    constructor(name, marks) {
        super(name);
        this.marks = marks;
    }

    greet() {
        super.greet();
        console.log("Marks: " + this.marks);
    }
}

let s1 = new Student("Adarsh", 95);
s1.greet();
Person.info();
```

------------------------------------------------------------------------

# Summary

  Concept       Description
  ------------- -----------------------
  Class         Blueprint
  Object        Instance
  Constructor   Initializes object
  Method        Function inside class
  Getter        Get value
  Setter        Set value
  Static        Belongs to class
  Inheritance   Extending class
  Super         Access parent
