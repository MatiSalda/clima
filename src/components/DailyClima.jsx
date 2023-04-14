import React, { useState, useEffect } from 'react';


function DailyClima() {
  const [climaxdia, setClima] = useState(null);


  useEffect(() => {
    async function fetchData(){
        const response = await fetch('https://dataservice.accuweather.com/forecasts/v1/daily/5day/7249?apikey=zaK6x5EJ4e75t1Tv2ZnYZAOQzs3sOPoK&language=es-ar&details=false&metric=true')
        const climaxdia = await response.json()
        setClima(climaxdia)
      }
      
      fetchData()
    }, []);
    
  

  return (
    <div>
      {climaxdia ? (
        <div className='contClimaPorDia'>
           {climaxdia.DailyForecasts.map((data,index)=>(
            <div className='climaPorDia'>
                <img src={data.Day.Icon+'.png'} alt={data.Day.Icon} />
                < h3 >Max:{data.Temperature.Maximum.Value.toFixed(0)+'°C'}</h3>
                 <h3 key={index}>Min:{data.Temperature.Minimum.Value.toFixed(0)+'°C'}</h3>

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