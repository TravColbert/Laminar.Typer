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
  function Typer(domElementSelector,text,time,errorFreq,cursor) {
    if(domElementSelector===undefined || domElementSelector===null || domElementSelector==="") return false;
    this.time = time || 200;
    this.cursor = cursor || "&#9610;";
    this.setCssStyle();
    this.element = this.setTextField(document.querySelector(domElementSelector));
    this.setText(text);
  }
  Typer.prototype.setText = function(text) {
    this.text = text || "This is Laminar.Typer!";
    this.count=0;
    return true;
  }
  Typer.prototype.setTextField = function(element) {
    var textFields = element.querySelectorAll(".laminarTyper");
    if(textFields.length==0) {
      element.insertAdjacentHTML('beforeend',"<span class=\"laminarTyper\"></span><span class=\"laminarCursor\">" + this.cursor + "</span>");
    }
    return element.querySelector(".laminarTyper");
  }
  Typer.prototype.type = function(text) {
    var that = this;
    if(text!==null && text!==undefined && text.length>0) this.setText(text);

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
    document
    clearInterval(this.timer);
  }
  return Typer;
})();
