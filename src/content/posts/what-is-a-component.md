---
title: 'What is a component?'
description: 'I want to define what we will call a component. What it is and most importantly what it is not'
date: 2021-10-04
publishDate: 'Monday, October 4 2021'
author: 'Andrew'
draft: true
---

# What is a component?

I would define a component in its simplest words as a part of an application that can be re-used with different props apply different variations.

```javascript
// Definining the component

const Button = ({ text, handleClick }) => {
	return <button onClick={handleClick}>{text}</button>;
};

// Calling the component
<Button text="Click Me" handleClick={handleCTAClick} />;
```
