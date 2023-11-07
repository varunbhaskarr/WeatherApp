//event listner to get the location
document.getElementById("location-input").addEventListener('change',async ()=>{
    //get the user input location
    const location=document.getElementById("location-input").value;

    //fetch the weather data 
    const weatherData=await getWeatherData(location);

    //display the weather data on the page
    displayWeatherData(weatherData);



});
const getWeatherData=async(location)=>{
    if(!location){
        return{};
    }

    //const apiKey='0ddc373351e91ecb2300cce04beda5c4'
   const response=await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${'0ddc373351e91ecb2300cce04beda5c4'}`)
   const data=await response.json();
   return data;

    
}
function getBackgroundColor(temprature){
    if(temprature<0){
        return 'light-blue'
    }else if(temprature<10){
        return 'lightgreen'

    }else if(temprature<20){
        return 'lightyellow'

    }else if(temprature<30){
        return 'lightsalmon'

    }else{
        return 'lightcoral';
    }
}

const displayWeatherData =(data)=>{
    const weatherDataElement=document.getElementById("weather-data")

    if(Object.keys(data).length===0){
        weatherDataElement.innerHTML = "please enter a location to see the weather"
    }
    else{
        const backgroundColor=getBackgroundColor(Math.floor(data.main.temp - 273.15))
        weatherDataElement.style.backgroundColor=backgroundColor
        weatherDataElement.innerHTML=`
        <h3>${data.name}</h3>
        <p>Temprature: ${Math.floor(data.main.temp-273.15)}C</p>
        <p>Wind speed: ${data.wind.speed} m/s</p>
        
        `
    }

}
window.onload=async()=>{
    const weatherData = await getWeatherData();
    displayWeatherData(weatherData)
}
