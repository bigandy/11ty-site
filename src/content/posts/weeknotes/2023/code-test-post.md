---
title: 'Testing out Syntax Highlighter in Post'
subTitle: ''
date: 2023-04-12
publishDate: 'April 12 2023'
draft: true
description: ''
tags:
---

## CSS

```css
.example-block {
	display: grid;
}
```

## HTML

```html
<div class="example-block">
	<sibling-count>
		<ul>
			<li></li>
			<li></li>
			<li></li>
		</ul>
	</sibling-count>
</div>
```

## JavaScript

```js
class SiblingCount extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
		this.shadowRoot.innerHTML = `
	<slot></slot>
	`;
	}

	connectedCallback() {
		const shadow = this.shadowRoot;
		const slot = shadow.querySelector('slot');
		const parent = slot.assignedNodes()[1];

		const siblingCount = parent.childElementCount;
		parent.style.setProperty('--sibling-count', siblingCount);

		const siblings = parent.children;
		// Loop through all the children and add the custom property sibling-index to each.
		[...siblings].forEach((sibling, index) => {
			sibling.style.setProperty('--sibling-index', index + 1);
		});
	}
}

customElements.define('sibling-count', SiblingCount);
```
