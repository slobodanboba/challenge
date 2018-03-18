//  LONDON Clock starts---------------------------------------------------------------------------------------------------------------------------------------------- -->
let offset = '';
let guadalajaraOffset = '';
fetch(' https://maps.googleapis.com/maps/api/timezone/json?location=51.5073,-0.1277&timestamp=1331161200&key=AIzaSyANpHwd0ZvP_2qrvqEEp-5l6NS3LkwxSbY ')
.then(function(response) {
  return response.json();
})
.then(function(myJson) {
  offset = myJson.rawOffset;
});
fetch(' https://maps.googleapis.com/maps/api/timezone/json?location=20.6596,-103.3496&timestamp=1331161200&key=AIzaSyANpHwd0ZvP_2qrvqEEp-5l6NS3LkwxSbY ')
.then(function(response) {
  return response.json();
})
.then(function(guadalajara) {
  guadalajaraOffset = guadalajara.rawOffset;
});
const secondHand = document.querySelector('.second-hand');
const minsHand = document.querySelector('.min-hand');
const hourHand = document.querySelector('.hour-hand');
function setDate() {
  const now = new Date();
  const seconds = now.getSeconds();
  const secondsDegrees = ((seconds / 60) * 360) + 90;
  secondHand.style.transform = `rotate(${secondsDegrees}deg)`;
  const mins = now.getMinutes();
  const minsDegrees = ((mins / 60) * 360) + ((seconds/60)*6) + 90;
  minsHand.style.transform = `rotate(${minsDegrees}deg)`;
  const hour = now.getHours();
  const offsetHours = (offset / 3600);
  const guadalajaraOffsetHours = (guadalajaraOffset / 3600)
  const hourDegrees = (((hour + offsetHours + guadalajaraOffsetHours) / 12) * 360) + ((mins/60)*30) + 90;
  hourHand.style.transform = `rotate(${hourDegrees}deg)`;
}
setInterval(setDate, 1000);
setDate();
//  LONDON Clock Ends---------------------------------------------------------------------------------------------------------------------------------
// London wheather Starts---------------------------------------------------------------------------------------------------------------------------------------------- -->
let wheather = '';
let wheatherfahrenheit = '';
let lat = 33;
let lon = 151;
let latTokyo = 35.6;
let lonTokyo = 135.7;
function getWheatherLondon() {
  fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&APPID=261e313010ab3d43b1344ab9eba64cfa`)
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    wheatherLondon = data.main.temp ;
    document.querySelector(".tempLondon").innerHTML = `${Math.round(wheatherLondon)}`;
    let wheatherLondonF = (wheatherLondon * 1.8)+32;
    document.querySelector(".tempFLondon").innerHTML = `${Math.round(wheatherLondonF)}`
    wheatherIconLondon = data.weather[0].icon;
    console.log("wheatherIconLondon",wheatherIconLondon);
    document.querySelector(".icon-London").innerHTML = `<img class="icon-Img-London" src="../content/${wheatherIconLondon}.png" width="70px" height="70px">`;
  });
}
getWheatherLondon();
setInterval(getWheatherLondon, 600000);
