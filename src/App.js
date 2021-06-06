import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Weather from './Component/Weather.jsx';
import 'weather-icons/css/weather-icons.css';
import Form from './Component/Form.component';
//api call
const apikey = "6bc5e688a412942f53837f745aa76c6d"
class App extends React.Component {
  constructor() {
    super();
    this.state = {
      city: undefined,
      country: undefined,
      icon: undefined,
      main: undefined,
      celsius: undefined,
      tempmax: undefined,
      tempmin: undefined,
      des: "",
      error: false

    };

    this.weatherIcon = {
      Thunderstorm: "wi-thunderstorm",
      Drizzle: "wi-sleet",
      Rain: "wi-storm-showers",
      Snow: "wi-snow",
      Atmosphere: "wi-fog",
      Clear: "wi-day-sunny",
      Clouds: "wi-day-fog"
    };
  }
  cel(temp) {
    let cell = Math.floor(temp - 273.15);
    return cell;
  }
  geticon(icons, id) {
    switch (true) {
      case id >= 200 && id <= 232:
        this.setState({ icon: this.weatherIcon.Thunderstorm })
        break;
      case id >= 300 && id <= 331:
        this.setState({ icon: this.weatherIcon.Drizzle })
        break;
      case id >= 500 && id <= 531:
        this.setState({ icon: this.weatherIcon.Rain })
        break;
      case id >= 600 && id <= 622:
        this.setState({ icon: this.weatherIcon.Snow })
        break;

      case id >= 701 && id <= 781:
        this.setState({ icon: this.weatherIcon.Atmosphere })
        break
      case id === 800:
        this.setState({ icon: this.weatherIcon.Clear })
        break
      case id >= 801 && id <= 804:
        this.setState({ icon: this.weatherIcon.Clouds })
        break
      default:
        this.setState({ icon: this.weatherIcon.Clouds })



    }
  }


  getweather = async (e) => {
    if (e && e.preventDefault) { 
      e.preventDefault();
      e.persist();
    
    const city=e.target.elements.city.value;
    const country=e.target.elements.country.value;
    
if (city && country){
  const apicall = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${apikey}`);
  const response = await apicall.json();
  console.log(response);
  this.setState({
    city: `$(response.name),$(response.sys.country)`,
  
    celsius: this.cel(response.main.temp),
    tempmax: this.cel(response.main.temp_max),
    tempmin: this.cel(response.main.temp_min),
    des: response.weather[0].description,
    
    error:false
  });
  this.geticon(this.weatherIcon,response.weather[0].id)


}
else{
  this.setState({error:true})
}
  }};
  render() {
    return (
      <div className="App">
        <Form loadweather={this.getweather} error={this.state.error}/>
        <Weather city={this.state.city} country={this.state.country} celsius={this.state.celsius}
          tempmax={this.state.tempmax} tempmin={this.state.tempmin} des={this.state.des} weatherIcon={this.state.icon} />
      </div>
    );
  }
}





export default App;
