"use strict";
exports.__esModule = true;
var TypeWriter = /** @class */ (function () {
    function TypeWriter(selector, phrases, interval) {
        this.phrases = phrases;
        this.interval = interval;
        this.index = 0;
        this.reverse = false;
        this.text = "";
        this.run = true;
        var wrapper = document.querySelector(selector);
        if (!wrapper)
            throw Error("Element matching " + selector + " selector does not exist!");
        this.element = document.createElement("span");
        this.element.className = "TypeWriter__text";
        wrapper.appendChild(this.element);
        this.length = this.phrases.length;
        this.start();
    }
    TypeWriter.prototype.start = function () {
        this.run = true;
        this.tick();
    };
    TypeWriter.prototype.stop = function () {
        this.run = false;
    };
    TypeWriter.prototype.tick = function () {
        var index = this.index % this.length;
        var phrase = this.phrases[index];
        var tmp;
        if (this.reverse)
            this.text = phrase.substring(0, this.text.length - 1);
        else
            this.text = phrase.substring(0, this.text.length + 1);
        this.element.innerHTML = this.text;
        if (!this.reverse && this.text === phrase) {
            tmp = this.interval * 3.3;
            this.reverse = true;
        }
        else if (this.reverse && this.text === '') {
            this.reverse = false;
            this.index++;
            tmp = this.interval * 0.5;
        }
        else {
            tmp = this.interval;
        }
        this.run ? setTimeout(this.tick.bind(this), tmp) : null;
    };
    return TypeWriter;
}());
exports["default"] = TypeWriter;
