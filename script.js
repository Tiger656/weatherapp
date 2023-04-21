
const ipInfoUrl = "http://ip-api.com/json/"

fetch(ipInfoUrl)
    .then(response => response.json())
    .then(data => {
        var city = data.regionName;
      
        fetch("https://api.open-meteo.com/v1/forecast?" + new URLSearchParams({
            latitude: data.lat,
            longitude: data.lon,
            current_weather: true,
            hourly: "temperature_2m,relativehumidity_2m,windspeed_10m"
          }))
          .then(response => response.json())
          .then(dataWeather => {   
              document.querySelector('#weather').textContent = `Current temperature in ${data.regionName}: ${dataWeather.current_weather.temperature} °C`;
          })
          .catch(error => {
            document.querySelector('#weather').textContent = `Ошибка при получении данных о погоде: ${error}`;
            console.error('Error while getting data about weather:', error);
          });

    })
