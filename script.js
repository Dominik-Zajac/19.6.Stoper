class Stopwatch {
	constructor(display) {
		this.running = false;
		this.display = display;
		this.reset();
		this.print(this.times);
	}

	reset() {
		this.times = {
			minutes: 0,
			seconds: 0,
			miliseconds: 0
		};
	}

	print() {
		return this.display.innerText = this.format(this.times);
	}

	format(times) {
		return `${pad0(times.minutes)}:${pad0(times.seconds)}:${pad0(Math.floor(times.miliseconds))}`;
	}

	clix() {
		if (!this.running) {
			this.start();		
			startButton.textContent = 'Stop';
		}
		else {
			this.stop();
			startButton.textContent = 'Start';
		}
	}

	start() {
		this.running = true;
		this.watch = setInterval(() => this.step(), 10);
	}


	stop() {
		this.running = false;
		clearInterval(this.watch);
	}

	step() {
		if (!this.running) return;
		this.calculate();
		this.print();
	}

	calculate() {
		this.times.miliseconds += 1;
		if (this.times.miliseconds >= 100) {
			this.times.seconds += 1;
			this.times.miliseconds = 0;
		}
		if (this.times.seconds >= 60) {
			this.times.minutes += 1;
			this.times.seconds = 0;
		}
	}

	resetTimer() {
		this.reset();
		this.print();
	}
	
	addScore() {
		addScoreList();
	}
};

let stopwatch = new Stopwatch(
	document.querySelector('.stopwatch'));

let resultsList = document.querySelector('#results');

const addScoreList = () => {
	const score = document.querySelector('.stopwatch');
	const scoreText = score.innerText;
	let list = document.createElement('li');
  	list.innerHTML = scoreText;
  	resultsList.appendChild(list);
	resetResult.textContent = 'Reset list';
}

const resetList = () => {
	resultsList.innerHTML = '';
	resetResult.textContent = '';
}

function pad0(value) {
	let result = value.toString();
	if (result.length < 2) {
		result = '0' + result;
	}
	return result;
}

let startButton = document.querySelector('#start');
startButton.addEventListener('click', () => stopwatch.clix());

let resetButton = document.querySelector('#reset');
resetButton.addEventListener('click', () => stopwatch.resetTimer());

let scoreButton = document.querySelector('#score');
scoreButton.addEventListener('click', () => stopwatch.addScore());

let resetResult = document.querySelector('#reset-list');
resetResult.addEventListener('click', () => resetList());