
function fetchWeather() {
   let latitude, longitude;
  if ("geolocation" in navigator) {
    
    console.log("GeoLocation is available");
    navigator.geolocation.getCurrentPosition(async position => {
        latitude = position.coords.latitude;
        longitude = position.coords.longitude;

        try {
            window.location.href = "/indexapi.html";
            localStorage.setItem("lat", latitude);
            localStorage.setItem("lon", longitude);
            getAPICall(latitude, longitude)
        } catch (error) {
        }
      })
    }
   
}

if(window.location.pathname === '/indexapi.html'){
  var lat = localStorage.getItem("lat"); 
  var lon = localStorage.getItem("lon"); 
  document.querySelector('.latvalue').textContent = lat;
  document.querySelector('.longvalue').textContent = lon;
   const iframeData=document.getElementById("iframeId");
   iframeData.src=`https://maps.google.com/maps?q=${lat},${lon}&hl=es;&output=embed`  
  getAPICall(lat, lon);
}


function getAPICall(lat, lon) {
  document.querySelector('.latvalue').textContent = lat;
  document.querySelector('.longvalue').textContent = lon;
  const token = "35278d58978e822d3a38424d82bb6e75";
  var url =`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${token}`;
  console.log(url)
  fetch(url)
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    document.querySelector('.errorDiv').classList.add("d-none");
    const location = data.name;
    const lat = data.coord.lat;
    const long = data.coord.lon;
    const timezone = data.timezone;
    const windspeed = data.wind.speed;
    const pressure = data.main.pressure;
    const humidity = data.main.humidity;
    const winddirection = data.wind.deg;
    const temp = data.main.temp;
    const feelslike = data.main.feels_like;

    document.querySelector(".location-result").textContent = location;
    document.querySelector(".lat-result").textContent = lat;
    document.querySelector(".long-result").textContent = long;
    document.querySelector(".timezone-result").textContent = timezone;
    document.querySelector(".windspeed-result").textContent = windspeed;
    document.querySelector(".pressure-result").textContent = pressure;
    document.querySelector(".humidity-result").textContent = humidity;
    document.querySelector(".winddirection-result").textContent = winddirection;
    document.querySelector(".temp-result").textContent = temp;
    document.querySelector(".winFeelsLike-result").textContent = feelslike;
  })
  .catch(err => {
    document.querySelector('.result-report').classList.add("d-none");
    document.querySelector('.errorDiv').classList.remove("d-none");
   
 });
}
