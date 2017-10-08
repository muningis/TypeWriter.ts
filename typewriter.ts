export default class TypeWriter {
  private index: number = 0;
  private reverse: boolean = false;
  private text: string = "";
  private run: boolean = true;

  private element: HTMLSpanElement;
  private length: number;

  constructor(
    selector: string,
    private phrases: string[],
    private interval: number
  ) {
    let wrapper = document.querySelector(selector);
    if (!wrapper)
      throw Error(`Element matching ${selector} selector does not exist!`);

    this.element = document.createElement("span");
    this.element.className = "TypeWriter__text";
    wrapper.appendChild(this.element);

    this.length = this.phrases.length;

    this.start();
  }

  start() {
    this.run = true;
    this.tick();
  }

  stop() {
    this.run = false;
  }

  tick() {
    let index = this.index % this.length;
    let phrase = this.phrases[index];
    let tmp;

    if (this.reverse) this.text = phrase.substring(0, this.text.length - 1);
    else this.text = phrase.substring(0, this.text.length + 1);

    this.element.innerHTML = this.text;

    if (!this.reverse && this.text === phrase) {
      tmp = this.interval * 3.3;
      this.reverse = true;
    } else if (this.reverse && this.text === '') {
      this.reverse = false;
      this.index++;
      tmp = this.interval * 0.5;
    } else {
      tmp = this.interval;
    }
    this.run ? setTimeout(this.tick.bind(this), tmp) : null;
  }
}