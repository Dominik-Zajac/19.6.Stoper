'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Stopwatch = function () {
	function Stopwatch(display) {
		_classCallCheck(this, Stopwatch);

		this.running = false;
		this.display = display;
		this.reset();
		this.print(this.times);
	}

	_createClass(Stopwatch, [{
		key: 'reset',
		value: function reset() {
			this.times = {
				minutes: 0,
				seconds: 0,
				miliseconds: 0
			};
		}
	}, {
		key: 'print',
		value: function print() {
			return this.display.innerText = this.format(this.times);
		}
	}, {
		key: 'format',
		value: function format(times) {
			return pad0(times.minutes) + ':' + pad0(times.seconds) + ':' + pad0(Math.floor(times.miliseconds));
		}
	}, {
		key: 'clix',
		value: function clix() {
			if (!this.running) {
				this.start();
				startButton.textContent = 'Stop';
			} else {
				this.stop();
				startButton.textContent = 'Start';
			}
		}
	}, {
		key: 'start',
		value: function start() {
			var _this = this;

			this.running = true;
			this.watch = setInterval(function () {
				return _this.step();
			}, 10);
		}
	}, {
		key: 'stop',
		value: function stop() {
			this.running = false;
			clearInterval(this.watch);
		}
	}, {
		key: 'step',
		value: function step() {
			if (!this.running) return;
			this.calculate();
			this.print();
		}
	}, {
		key: 'calculate',
		value: function calculate() {
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
	}, {
		key: 'resetTimer',
		value: function resetTimer() {
			this.reset();
			this.print();
		}
	}, {
		key: 'addScore',
		value: function addScore() {
			addScoreList();
		}
	}]);

	return Stopwatch;
}();

;

var stopwatch = new Stopwatch(document.querySelector('.stopwatch'));

var resultsList = document.querySelector('#results');

var addScoreList = function addScoreList() {
	var score = document.querySelector('.stopwatch');
	var scoreText = score.innerText;
	var list = document.createElement('li');
	list.innerHTML = scoreText;
	resultsList.appendChild(list);
	resetResult.textContent = 'Reset list';
};

var resetList = function resetList() {
	resultsList.innerHTML = '';
	resetResult.textContent = '';
};

function pad0(value) {
	var result = value.toString();
	if (result.length < 2) {
		result = '0' + result;
	}
	return result;
}

var startButton = document.querySelector('#start');
startButton.addEventListener('click', function () {
	return stopwatch.clix();
});

var resetButton = document.querySelector('#reset');
resetButton.addEventListener('click', function () {
	return stopwatch.resetTimer();
});

var scoreButton = document.querySelector('#score');
scoreButton.addEventListener('click', function () {
	return stopwatch.addScore();
});

var resetResult = document.querySelector('#reset-list');
resetResult.addEventListener('click', function () {
	return resetList();
});
