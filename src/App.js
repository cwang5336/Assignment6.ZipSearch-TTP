import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

class ZipInfo extends Component {
  constructor(props){
    super(props);
    this.state = {
      getSuccess: true,
      firstPage: true,
      zipCode: "Try 10016",
      data: [
            {
                LocationText: "CityName",

            }
        ]
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleClick() {
    this.setState ({
      firstPage : !this.state.firstPage,
    });
  }
  handleChange (event) {
    this.setState({
      zipCode: event.target.value
    });
  }
  fetchZipData(zipcode){
    axios.get("https://ctp-zip-api.herokuapp.com/zip/" + zipcode)
    .then(response => {
      var result = response.data.map(city => {
        return {
          LocationText: city.LocationText,

        };
      });
      this.setState({data:result, getSuccess:true});
    })
    .catch(err => {
      console.log(err);
      this.setState({getSuccess:false});
    });
  }

  render(){
    if (this.state.firstPage) {
      return (
        <div>
          <h1 className = "App-header">Zip Code Search </h1>
          <form className="inputter">
            <h2>Zip Code: 
            <input type='text' value = {this.state.zipCode} onChange={this.handleChange}/> </h2>
            <button className= "button" onClick={this.handleClick}>Submit</button>
          </form>
          
        </div>
      );
    } else {
      this.fetchZipData(this.state.zipCode);
      var cities = (<p className = "notfound" >Zip Code Not Found</p>);
      if(this.state.getSuccess){
        cities = this.state.data.map((city)=>
          <ParticularCity data={city}/>
        );
      }
      return(
        <div>
        <h1 className = "App-header">Zip Code Search</h1>
        <h2 className = "inputter">Zip Code: {this.state.zipCode}</h2>
        <div className = "cityList">{cities}</div>
        <button className= "button" onClick={this.handleClick}>Try Again</button>
        </div>
      )
      ;
    }
  }
}

class ParticularCity extends Component {
  render(){
    var {
        LocationText,

    } = this.props.data;
    return (
      <center>
        <h1>{LocationText}</h1>
      </center>
    );
  }
}

class App extends Component {
  render() {
    return (
      <div className="centered">
        <ZipInfo zipcode="10016"/>
      </div>
    );
  }
}

export default App;
