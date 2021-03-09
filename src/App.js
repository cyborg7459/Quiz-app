import React from 'react';
import QuizCard from './components/quiz-card/quiz-card';
const axios = require('axios');

class App extends React.Component {
  state = {
    questionsList : null,
    currentScore : 0,
    currentLives : 3,
    currentState : 0,
    currentQuestion : null,
    buttonMessage : "Next question",
    answered : false,
    btnDisabled : true
  }

  componentDidMount() {
    axios.get('https://obscure-mesa-98003.herokuapp.com/https://restcountries.eu/rest/v2/all?fields=name;capital;flag')
    .then(res => {
      this.setState({
        questionsList : res.data
      });
    });
  }

  startQuiz = () => {
    this.startGame();
    this.setState({
      currentState : 1
    })
  }

  startGame = () => {
    this.setState({
      currentScore : 0,
      currentLives : 3,
      currentState : 1
    });
    this.generateQuestion();
  }

  generateQuestion = () => {
    let question = {};
    const idx = Math.floor(Math.random()*250);
    const rand = Math.floor(Math.random()*100);
    const selectedCountry = this.state.questionsList[idx];
    if(rand%2 === 0) {
      question.hasFlag = true;
      question.statement = "Which country does this flag belong to?";
      question.flag = selectedCountry.flag;
    } else {
      question.hasFlag = false;
      question.statement = `${selectedCountry.capital} is the capital of?`;
    }
    question.correctAnswer = selectedCountry.name;
    question.options = this.generateOptions(selectedCountry.name);
    this.setState({
      currentQuestion : question
    })
  }

  generateOptions = (correctAnswer) => {
    let options = [];
    options.push(correctAnswer);
    while(options.length !== 4) {
      const idx = Math.floor(Math.random()*250);
      const opt = this.state.questionsList[idx].name;
      const x = options.find(el => el === opt);
      if(!x) {
        options.push(opt);
      }
    }
    return this.shuffleOptions(options);
  }

  shuffleOptions = (options) => {
    let count = 50;
    while(count--) {
      const idx1 = Math.floor(Math.random()*4);
      const idx2 = Math.floor(Math.random()*4);
      let temp = options[idx1];
      options[idx1] = options[idx2];
      options[idx2] = temp;
    }
    return options;
  }

  answered = () => {
    this.setState({
      answered : true,
      btnDisabled : false
    })
  }

  correct = () => {
    this.setState({
      currentScore : this.state.currentScore+1,
      answered : true
    })
  }

  incorrect = () => {
    this.setState({
      currentLives : this.state.currentLives-1,
      answered : true
    }, () => {
      if(this.state.currentLives === 0) {
        this.setState({
          buttonMessage : "See result"
        })
      }
    })
  }

  next = () => {
    if(this.state.currentLives > 0) {
      this.generateQuestion();
      this.setState({
        answered : false,
        btnDisabled : true
      })
    }
    else 
      this.setState({
        currentState : 2
      })
  }

  render() {
    return (
      <div className='main'>
        <QuizCard 
          question = {this.state.currentQuestion}
          phase = {this.state.currentState}
          lives = {this.state.currentLives}
          startQuiz = {this.startGame}
          score = {this.state.currentScore}
          correct = {this.correct}
          incorrect = {this.incorrect}
          buttonMessage = {this.state.buttonMessage}
          isAnswered = {this.state.answered}
          answered = {this.answered}
          next = {this.next}
          isButtonDisabled = {this.state.btnDisabled}
        ></QuizCard>
      </div>
    )
  }
}

export default App;
