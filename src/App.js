import React, { useState } from 'react';
import './App.css';

const api = {
   key: "326521d8a52bb1882cd47bd2dfa1c7a9",
   base: "https://api.openweathermap.org/data/2.5/"
}

function App() {

   const [query, setQuery] = useState('')
   const [weather, setWeather] = useState({})

   const search = (evt) => {
      if (evt.key === "Enter") {
         fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
            .then(res => {
               if (!res.ok) {
                  alert(`Không tìm thấy ${query}`)
                  setQuery('')
                  throw Error(res.statusText);
               }
               return res.json() //res.json() tra ve 1 promise
            })
            .then(result => {
               setWeather(result)
               setQuery('')
               console.log(result)
            })
            .catch(err => console.log(err))
      }
   }

   const dateBuilder = (d) => {
      let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
      let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

      let day = days[d.getDay()];
      let date = d.getDate();
      let month = months[d.getMonth()];
      let year = d.getFullYear();
      return `${day} ${date} ${month} ${year}`
   }

   return (
      <div className={(typeof weather.main !== 'undefined'
         ? ((weather.main.temp > 16)
            ? 'app warm' : 'app')
         : 'app')}>
         <main>
            <div className="search-box">
               <input
                  type="text"
                  className="search-bar"
                  placeholder="Search..."
                  onChange={(e) => setQuery(e.target.value)}
                  value={query}
                  onKeyUp={search}
               />
            </div>
            {(typeof weather.main !== 'undefined') ? (
               <div>
                  <div className="location-box">
                     <div className="location">
                        {weather.name}, {weather.sys.country}
                     </div>
                     <div className="date">
                        {dateBuilder(new Date())}
                     </div>
                  </div>
                  <div className="weather-box">
                     <div className="temp">
                           {Math.round(weather.main.temp)} °C
                     </div>
                     <div className="weather">
                        {weather.weather[0].main}
                        <br/>
                        <p className="description">"{weather.weather[0].description}"</p>                     
                     </div>
                  </div>
               </div>
            ) : ('')}

         </main>
      </div>
   );
}

export default App;
