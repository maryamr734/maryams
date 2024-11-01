let todayName=document.getElementById("today_date_day_name")
let todayNumber=document.getElementById("today_date_day_number")
let todayMonth=document.getElementById("today_date_month")
let todayLocation=document.getElementById("today_location")
let todayTemp=document.getElementById("today-temp")
let todayconditionImg=document.getElementById("today_condition_img")
let todayconditionText=document.getElementById("today_condition_text")
let humidity=document.getElementById("humidity")
let wind=document.getElementById("wind")
let windDirection=document.getElementById("wind_direction")
let weatherData


// next data
let nextDay=document.getElementsByClassName("next_day_name")
let nextMaxTemp=document.getElementsByClassName("next_max_temp")
let nextMinTemp=document.getElementsByClassName("next_min_temp")
let nextConditionImg=document.getElementsByClassName("next_condition_img")
let nextConditionText=document.getElementsByClassName("next_condition_text")


// search input
let searchInput=document.getElementById("search")








 async function getweatherdata(cityName)
{
 let weatherResponse = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=83e23012dd214c2097a204645243010&q=${cityName}&days=3`)
 let weatherData= await weatherResponse.json()
 return weatherData
}

//display today
function displayToday(data){
  let todayData=new Date()
todayName.innerHTML=todayData.toLocaleDateString("en-us" , {weekday: "long"})
todayNumber.innerHTML=todayData.getDate()
todayMonth.innerHTML=todayData.toLocaleDateString("en-us" , {month: "long"})
todayLocation.innerHTML=data.location.country
todayTemp.innerHTML=data.current.temp_c
todayconditionImg.setAttribute("src" , data.current.conditon.icon)
humidity.innerHTML=data.current.humidity+"%"
wind.innerHTML=data.current.wind_kph+"km/h"
windDirection.innerHTML=data.current.wind_dir
}


//display next days data
function displayNextData(data){
  let forecastData= data.forecast.forecastday
  for(let i = 0 ; i<2 ; i++){
    let nextDate = new Date(forecastData[i+1].data)
    nextDay[i].innerHTML=nextDate.toLocaleDateString("en-us" , {weekday:"long"})
    nextMaxTemp[i].innerHTML= forecastData[i+1].day.maxtemp_c
    nextMinTemp[i].innerHTML= forecastData[i+1].day.mintemp_c
    nextConditionImg[i].setAttribute("src" , forecastData[i+1].day.condition.icon)
    nextConditionText[i].innerHTML=forecastData[i+1].day.condition.text
  }
}


 async function startApp(city="cairo"){
  let weatherData = await getweatherdata(city)
  if(!weatherData.error){
    displayToday(weatherData);
    displayNextData(weatherData);
  }
}
startApp()



searchInput.addEventListener("input" , function(){
startApp(searchInput.value)



})

