/**
 * @author Travis Colbert trav.colbert@gmail.com
 */

"use strict";

var Laminar = Laminar || {};


/* General Idea: An object that simulates a typing effect.
 * In the constructor give:
 * - the element that will contain the typed text
 * - the text to type
 * - the time between typed keys
 * ... maybe other stuff like frequency of errors (mistypes)
 */

Laminar.Typer = (function() {
  function Typer(domElementSelector,typedText,time,errorFreq) {
    var element = document.querySelector(domElementSelector);
    element.style.border = "1px solid red";
    var text = typedText || "This is Laminar.Typer.";
    var count = 0;
    time = time || 200;

    var timer = setInterval(function() {
      var that = this;
      if(count<text.length) {
        element.insertAdjacentHTML('beforeend',text[count++]);
      } else {
        clearInterval(timer);
      }
    },time);
  }
  return Typer;
})();
