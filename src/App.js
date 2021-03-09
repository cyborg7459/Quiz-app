import React from 'react';
import QuizCard from './components/quiz-card/quiz-card';
const axios = require('axios');

class App extends React.Component {
  state = {
    countries : [],
    lives : 3,
    questions : [],
    currentQuestion: {},
    currentQuestionNumber : 0,
    score : 0,
    phase : 1
  }

  componentDidMount() {
    axios.get('https://obscure-mesa-98003.herokuapp.com/https://restcountries.eu/rest/v2/all?fields=name;capital;flag')
    .then(res => {
      this.setState({
        countries: res.data
      },
      () => {
        this.initializeQuestions();
      });
    });
  }

  shuffle = (arr) => {
    const len = arr.length;
    for(var i=0; i<len; i++) {
      const idx = Math.floor(Math.random() * len);
      let temp = arr[idx];
      arr[idx] = arr[i];
      arr[i] = temp;
    }
  }

  initializeQuestions = () => {
    let questions = [], selectedCountries = [];
    while(questions.length < 5) {
      let idx = Math.floor((Math.random()*this.state.countries.length));
      if(!selectedCountries.find(el => el === idx)) {
        selectedCountries.push(idx);
        const country = this.state.countries[idx];
        let options = [];
        options.push(country.name);
        let temp = idx;
        for(let i=0; i<3; i++) {
            temp+=60;
            temp%=250;
            let option = this.state.countries[temp].name;
            options.push(option);
        }
        this.shuffle(options);
        const question = {
          questionStatement : `${country.capital} is the capital of`, 
          correctAnswer : country.name, 
          options
        }
        questions.push(question);
      }
    }
    while(questions.length < 10) {
      let idx = Math.floor((Math.random()*this.state.countries.length));
      if(!selectedCountries.find(el => el === idx)) {
        selectedCountries.push(idx);
        const country = this.state.countries[idx];
        const correctAnswer = country.name;
        let options = [];
        options.push(correctAnswer);
        let temp = idx;
        for(let i=0; i<3; i++) {
            temp+=60;
            temp%=250;
            let option = this.state.countries[temp].name;
            options.push(option);
        }
        this.shuffle(options);
        const question = {
          questionStatement : 'The shown flag belongs to', 
          flag : country.flag,
          correctAnswer, 
          options
        }
        questions.push(question);
      }
    }
    this.shuffle(questions);
    this.setState({
      questions : questions, 
      currentQuestion : questions[0]
    });
  }

  startQuiz = () => {
    this.setState({
      init : 0, 
      currentQuestionNumber: 0,
      score: 0,
      currentQuestion: this.state.questions[this.state.currentQuestionNumber],
      phase : 2
    })
  }

  correct = () => {
    let newScore = this.state.score + 1;
    let newQuestionNumber = this.state.currentQuestionNumber + 1;
    console.log(newScore, newQuestionNumber);
    this.setState({
      score: newScore,
      currentQuestionNumber: newQuestionNumber
    })
  }

  incorrect = () => {
    this.setState({
      lives: this.state.lives - 1.0,
      currentQuestionNumber: this.state.currentQuestionNumber + 1.0
    })
  }

  proceed = () => {
    this.setState({
      currentQuestion: this.state.questions[this.state.currentQuestionNumber]
    })
  }

  render() {
    return (
      <div className='main'>
       <h1>Hello World</h1>
      </div>
    )
  }
}

export default App;
