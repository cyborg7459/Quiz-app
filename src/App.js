import React from 'react';
import QuizCard from './components/quiz-card/quiz-card';
const axios = require('axios');

class App extends React.Component {
  state = {
    countries : [],
    lives : 3,
    questions : [],
    currentQuestion : 0,
    score : 0
  }

  componentDidMount() {
    axios.get('https://restcountries.eu/rest/v2/all?fields=name;capital;flag')
    .then(res => {
      this.setState({
        countries: res.data
      });
    }).then(() => {
      this.initializeQuestions();
    })
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
      questions
    });
    console.log(this.state.questions);
  }

  render() {
    return (
      <div className='main'>
        <QuizCard lives = {this.state.lives} question = {this.state.questions[this.state.currentQuestion]} />
      </div>
    )
  }
}

export default App;
