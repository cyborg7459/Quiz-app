import React from 'react';
import QuizCard from './components/quiz-card/quiz-card';
const axios = require('axios');

class App extends React.Component {
  state = {
    countries : [],
    lives : 3
  }
  componentDidMount() {
    axios.get('https://restcountries.eu/rest/v2/all?fields=name;capital;flag')
    .then(res => {
      this.setState({
        countries: res.data
      })
    });
  }
  render() {
    return (
      <div className='main'>
        <QuizCard lives={this.state.lives} />
      </div>
    )
  }
}

export default App;
