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
 * 
 * Use CSS on .laminarCursor to style the cursor.
 * This makes a decent blinking cursor:
 * 
 			.laminarCursor {
				animation-name: blink;
				animation-duration: 0.5s;
				animation-iteration-count: infinite;
			}
			@keyframes blink {
				0% {
					opacity: 0
				}
				60% {
					opacity: 0;
				}
				85% {
					opacity: 1;
				}
				100% {
					opacity: .25;
				}
			}
 * 
 * Style to taste.
 */

Laminar.Typer = (function() {
  function Typer(domElementSelector,text,time,cursor,errorFreq) {
    if(domElementSelector===undefined || domElementSelector===null || domElementSelector==="") return false;
    this.setTime(time);
    this.setCursor(cursor);
    this.element = this.setTextField(document.querySelector(domElementSelector));
    this.setText(text);
  }
  Typer.prototype.setTime = function(time) {
    this.time = time || 150;
    return this;
  }
  Typer.prototype.setCursor = function(char) {
    this.cursor = char || "&#9610;";
    return this;
  }
  Typer.prototype.setText = function(text) {
    this.text = text || "This is Laminar.Typer!";
    this.count=0;
    return this;
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
    return this;
  }
  Typer.prototype.stop = function() {
    document
    clearInterval(this.timer);
    return this;
  }
  return Typer;
})();
