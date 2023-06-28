var search= document.getElementById("search");
var inputText = document.getElementById("text");
var Temps = document.getElementById("Temp");
var winds = document.getElementById("Wind");
var Humiditys= document.getElementById("Humidity");
var icons = document.getElementById("Icon");
var datePicker = document.getElementById("datepicker");
var row1 = document.getElementById("row1");
var current = document.getElementById("current");
var city = inputText.value;
var searchContainer = document.getElementById("box");
const searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];


//var cityName = inputText.value;
function weather(data){
var APIkey ="2e0b3e407aa2d7aabd6a36e1042565fb";
// Api of weather to get current weather
var currenturl =`https://api.openweathermap.org/data/2.5/weather?q=${inputText.value}&appid=${APIkey}&units=metric`;
fetch(currenturl).then(function (response) {
    if (response.ok) {
        response.json()
            .then(function (currentdata) {
                console.log(currentdata);
                var ctemp = currentdata.main.temp;
                var chumidity = currentdata.main.humidity;
                console.log(chumidity);
                var cwind = currentdata.wind.speed;
                var cicon = currentdata.weather[0].icon;


               current.innerHTML = `<div class="row row-cols- row-cols-md- mb- text-center" id="current">
      <div class="card mb-4 rounded-3 shadow-sm">
        <div class="card-header py-3" id="datepicker">
          <h4 class="my-0 fw-normal" >${inputText.value}:${dayjs.unix(currentdata.dt).format("MM/DD/YYYY")}</h4>
        </div>
        <div class="card-body">
          <h1 id="Icon"> <img src ="https://openweathermap.org/img/wn/${cicon}.png"></h1>
          <ul class="list-unstyled mt-3 mb-4">
            <li id="Temp"> Temp:${ctemp}</li>
            <li id="Wind">Wind:${cwind}</li>
            <li id="Humidity">Humidity:${chumidity}</li>

          </ul>

        </div>
      </div>
    </div>
  </div>`

            })
        }
    })


var url =`https://api.openweathermap.org/geo/1.0/direct?q=${inputText.value}&limit=5&appid=${APIkey}`;
fetch(url).then(function (response) {
    if (response.ok) {
        response.json()
            .then(function (data) {
                console.log(data);
                let lat = data[0].lat;
                console.log(lat);
                let lon = data[0].lon;
                
              
                var weatherUrl =`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIkey}&units=metric`;
               
                fetch(weatherUrl).then(function(response){
                    if(response.ok){
                        response.json()
                        .then(function(weatherdata){
                            
                            row1.textContent = "";

                            for(let i=3; i < weatherdata.list.length; i+=8){
                                var iconEl = weatherdata.list[i].weather[0].icon;
                                var tempEl = weatherdata.list[i].main.temp
                                var windEl= weatherdata.list[i].wind.speed;
                                var humidityEl= weatherdata.list[i].main.humidity;
                         row1.innerHTML += ` <div class="col">
                         <div class="card mb-4 rounded-3 shadow-sm">
                           <div class="card-header py-3" id = "day">
                             <h4 class="my-0 fw-normal" >${dayjs.unix(weatherdata.list[i].dt).format("MM/DD/YYYY")}</h4>
                           </div>
                           <div class="card-body">
                             <h1 class="card-title pricing-card-title"><small class="text-body-secondary fw-light"><img src ="https://openweathermap.org/img/wn/${iconEl}.png"></small></h1>
                             <ul class="list-unstyled mt-3 mb-4">
                               <li id="Temp">Temp:${tempEl}</li>
                               <li id="Wind">Wind:${windEl}</li>
                               <li id="Humidity">Humidity:${humidityEl}</li>
                   
                             </ul>
                   
                           </div>
                         </div>
                       </div>`
                            
                            }

                        })
                    }
                })

            })
        }
        
    })
    .catch(function(error) {
        console.log(error);
    })

}
 search.addEventListener("click", function(){
  weather();
  cityweather(city);
 });

 function cityweather(city){
  var city = inputText.value;
 
searchHistory.push(city);
localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
 showsearchHistory();
 }

 function targetcity(e){
  e.preventDefault();
  if(e.target.classList.add('search-history')){

  }


 }
 //searchContainer.innerHTML="";
 function showsearchHistory(){
  //searchContainer.innerHTML="";
  searchHistory.forEach(city =>{
var searchHistoryCity = document.createElement('div');
searchHistoryCity.textContent = city;
searchHistoryCity.setAttribute('data-city', city);
searchContainer.append(searchHistoryCity);
  })

 }
