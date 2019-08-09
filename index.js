"use strict";

/*
 * Creates the actual typing effect and returns a promise.
 *
 * @param {node} element
 * @param {object} options
 * @returns {Promise}
 */
function type(element, options) {
  element.removeAttribute("data-typing-effect");
  element.removeAttribute("style");

  return new Promise(resolve => {
    (function type() {
      const el = element.querySelector("span[style]");

      if (el) {
        el.removeAttribute("style");

        setTimeout(type, options.speed);
      } else {
        if (options.reset) {
          reset(element);
        }

        resolve();
      }
    })();
  });
}

/*
 * Sets the innerHTML of the given element back to its original value
 * and removes the aria-label attribute afterwards.
 *
 * @param {node} element
 */
function reset(element) {
  element.innerHTML = element.getAttribute("aria-label");
  element.removeAttribute("aria-label");
}

/**
 * Wraps every character in every entry of the given elements array
 * in a span and hides it.
 *
 * @param {array} elements
 */
function prepareElements(elements) {
  elements.forEach(element => {
    let tagOpen = false;
    const text = element.innerHTML
      .trim()
      .replace(/\s{2,}/g, " ")
      .replace(/(\r\n|\n|\r)/gm, "");
    let html = "";

    if (!element.hasAttribute("data-typing-effect")) {
      element.style = "visibility: hidden;";
    }

    element.setAttribute("aria-label", text);

    for (let k = 0; k < text.length; k += 1) {
      if (text.charAt(k) === "<") tagOpen = true;

      if (tagOpen) {
        html += text.charAt(k);
      } else {
        html += `<span aria-hidden="true" style="visibility: hidden">${text.charAt(
          k
        )}</span>`;
      }

      if (text.charAt(k) === ">") tagOpen = false;
    }

    element.innerHTML = html;
  });
}

/**
 * @param {node or array} elements
 * @param {object} options
 */
export default function(
  elements,
  { speed = 30, delay = 300, reset = true } = {}
) {
  const options = {
    speed,
    delay,
    reset
  };
  let i = 0;

  if (!(elements instanceof Array)) {
    elements = [elements];
  }

  if (elements.length === 0) return;

  prepareElements(elements);

  return new Promise(resolve => {
    (function iterate(index) {
      type(elements[index], options).then(() => {
        i += 1;

        if (i < elements.length) {
          setTimeout(() => {
            iterate(i);
          }, options.delay);
        } else {
          resolve();
        }
      });
    })(i);
  });
}
