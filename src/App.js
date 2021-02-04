import React from 'react';
const axios = require('axios');

class App extends React.Component {
  state = {
    countries : []
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
        <h1> 
          {this.state.countries.length}
        </h1>
      </div>
    )
  }
}

export default App;
