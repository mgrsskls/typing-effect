# typing effect

`typing-effect` creates a typing effect for one or multiple elements.
Other libraries usually append character by character, which causes other elements on the page to jump around, most of the times when the animated text becomes multiline. This library avoids that by keeping the text in the DOM, wrapping every character and hiding it.
That way you can also center the text and every character will already be at its final position in the viewport.
When the animation is done, everything will be resetted and the wrappers are removed.

## Installation

`npm install typing-effect` or `yarn install typing-effect`

## Options

```js
{
  speed: 30,  // the typing speed
  delay: 300, // the delay between two animated elements,
  reset: true // defines if the animated text gets replaced with the original text when the animation is done
}
```

## Usage

Include `index.css` from this library into your project or add the following CSS:

```css
[data-typing-effect] {
  visibility: hidden;
}
```

`typing-effect` would still work without, but you might be able to see the animated text for a small moment before the animation starts.

```js
import type from "typing-effect";

// a single element
type(document.querySelector(".myElement"));

// multiple elements
type(Array.from(document.querySelectorAll(".myElements")));

// passing options
type(
  Array.from(document.querySelectorAll(".myElements"), {
    speed: 50,
    delay: 50,
    reset: false
  })
);

// doing something when the animation is done:
type(
  Array.from(document.querySelectorAll(".myElements")).then(() => doSomething())
);
```

_**NOTE**_: If the text moves a bit when the animation is done, you can use `{ reset: false }`.
