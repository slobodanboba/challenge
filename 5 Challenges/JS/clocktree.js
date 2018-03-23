wheatherSydney = '';
wheatherSydneyF = '';
latSelected = 0;
lonSelected = 0;
offsetSelectedCity = 0;


function getWheatherSelected() {
  const citiesDropdown = document.querySelector('#city-selectors');
  let selectedCity = citiesDropdown.value;
  fetch(` https://maps.googleapis.com/maps/api/geocode/json?address=${selectedCity}&key=AIzaSyAhbhZNE6A-Zcg49SMCyO7r_lH4MCDylRc `)
  .then(response => response.json())
  .then(function(inputCity) {
    latSelected = inputCity.results[0].geometry.location.lat;
    lonSelected = inputCity.results[0].geometry.location.lng;
  })
  .then(function() {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latSelected}&lon=${lonSelected}&units=metric&APPID=261e313010ab3d43b1344ab9eba64cfa`)
    .then(response => response.json())
    .then(function(data) {
      wheatherSydney = data.main.temp ;
      document.querySelector(".tempSelected").innerHTML = `${Math.round(wheatherSydney)}`;
      let wheatherSydneyF = (wheatherSydney * 1.8)+32;
      document.querySelector(".tempFSelected").innerHTML = `${Math.round(wheatherSydneyF)}`;
      wheatherIconSelected = data.weather[0].icon;
      document.querySelector(".icon-Selcted").innerHTML = `<img class="icon-Img-Selected" src="../content/${wheatherIconSelected}.png" width="70px" height="70px">`;
    })
    .then(function(){
      fetch(`https://maps.googleapis.com/maps/api/timezone/json?location=${latSelected},${lonSelected}&timestamp=1331161200&key=AIzaSyANpHwd0ZvP_2qrvqEEp-5l6NS3LkwxSbY `)
      .then(response => response.json())
      .then(function(selectedCity) {
        offsetSelectedCity = selectedCity.rawOffset
      });
    });
  });
};

getWheatherSelected();
setInterval(getWheatherSelected, 600000);
const select = document.querySelectorAll('option');
select.forEach(option => option.addEventListener('click', getWheatherSelected));

function getWheatherTokyo() {
  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latTokyo}&lon=${lonTokyo}&units=metric&APPID=261e313010ab3d43b1344ab9eba64cfa`)
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

const secondHandSelected = document.querySelector('.second-handSelected');
const minsHandSelected = document.querySelector('.min-handSelected');
const hourHandSelected = document.querySelector('.hour-handSelected');
function setDateSelected() {
  const nowSelected = new Date();
  const secondsSelected = nowSelected.getSeconds();
  const secondsDegreesSelected = ((secondsSelected / 60) * 360) + 90;
  secondHandSelected.style.transform = `rotate(${secondsDegreesSelected}deg)`;
  const minsSelected = nowSelected.getMinutes();
  const minsDegreesSelected = ((minsSelected / 60) * 360) + ((secondsSelected / 60)*6) + 90;
  minsHandSelected.style.transform = `rotate(${minsDegreesSelected}deg)`;
  const hourSelected = nowSelected.getHours();
  const offsetHoursSelected = (offsetSelectedCity / 3600);
  const guadalajaraOffsetHours = (guadalajaraOffset / 3600);
  const hourDegreesSelected = (((hourSelected + offsetHoursSelected + guadalajaraOffsetHours) / 12) * 360) + ((minsSelected/60)*30) + 90;
  hourHandSelected.style.transform = `rotate(${hourDegreesSelected}deg)`;
}
setInterval(setDateSelected, 1000);
setDateSelected()
