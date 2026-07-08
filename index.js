//finding elements

const input=document.querySelector("#result");
const searchBtn=document.querySelector(".search-btn");
const leftDiv=document.querySelector(".left-div");
const rightDiv=document.querySelector(".right-div");


const rightHeader=document.querySelector(".right-header");
const rightMiddle=document.querySelector(".right-middle");
const rightFooter=document.querySelector(".right-footer");


const humidityDiv=document.querySelector(".humidity-div");
const windDiv=document.querySelector(".wind-div");
const pressureDiv=document.querySelector(".pressure-div");

const para=document.querySelector(".para");
const body=document.querySelector("body");
const container=document.querySelector(".container");
const toggleBtns=document.querySelectorAll(".toggle-btn");


const li=document.createElement("li");
const ul=document.querySelector(".ul")
const clearBtn=document.querySelector(".clear");


//toggle 

toggleBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    btn.classList.toggle("active");
    container.classList.toggle("dark-style");
  });
});

//localStorage UI update

const citiesList=JSON.parse(localStorage.getItem("cities")) || [];
citiesList.forEach(item=>{
const li=document.createElement("li");

  ul.appendChild(li);
  li.classList.add("li-style");
  li.textContent=`${item.city}   ${item.temp} ℃`;


})



searchBtn.addEventListener("click",(e)=>{
   e.preventDefault();
   const city=input.value;
   

const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=abae64b0f12dbc40560e636aa84da8f6&units=metric`;


fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=abae64b0f12dbc40560e636aa84da8f6&units=metric`)
.then((res)=>res.json())
.then((data)=>{
     
  //date and time

let utc = Date.now() + new Date().getTimezoneOffset() * 60000;
let cityTime=utc + (data.timezone)*1000;
let date=new Date(cityTime);

const options={
weekday:"long",
day:"numeric",
month:"long",
year:"numeric",
hour: "numeric",
  minute: "2-digit",
  second: "2-digit",
  hour12: true
};

// changing background

if(data.weather[0].main==="Clear"){
  rightDiv.style.backgroundImage='url("weather_img/clear5.jpg")';
}
else if(data.weather[0].main==="Clouds"){
  rightDiv.style.backgroundImage='url("weather_img/clouds5.jpg")';
}

else if(data.weather[0].main==="Rain"){
   rightDiv.style.backgroundImage='url("weather_img/rain5.jpg")';
}


else if(data.weather[0].main==="Snow"){
   rightDiv.style.backgroundImage='url("weather_img/snow.jpg")';
}
else{
  rightDiv.style.backgroundImage='url("weather_img/mist.jpg")';
}



//localStorage


citiesList.push({
  city: data.name,
  temp: data.main.temp}
);

localStorage.setItem("cities",JSON.stringify(citiesList));

const li=document.createElement("li");
 ul.appendChild(li);

  li.classList.add("li-style");
  li.textContent=`${data.name}   ${data.main.temp}℃ `;

        rightHeader.innerHTML=`<i class="fa-solid fa-location-dot"></i> ${data.name}
                                <p class="date-style">${date.toLocaleString("en-GB",options)}</p> `;

        rightMiddle.innerHTML=` <h2 class="temp-style">${data.main.temp}℃ </h2>
                               <p class="weather-style">${data.weather[0].main}</p>
                               <p class="feels-style">Feels like ${data.main.feels_like}℃</p> `;

         humidityDiv.innerHTML=` <i class="fa-solid fa-droplet"></i> 
                                 <p>Humidity</p>${data.main.humidity}%`;


         windDiv.innerHTML= `<i class="fa-solid fa-wind"></i>
                            <p>Wind</p>  ${data.wind.speed} km/h`;

         pressureDiv.innerHTML= ` <i class="fa-solid fa-gauge-high"></i>
                                <p>Pressure</p> ${data.main.pressure} hPa`;
        
})
});

clearBtn.addEventListener("click",() =>{
  localStorage.removeItem("cities");
  ul.innerHTML="";
})
