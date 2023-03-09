---
title: 'What is the difference between var and let and const?'
date: 2023-02-10
draft: true
description: ''
tags: ['interview-questions']
---

In an interview that I had the other day I was asked this simple JS question that I have seen asked before but was not ready for it. So for my own benefit I am going to write what I should answer next time. I hope this will be useful to me and perhaps someone else.

## Var vs Let vs Const

They all be used to define variables in Javascript.
for example

```js
const name = 'andrew';
let surname = 'hudson';
var currentRole = 'senior software engineer';
```

## Re-declaring variables

it is possible to re-declare a variable if using either `var` or `let`. For example:

```js
var name = 'andrew';
var name = 'andy';

// or even
name = 'andré';
```

## Global Scope vs Local Scope

## Hoisting of var

If you use a variable before defining this this is ok with `var`.

```js
console.log(temperature);

var temperature = 5.0;
```

is interpretted as

```js
var temperature;
console.log(temperature); // temperature is undefined
var temperature = 5.0;
```

## re-declaring var in block scope

```js
var name = 'andrew';
var age = 30;

if (age < 50) {
	var name = 'andy';
}
console.log(name); // returns "andy" as age is less than 50.
```

## re-declaring let in block scope

```js
let name = 'andrew';
var age = 30;

if (age < 50) {
	let name = 'andy';
}
console.log(name); // returns "andrew" as name is a let defined variable and only applicable to that block. The other block, in this case the conditional block, has another block-scoped let name variable.
```

## let can be updated but not re-declared

```js
let name = 'andrew';
let name = 'andy'; // will throw an error
```

```js
let name = 'andrew';
name = 'andy'; // this is fine because you are updating the varible, not re-defining it.
```
