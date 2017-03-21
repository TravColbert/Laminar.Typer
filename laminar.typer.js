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
  function Typer(domElementSelector,text,time,errorFreq) {
    if(domElementSelector===undefined || domElementSelector===null || domElementSelector==="") return false;
    this.element = document.querySelector(domElementSelector);
    this.text = text || "This is Laminar.Typer!";
    this.count = 0;
    this.time = time || 200;
  }
  Typer.prototype.type = function(text) {
    if(text!==undefined && text.length>0) {
      this.text=text;
      this.count=0;
    }
    var that = this;
    this.timer = setInterval(function() {
      if(that.count<that.text.length) {
        that.element.insertAdjacentHTML('beforeend',that.text[that.count++]);
      } else {
        that.stop();
      }
    },this.time);
    return true;
  }
  Typer.prototype.stop = function() {
    clearInterval(this.timer);
  }
  return Typer;
})();
