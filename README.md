# typing effect

`typing-effect` creates a typing effect for one or multiple elements.
Other libraries usually append character by character, which causes other elements on the page to jump around, most of the times when the animated text becomes multiline. This library avoids that by keeping the text in the DOM, wrapping every character and hiding it.
That way you can also center the text and every character will already be at its final position in the viewport.
When the animation is done, everything will be resetted and the wrappers are removed.

## Demo

[https://mgrsskls.github.io/typing-effect](https://mgrsskls.github.io/typing-effect)

## Installation

`npm install typing-effect`
or
add [https://mgrsskls.github.io/typing-effect/typing-effect.js](https://mgrsskls.github.io/typing-effect/typing-effect.js) to your project if you don't want to use the ES6 module.

## Options

```js
{
  speed: 30,  // the typing speed
  delay: 300, // the delay between two animated elements,
  reset: true // defines if the animated text gets replaced with the original text when the animation is done
}
```

## Usage

Include `index.css` from this library into your project or add the following CSS

```css
[data-typing-effect] {
  visibility: hidden;
}
```

and add the `data-typing-effect` attribute to the elements you want to animate.

`typing-effect` would still work without, but you might be able to see the animated text for a small moment before the animation starts.

```js
import typingEffect from "typing-effect"; // when not using https://mgrsskls.github.io/typing-effect/typing-effect.js

// a single element
typingEffect(document.querySelector("[data-typing-effect]"));

// multiple elements
typingEffect(Array.from(document.querySelectorAll("[data-typing-effect]")));

// passing options
typingEffect(
  Array.from(document.querySelectorAll("[data-typing-effect]"), {
    speed: 50,
    delay: 50,
    reset: false
  })
);

// doing something when the animation is done:
typingEffect(
  Array.from(document.querySelectorAll("[data-typing-effect]"))
).then(() => doSomething());
```

_**NOTE**_: If the text moves a bit when the animation is done, you can use `{ reset: false }`.
