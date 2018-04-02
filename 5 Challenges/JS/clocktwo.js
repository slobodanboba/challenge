// TOKIO Clock Starts---------------------------------------------------------------------------------------------------------------------------------------------- -->
let offsetinputCity = '';
let latInputCity = 0;
let lonInputCity = 0;
let inputValue = '';
let citiesList = [];
const inputCity = document.querySelector("#form");


fetch('../content/city_list.json')
.then(response => response.json())
.then(data => citiesList.push(...data))
.then(citiesList.filter(city => city='Madrid'));


function getValue(e) {
  e.preventDefault();
  inputValue = (this.querySelector('[name=inputCity]')).value
  fetch(` https://maps.googleapis.com/maps/api/geocode/json?address=${inputValue}&key=AIzaSyAhbhZNE6A-Zcg49SMCyO7r_lH4MCDylRc `)
.then(response => response.json())
  .then(function(inputCity) {
    latInputCity = inputCity.results[0].geometry.location.lat;
    lonInputCity = inputCity.results[0].geometry.location.lng;
  })
  .then(function(){
    fetch(`https://maps.googleapis.com/maps/api/timezone/json?location=${latInputCity},${lonInputCity}&timestamp=1331161200&key=AIzaSyANpHwd0ZvP_2qrvqEEp-5l6NS3LkwxSbY `)
    .then(response => response.json())
    .then(function(inputCity) {
      offsetinputCity = inputCity.rawOffset
    })
    .then(function(){
      fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latInputCity}&lon=${lonInputCity}&units=metric&APPID=261e313010ab3d43b1344ab9eba64cfa`)
      .then(response => response.json())
      .then(function(data) {
        wheatherTokyo = data.main.temp ;
        document.querySelector(".tempTokyo").innerHTML = `${Math.round(wheatherTokyo)}`;
        let wheatherTokyoF = (wheatherTokyo * 1.8)+32;
        document.querySelector(".tempFTokyo").innerHTML = `${Math.round(wheatherTokyoF)}`;
        wheatherIconTokyo = data.weather[0].icon;
        document.querySelector(".icon-Tokyo").innerHTML = `<img class="icon-Img-Tokyo" src="../content/${wheatherIconTokyo}.png" width="70px" height="70px">`;
      });
    });
  });
}
inputCity.addEventListener("submit", getValue);
const secondHandTokio = document.querySelector('.second-handTokio');
const minsHandTokio = document.querySelector('.min-handTokio');
const hourHandTokio = document.querySelector('.hour-handTokio');
function setDateTokio() {
  const nowTokio = new Date();
  const secondsTokio = nowTokio.getSeconds();
  const secondsDegreesTokio = ((secondsTokio / 60) * 360) + 90;
  secondHandTokio.style.transform = `rotate(${secondsDegreesTokio}deg)`;
  const minsTokio = nowTokio.getMinutes();
  const minsDegreesTokio = ((minsTokio / 60) * 360) + ((secondsTokio / 60)*6) + 90;
  minsHandTokio.style.transform = `rotate(${minsDegreesTokio}deg)`;
  const hourTokio = nowTokio.getHours();
  const offsetHoursTokio = (offsetinputCity / 3600);
  const guadalajaraOffsetHours = (guadalajaraOffset / 3600);
  const hourDegreesTokio = (((hourTokio + offsetHoursTokio + guadalajaraOffsetHours) / 12) * 360) + ((minsTokio/60)*30) + 90;
  hourHandTokio.style.transform = `rotate(${hourDegreesTokio}deg)`;
}
setInterval(setDateTokio, 1000);
setDateTokio();



// Starts Tokyo Wheather ----------------------------------------------------------------------------------------------------------------------------------------
let wheatherTokyo = '';
function getWheatherTokyo() {
  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latInputCity}&lon=${lonInputCity}&units=metric&APPID=261e313010ab3d43b1344ab9eba64cfa`)
  .then(response => response.json())
  .then(function(data) {
    wheatherTokyo = data.main.temp ;
    document.querySelector(".tempTokyo").innerHTML = `${Math.round(wheatherTokyo)}`;
    let wheatherTokyoF = (wheatherTokyo * 1.8)+32;
    document.querySelector(".tempFTokyo").innerHTML = `${Math.round(wheatherTokyoF)}`;
    wheatherIconTokyo = data.weather[0].icon;
    document.querySelector(".icon-Tokyo").innerHTML = `<img class="icon-Img-Tokyo" src="../content/${wheatherIconTokyo}.png" width="70px" height="70px">`;
  });
}
getWheatherTokyo();
setInterval(getWheatherTokyo, 600000);
// TOKIO Clock Ends-----
