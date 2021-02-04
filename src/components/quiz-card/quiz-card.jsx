import React from 'react';
import './quiz-card-styles.scss';
import globe from '../../gallery/globe.svg'

class QuizCard extends React.Component {

    state = {
        lives: [],
        phase: 1
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

        
    }

    // initializeOptions = () => {
    //     setInterval(() => {
    //         document.querySelectorAll('.option').forEach(option => {
    //             option.addEventListener('click', () => {
    //                 if(option.attributes.value.value === this.props.question.correctAnswer) {
    //                     option.style.backgroundColor = '#29ff49';
    //                     option.style.border = 'none';
    //                     option.style.color = 'white';
    //                     this.props.correct();
    //                 }
    //                 else {
    //                     option.style.backgroundColor = '#f22424';
    //                     option.style.border = 'none';
    //                     option.style.color = 'white';
    //                     document.querySelectorAll('.option').forEach(option => {
    //                         if(option.attributes.value.value === this.props.question.correctAnswer) {
    //                             option.style.backgroundColor = '#29ff49';
    //                             option.style.border = 'none';
    //                             option.style.color = 'white';
    //                         }
    //                     });
    //                     // this.props.incorrect();
    //                 }

    //                 this.setState({
    //                     answered : 1
    //                 })
    //             })
    //         })
    //     }, 100);
    // }

    disableOptions = () => {
        document.querySelectorAll('.option').forEach(el => {
            el.addEventListener('click', e => {
                e.preventDefault();
            });
        })
    }

    checkAnswer = (el, option) => {
        this.disableOptions();
        this.setState({
            answered : 1
        })
        if(option === this.props.question.correctAnswer) {
            el.style.backgroundColor = '#29ff49';
            el.style.border = 'none';
            el.style.color = 'white';
            this.props.correct();
        }
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
                                    <div onClick = {e => {
                                            e.stopPropagation();
                                            this.checkAnswer(document.getElementById(`option${idx+1}`), option)
                                        }} 
                                        id = {`option${idx+1}`}
                                        key={idx} 
                                        value = {option} 
                                        className="option">
                                        <span>{idx+1}</span>
                                        <span className='text-center option-value'>{option}</span>
                                    </div>
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