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
  Typer.prototype.setCssStyle = function(rule) {
    for(var c=0;c<document.styleSheets.length;c++) {
      for(var rc=0;rc<document.styleSheets[c].rules.length;rc++) {
        console.log(document.styleSheets[c].rules[rc]);
      }
      document.styleSheets[c].insertRule(".laminarCursor {color: red}",0);
      // console.log(c + ": " + JSON.stringify(document.styleSheets[c]));
    }

    /*
    var s = document.createElement('style');
    s.setAttribute('type','text/css');
    if(s.styleSheet) {
      s.styleSheet.cssText = "color:red";
    } else {
      s.appendChild(document.createTextNode("color:red"));
    }
    */
    console.log("Ran");
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
