/////////////////////////////////
// COUNTERS
/////////////////////////////////
const counter = {
  index: 0, 
  score: 0, 
  question: 1,
  indexUp: () => { counter.index += 1 }, 
  scoreUp: () => { counter.score += 1 }, 
  questionUp: () => { counter.question += 1 },
  randomResponse: () => { return Math.floor(Math.random() * responses.correct.length) }
};

/////////////////////////////////
// MODIFY ELEMENT VIEW
/////////////////////////////////
const view = {
	hide: element => {
		$(element).addClass('js-hidden');
	},
	show: element => {
		$(element).removeClass('js-hidden');
	}
};

/////////////////////////////////
// RENDER ELEMENT HTML
/////////////////////////////////
const render = {
	start: () => {
		$('#js-start-section').html(`
      <div class="container-box">
        <div class="row-box" id="js-start-content">
        	<section role="region" class="main-content">
	          <header>
	            <img src="img/rick-and-morty.jpg" alt="Rick and Morty" class="img-circle">
	            <h1>The Rick &amp; Morty Quiz</h1>
	          </header>
	          <p>
	            Are you a multi-dimensional, intergalactic baddass? Or just another useless Morty?
	            It's up to you to prove your worth in this universe. This quiz will help the Council of Ricks decide if you belong here.
	          </p>
          </section>
          <button class="btn btn-default start-button" id="js-start-button">Prove Your Worth</button>
        </div>
      </div>
		`);
	},
	question: () => {
		$('#js-question-section').html(`
			<div class="container-box">
				<div class="row-box" id="js-question-content">
					<img src="img/${quiz.questions[counter.index].img}" class="img-circle">
					<section role="region" class="main-content">
						<h1>${quiz.questions[counter.index].question}</h1>
					</section>
					<section>
						<ul>
							<li value="${quiz.questions[counter.index].a}">${quiz.questions[counter.index].a}</li>
							<li value="${quiz.questions[counter.index].b}">${quiz.questions[counter.index].b}</li>
							<li value="${quiz.questions[counter.index].c}">${quiz.questions[counter.index].c}</li>
							<li value="${quiz.questions[counter.index].d}">${quiz.questions[counter.index].d}</li>
						</ul>
					</section>
					<section class="question-score">
						<span class="question-number"><p>Question ${counter.question} of ${quiz.questions.length}</p><span>
						<span class="current-score"><p>Current Score: ${counter.score}</p><span>
					</section>
				</div>
			</div>
		`);
	},
	result: element => {
		$('#js-result-section').html(`
			<div class="container-box">
				<div class="row-box" id="js-result-content">
					<img src="img/${quiz.questions[counter.index].img2}" class="img-circle">
					<section role="region" class="main-content">
						<h1>${element}</h1>
						<h4>The correct answer is: ${quiz.questions[counter.index].answer}</h4>
						<p>${quiz.questions[counter.index].explanation}</p>
					</section>
					<button class="btn btn-default" id="js-next-button">Next Quesition</button>
					<button class="btn btn-default js-hidden" id="js-finish-button">Finish Quiz</button>
				</div>
			</div>
		`);
	},
	correct: () => {
		render.result(responses.correct[counter.randomResponse()]);
	},
	incorrect: () => {
		render.result(responses.incorrect[counter.randomResponse()]);
	},
	finish: () => {
		$('#js-finish-section').html(`
			<div class="container-box">
				<div class='row-box' id="js-finish-content">
				<img src="img/council-of-ricks.jpg" class="img-circle">
					<section role="region" class="main-content">
						<h1>It is known.</h1>
						<p>
							You got ${counter.score} out of ${quiz.questions.length} questions right, 
							not like it matters, because you'll never be a Rick.
							The council of Ricks do not approve you.
							It's time for you to die... *ahem* we mean try again.
						</p>
					</section>
					<button class="btn btn-default" id="js-restart">Try Again</button>
				</div>
			</div>
		`);
	}
};

/////////////////////////////////
// DISPLAY ELEMENT TO DOM
/////////////////////////////////
const display = {
	start: () => {
		render.start();
	},
	question: () => {
		render.question();
	},
	correct: () => {
		render.correct();
	},
	incorrect: () => {
		render.incorrect();
	},
	finish: () => {
		render.finish();
	}
};

/////////////////////////////////
// BUTTON CLICK ACTIONS
/////////////////////////////////
const click = {
	start: () => {
		$('#js-start-button').on('click', () => {
			view.hide('#js-start-section');
			view.show('#js-question-section');
			display.question();
		});
	},
	next: () => {
		$('#js-result-section').on('click', 'button', () => {
			counter.indexUp();
			counter.questionUp();
			render.question();
			display.question();
			view.hide('#js-result-section');
			view.show('#js-question-section');
		})
	},
	finish: () => {
		$('#js-finish-button').on('click', () => {
			view.hide('#js-result-section');
			view.show('#js-finish-section');
		});
	},
	restart: () => {
		$('#js-restart').on('click', () => {
			location.reload();
		});
	}
};

/////////////////////////////////
// USER INPUT: GET & REACT
/////////////////////////////////
const user = {
	input: () => {
		$('#js-question-section').on('click', 'li', event => {
			let input = $(event.target).attr('value');
			let count = quiz.questions.length - 1;

			view.hide('#js-question-section');
			view.show('#js-result-section');

			if (counter.index < count) {
				if (input === quiz.questions[counter.index].answer) {
					display.correct();
					counter.scoreUp();
				} else {
					display.incorrect();
				}
			} else if (counter.index === count) {
				if (input === quiz.questions[counter.index].answer) {
					display.correct();
					counter.scoreUp();
				} else {
					display.incorrect();
				}
				view.hide('#js-next-button');
				view.show('#js-finish-button');
				click.finish();
				display.finish();
				click.restart();
			}
		});
		click.next();
	},
};

/////////////////////////////////
// LAUNCH APP
/////////////////////////////////
const launch = {
	start: () => {
		display.start();
		click.start();
		display.question();
		user.input();
	},
};

$(() => {
	launch.start();
});