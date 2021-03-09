import React from 'react';
import './quiz-card-styles.scss';
import globe from '../../gallery/globe.svg';
import winners from '../../gallery/winners.svg';

class QuizCard extends React.Component {
    
    checkAnswer = (e) => {
        if(this.props.isAnswered) return;
        this.props.answered();
        const chosen = e.currentTarget.firstChild.nextSibling.innerText;
        if(chosen === this.props.question.correctAnswer)
            this.correctAnswer(e.currentTarget);
        else 
            this.incorrectAnswer(e.currentTarget);
    }

    correctAnswer = (element) => {
        element.style.backgroundColor = "#269131";
        element.style.color = "#fff";
        element.style.border = "none";
        this.props.correct();
        this.disableOptions();
    }

    incorrectAnswer = (element) => {
        document.querySelectorAll('.option-value').forEach(el => {
            const parent = el.parentElement;
            if(el.innerHTML === this.props.question.correctAnswer) {
                parent.style.backgroundColor = "#269131";
                parent.style.color = "#fff";
                parent.style.border = "none";
            }
        });
        element.style.backgroundColor = "#d44626";
        element.style.color = "#fff";
        element.style.border = "none";
        this.props.incorrect();
        this.disableOptions();
    }

    disableOptions = () => {
        document.querySelectorAll('.option').forEach(el => {
            el.disabled = true;
            el.classList.remove('changing');
            el.classList.add('disabled');
        })
    }

    enableOptions = () => {
        document.querySelectorAll('.option').forEach(el => {
            el.disabled = false;
            el.classList.remove('disabled');
            el.classList.add('changing');
            el.style.backgroundColor = "white";
            el.style.color = "#6f81bd";
            el.style.border = "1px solid #6f81bd";
            el.addEventListener('click', (e) => {
                this.checkAnswer(e);
            })
        })
    }

    proceed = () => {
        this.props.next();
        this.enableOptions();
    }

    render() {
        if(this.props.phase === 0) {
            return (
                <div className="quiz-card-container">
                    <h1 className='mb-5 text-left'>COUNTRY QUIZ</h1>
                    <div className="quiz-card">
                        <img className='globe' src={globe} alt="globe"/>
                        <h1 className='text-center' id='start' onClick = {() => {
                            this.props.startQuiz();
                        }}>Start Quiz</h1>
                    </div>
                </div>
            )
        }
        else if(this.props.phase === 1) {
            return (
                <div className="quiz-card-container">
                    <h1 className='mb-5'>COUNTRY QUIZ</h1>
                    <div className="quiz-card">
                        <img className='globe' src={globe} alt="globe"/>
                        {this.props.question.hasFlag ? (
                            <img className='flag' src={this.props.question.flag} alt='flag'></img>
                        ) : null}
                        <h2 className='mb-2'>{this.props.question.statement}</h2>
                        {
                            this.props.question.options.map((option, idx) => {
                                return (
                                    <button onClick = {e => this.checkAnswer(e)} className='my-2 option changing btn-block text-left' key={`option-${idx}`}>
                                        <span>{idx+1}</span>
                                        <span className='option-value'>{option}</span>
                                    </button>
                                )
                            })
                        }
                        <button disabled={this.props.isButtonDisabled} onClick={() => {this.proceed()}} id='next-btn'> {this.props.buttonMessage} </button>
                        <div className="text-right w-100 lives-remaining pr-3 mt-2">
                            Lives remaining : {this.props.lives}   
                        </div>
                        <div className="score-display w-100 text-right pr-3 mt-2">
                            Current score : {this.props.score}
                        </div>
                    </div>
                </div>
            )
        }
        else {
            return (
                <div className="quiz-card-container">
                    <div className="quiz-card">
                        <img className='globe' src={globe} alt="globe"/>
                        <img className='mt-5 mb-2 winner' src={winners} alt="winners"/>
                        <h1 className='text-center my-0' id='score' onClick = {() => {
                            this.props.startQuiz();
                        }}><h1 className='mb-0'>Your score</h1>{this.props.score}</h1>
                        <button onClick={() => {
                            this.props.startQuiz();
                        }} className='my-4' id='new-quiz'>New quiz</button>
                    </div>
                </div>
            )
        }
    }
}

export default QuizCard;