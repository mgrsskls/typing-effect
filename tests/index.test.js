/* global describe, test, expect */

import type from "../index.js";

describe("typer", () => {
  const element1 = document.createElement("p");
  element1.innerHTML = "foo";

  describe("with one element", () => {
    test("resets the element to its original state when the animation is done", done => {
      const element1Clone = element1.cloneNode(true);
      document.body.innerHTML = "";
      document.body.appendChild(element1Clone);
      type(element1Clone, { speed: 0, delay: 0 }).then(() => {
        expect(document.body.innerHTML).toEqual("<p>foo</p>");
        done();
      });
    });
  });

  describe("with multiple elements", () => {
    test("resets the elements to its original states when the animations are done", done => {
      const element1Clone = element1.cloneNode(true);
      document.body.innerHTML = "";
      const element2 = document.createElement("p");
      element2.innerHTML = "bar";

      document.body.appendChild(element1Clone);
      document.body.appendChild(element2);

      type([element1, element2], { speed: 0, delay: 0 }).then(() => {
        expect(document.body.innerHTML).toEqual("<p>foo</p><p>bar</p>");
        done();
      });
    });
  });

  describe("with reset=false", () => {
    test("doesn't reset the animated elements to their original state when the animation is done", done => {
      const element1Clone = element1.cloneNode(true);
      document.body.innerHTML = "";
      document.body.appendChild(element1Clone);
      type(element1Clone, { speed: 0, delay: 0, reset: false }).then(() => {
        expect(document.body.innerHTML).toEqual(
          '<p aria-label="foo"><span aria-hidden="true">f</span><span aria-hidden="true">o</span><span aria-hidden="true">o</span></p>'
        );
        done();
      });
    });
  });

  describe("before being done", () => {
    test("it wraps the characters, adds aria-hidden to the wrappers and aria-label to the container", done => {
      const element1Clone = element1.cloneNode(true);
      document.body.innerHTML = "";
      document.body.appendChild(element1Clone);

      type(element1Clone, { speed: 0, delay: 0 }).then(() => {
        done();
      });

      expect(document.body.innerHTML).toEqual(
        '<p aria-label="foo"><span aria-hidden="true">f</span><span aria-hidden="true" style="visibility: hidden">o</span><span aria-hidden="true" style="visibility: hidden">o</span></p>'
      );
    });

    describe("with a tag", () => {
      test("it doesn't wrap the tag", done => {
        const element = document.createElement("p");
        element.innerHTML = "foo<b>bar</b>";
        document.body.innerHTML = "";
        document.body.appendChild(element);

        type(element, { speed: 0, delay: 0 }).then(() => {
          done();
        });

        expect(document.body.innerHTML).toEqual(
          '<p aria-label="foo<b>bar</b>"><span aria-hidden="true">f</span><span aria-hidden="true" style="visibility: hidden">o</span><span aria-hidden="true" style="visibility: hidden">o</span><b><span aria-hidden="true" style="visibility: hidden">b</span><span aria-hidden="true" style="visibility: hidden">a</span><span aria-hidden="true" style="visibility: hidden">r</span></b></p>'
        );
      });
    });
  });
});
