
/*jshint esversion: 6 */

/* 
  Preset Class

  a preset consists of a value to be used by the pomodoro timer
  and two buttons to increment and decrement that value  
*/

/* to be moved into main when finished */


class Preset {
  constructor(_value, _element) {
    this.value = _value;
    this.valueChangeSuscribers = [];
    this.MIN = 5;
    this.MAX = 55;
    this.CHANGE = 5;
    this.elements = _element.children;

    this.subBtn = this.elements.item(0);
    this.valueDisplay = this.elements.item(1);
    this.addBtn = this.elements.item(2);

    this.addBtn.addEventListener('click', this.increment.bind(this));
    this.subBtn.addEventListener('click', this.decrement.bind(this));

    this.update();
  }

  increment() {
    if (this.value < this.MAX) {
      this.value += this.CHANGE;
    }
    //this.valueChangeNotify();
    this.update();
  }

  decrement() {
    if (this.value > this.MIN) {
      this.value -= this.CHANGE;
    }
    //this.valueChangeNotify();
    this.update();
  }

  /* publish-subscribe */
  valueChangeNotify() {
    this.valueChangeSubscribers.forEach(function(f) {
      f(this.value);
    });
  }

  valueChangeSubscribe(subscriber) {
    this.valueChangeSubscribers.push(subscriber);
  }

  /* DOM functions */
  update() {
    this.valueDisplay.innerHTML = this.value;
  }
}