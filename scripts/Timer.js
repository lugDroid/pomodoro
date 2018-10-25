/*
  Timer Class
  
  a timer consists of the countdown logic and 
  the items to display it and if in pomodoro or rest
*/

class Timer {
	constructor(_cycle, _element) {
		this.cycle = _cycle;
		this.running = false;
		this.elements = _element.children;

		this.countdown = this.elements.items(0);
		this.title = this.elements.items(1);
	}

	start(_pomPreset, _restPreset) {
		this.pomTime = _pomPreset;
		this.restTime = _restPreset;
		this.value = this.pomTime;
		this.running = true;
		this.pomRunning = true;
		this.interval = setInterval(update.bind(this), this.cycle);
	}

	stop() {
		clearInterval(this.interval);
		this.running = false;
	}

	update() {
		if (this.running && !this.isFinished()) {
			this.value = this.value - this.cycle;
			this.countdown.innerHTML = this.getMinutes() + ':' + this.getSeconds();
		} else if (this.isFinished() && this.pomRunning) {
			this.value = this.restTime;
			this.pomRunning = false;
			this.restRunning = true;
			this.title.innerHTML = 'REST';
		} else if (this.isFinished() && this.restRunning) {
			this.value = this.pomTime;
			this.pomRunning = true;
			this.restRunning = false;
			this.title.innerHTML = 'POMODORO';
		}
	}

	isFinished() {
		if (this.value == 0 && this.running) {
			return true;
		} else {
			return false;
		}
	}

	isRunning() {
		return running;
	}

	getMinutes() {
		return pad(Math.trunc(value / 60000), 2);
	}

	getSeconds() {
		return pad(value % 60000 / 1000, 2);
	}
	
	pad(num, length) {
		let str = num + '';
		while (str.length < length) {
			str = '0' + str;
		}

		return str;
	}

	updateValue(newValue) {
		this.value = newValue * 60000;
		this.countdown.innerHTML = this.getMinutes() + ':' + this.getSeconds();
	}
}