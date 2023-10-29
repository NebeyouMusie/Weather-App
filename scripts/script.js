// const apiKey = 'ca7452945a0d7601167f8b5fa984b34a';
// const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?units=metric&q=bangalore';

// async function checkWeather(){
//   const response = await fetch(apiUrl + `&appid=${apiKey}`);
//   let data = await response.json();

//   console.log(data);
//   
// }

// checkWeather();



const url = 'https://weatherapi-com.p.rapidapi.com/current.json?q=';
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '0bfbe5b37amsh7b17fd001cb3b17p12220ejsnad8ca531965a',
		'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
	}
};

const searchBox = document.querySelector('.search input');
const searchBtn = document.querySelector('.search button');



async function checkWeather(city){
 
try {
	const response = await fetch(url + city, options); 
	const result = await response.json();
	console.log(result);
  if(response.status == 404){
    document.querySelector('.error').style.display = 'block';
    document.querySelector('.weather').style.display = 'none';
    if(!navigator.onLine){
      document.querySelector('.error').innerHTML = 'NO';
    }
  }else{
  document.querySelector('.city').innerHTML = result.location.name;
  document.querySelector('.temp').innerHTML = Math.round(result.current.temp_c) + '°C';
  document.querySelector('.humidity').innerHTML = result.current.humidity + '%';
  document.querySelector('.wind').innerHTML = result.current.wind_kph + 'km/h';
  let weather = result.current.condition.text;
  let isDay = result.current.is_day;
  let code = result.current.condition.code;
  console.log(weather);
  console.log(isDay);
  console.log(code);

  let image = document.querySelector('.weather-icon');
  
    const response2 = await fetch('https://www.weatherapi.com/docs/weather_conditions.json');
	  const result2 = await response2.json();

    if(isDay === 1){
      result2.forEach((condition)=>{
        if(isDay === 1){
          if(code === condition.code && weather === condition.day){
            image.src = `images/day/${condition.icon}.png`;
          }
        }else if(isDay !== 1){
          if(code === condition.code && weather === condition.day){
            image.src = `images/night/${condition.icon}.png`;
          }
        }
      });
      document.querySelector('.weather').style.display = 'block';
      document.querySelector('.error').style.display = 'none';

    }
    }
} catch (error) {
    document.querySelector('.error').style.display = 'block';
    document.querySelector('.city').innerHTML = '----------';
    document.querySelector('.temp').innerHTML = '--°C';
    document.querySelector('.humidity').innerHTML = '--%';
    document.querySelector('.wind').innerHTML = '--km/h';
    console.error(error); 
}

}

// to check for internet connection





searchBtn.addEventListener('click',()=>{
    checkWeather(searchBox.value);
});

