import React, { useState, useEffect } from 'react';

function DailyClima() {
  const [climaxdia, setClima] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('https://dataservice.accuweather.com/forecasts/v1/daily/5day/7249?apikey=zaK6x5EJ4e75t1Tv2ZnYZAOQzs3sOPoK&language=es-ar&details=false&metric=true')
      const climaxdia = await response.json()
      setClima(climaxdia)
    }
      
    fetchData()
  }, []);
    
  function getDayOfWeek(index) {
    const daysOfWeek = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    const today = new Date();
    const dayOfWeek = (today.getDay() + index) % 7;
    return daysOfWeek[dayOfWeek];
  }

  return (
    <div>
      {climaxdia ? (
        <div className='contClimaPorDia'>
          {climaxdia.DailyForecasts.slice(1, 5).map((data, index) => (
            <div className='climaPorDia' key={index}>
              <h4>{getDayOfWeek(index + 1)}</h4>
              <img src={data.Day.Icon + '.png'} alt={data.Day.Icon} />
              <h3>Max: {data.Temperature.Maximum.Value.toFixed(0) + '°C'}</h3>
              <h3>Min: {data.Temperature.Minimum.Value.toFixed(0) + '°C'}</h3>
              <p className='iconPhrase'>{data.Day.IconPhrase}</p>
            </div>
          ))}
        </div>
      ) : (
        <h1 className='cargando'>Cargando clima...</h1>
      )}
    </div>
  );
}

export default DailyClima;
