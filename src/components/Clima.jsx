import React, { useState, useEffect } from 'react';


function Clima() {
  const [clima, setClima] = useState(null);
  const [climaActual, setClimaActual]= useState(null)

  useEffect(() => {
    async function fetchData(){
        const response = await fetch('http://dataservice.accuweather.com/forecasts/v1/daily/1day/7249?apikey=zaK6x5EJ4e75t1Tv2ZnYZAOQzs3sOPoK&language=es-ar&details=true&metric=true')
        const clima = await response.json()
        const response2 = await fetch('http://dataservice.accuweather.com/currentconditions/v1/7249?apikey=zaK6x5EJ4e75t1Tv2ZnYZAOQzs3sOPoK&language=es-ar&details=true')
        const climaActual = await response2.json()
        setClima(clima)
        setClimaActual(climaActual)
      }
      
      fetchData()
    }, []);
    
  

  return (
    <div>
      {clima && climaActual ? (
        <div className='contClimaHoy'>
            <div className='climaActual'>
                <div className='climaActualIconTemp'>
                  <img src={climaActual[0].WeatherIcon+'.png'}  alt={climaActual[0].WeatherIcon} />
                  <h1>{climaActual[0].Temperature.Metric.Value+'C'}</h1>
                </div>
                <p>{climaActual[0].WeatherText}</p> 
            </div>
            <div className='climaActual'>
                <h2>Max: {clima.DailyForecasts[0].RealFeelTemperature.Minimum.Value.toFixed(0)}°C</h2>
                <h2>Min: {clima.DailyForecasts[0].RealFeelTemperature.Maximum.Value.toFixed(0)}°C</h2>
            </div>
        </div>
      ) : (
        <p></p>
      )}
    </div>
  );
}

export default Clima;
