import React from 'react';
import './quiz-card-styles.scss';

class QuizCard extends React.Component {

    state = {
        lives: []
    }

    componentDidMount() {
        let livesArr = [];
        for(var i=0; i<this.props.lives; i++) {
            livesArr.push(i);
        }
        this.setState({
            lives : livesArr, 
        })
    }

    render() {
        return (
            <div className="quiz-card-container">
                <h1 className='mb-5'>COUNTRY QUIZ</h1>
                <div className="quiz-card">
                    <img className='globe' src='https://www.flaticon.com/premium-icon/icons/svg/587/587874.svg' alt="globe"/>
                    <h2>Kuala Lumpur is the capital of</h2>
                    <div className="option">
                        <span className='option-value'>A</span>
                        Vietnam
                    </div>
                    <div className="option">
                        <span className='option-value'>A</span>
                        Vietnam
                    </div>
                    <div className="option">
                        <span className='option-value'>A</span>
                        Vietnam
                    </div>
                    <div className="option">
                        <span className='option-value'>A</span>
                        Vietnam
                    </div>
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

export default QuizCard;