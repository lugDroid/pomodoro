/*
  Timer Class
  
  a timer consists of the countdown logic and 
  the items to display it and if in pomodoro or rest
*/

class Timer {
	constructor(_cycle, _element) {
		this.cycle = _cycle;
		this.running = false;
		this.elements = _element.childre;

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
}