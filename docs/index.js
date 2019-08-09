import type from "../index.js";

document.addEventListener("DOMContentLoaded", () => {
  type(Array.from(document.querySelectorAll("[data-typing-effect]")), {
    speed: 20,
    delay: 200,
    reset: false
  }).then(() => document.querySelector("footer").removeAttribute("hidden"));
});
