import React from 'react';
import './quiz-card-styles.scss';
import globe from '../../gallery/globe.svg'

class QuizCard extends React.Component {

    state = {
        lives: [],
        phase: 1,
        selected: ''
    }

    componentDidMount() {
        let livesArr = [];
        for(var i=0; i<this.props.lives; i++) {
            livesArr.push(i);
        }
        this.setState({
            lives : livesArr,
            phase : this.props.phase
        })

        document.querySelectorAll('.option').forEach(el => {
            el.disabled = true;
        })
    }

    disableBtns = () => {
        document.querySelectorAll('button').forEach(btn => {
            btn.disabled = true;
        })
    }

    checkAnswer = (option) => {
        this.disableBtns();
        if(option === this.props.question.correctAnswer)
            this.props.correct();
        else
            alert('No');
    }

    render() {
        if(this.props.phase === 1) {
            return (
                <div className="quiz-card-container">
                    <h1 className='mb-5'>COUNTRY QUIZ</h1>
                    <div className="quiz-card">
                        <img className='globe' src={globe} alt="globe"/>
                        <h1 className='text-center' id='start' onClick = {() => {
                            this.props.startQuiz();
                        }}>Start Quiz</h1>
                    </div>
                </div>
            )
        }
        else if(this.props.phase === 2) {
            return (
                <div className="quiz-card-container">
                    <h1 className='mb-5'>COUNTRY QUIZ</h1>
                    <div className="quiz-card">
                        <img className='globe' src={globe} alt="globe"/>
                        {this.props.question.flag ? (
                            <img className='flag' src={this.props.question.flag} alt='flag'></img>
                        ) : null}
                        <h2>{this.props.question.questionStatement}</h2>
                        {
                            this.props.question.options.map((option, idx) => {
                                return (
                                    <button onClick={(e) => {
                                        e.stopPropagation();
                                        this.checkAnswer(option)
                                        }} className='option btn-block text-left'>
                                        <span>{idx+1}</span>
                                        <span className='option-value'>{option}</span>
                                    </button>
                                )
                            })
                        }
                        {
                            this.state.answered ? (
                                <button onClick = {() => {this.props.proceed()}} className='next-btn btn-block'>
                                    {this.props.btnMsg}
                                </button>
                            ) : null
                        }
                        <div className="lives-remaining">
                            Lives remaining : 
                            <div id="hearts"> 
                                {
                                    this.state.lives.map(num => {
                                        return (
                                            <img key={num} className='heart' src="https://www.flaticon.com/svg/vstatic/svg/1489/1489937.svg?token=exp=1612425025~hmac=56a0d7a1d4e264bb6d46dd7df944820b" alt="heart"/>
                                        )
                                    })
                                }
                            </div>   
                        </div>
                    </div>
                </div>
            )
        }
    }
}

export default QuizCard;