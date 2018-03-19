let imageOffsetTop = 0;
let imageOffsetLeft =0;
let imageLon = 0;
let imageLat = 0;
let imageTime = 0;
let positionY = 0;
let positionX = 0;
let worldPlace = '';
let countryShortName = '';
let suffix = "px";
let savedcities = [];
let wheatherAllWorld = 0;
let weatherAllWorldF = 0;
let offsetWorld = '';
let wheatherIconWorld = '';


let image = document.querySelector(".canvas-body");

function scroll() {
  imageOffsetTop = image.offsetTop;
  imageOffsetLeft = image.offsetLeft;
  console.log(imageOffsetTop);
}
scroll();
window.addEventListener("scroll", scroll);

function displayLonLat(e) {
  positionY = e.pageY - imageOffsetTop;
  positionX = e.pageX - imageOffsetLeft;
  imageLat = (50 - positionY/5) * 1.8;
  imageLon = (positionX/10 - 50) * 3.6;
  document.documentElement.style.setProperty("--pageX", e.pageX + suffix);
  document.documentElement.style.setProperty(`--pageY`, e.pageY + suffix);
  document.querySelector('.spanLat').innerHTML = Math.round(imageLat);
  document.querySelector('.spanLon').innerHTML = Math.round(imageLon);
}
function displayOn() {
  document.querySelector('.movingDiv').style.display = "block";
}
function displayOff() {
  document.querySelector('.movingDiv').style.display = "none";
}
image.addEventListener("mousemove", displayLonLat);
image.addEventListener("mouseover", displayOn);
image.addEventListener("mouseout", displayOff);

function imageClick(e) {
  positionY = e.pageY - imageOffsetTop ;
  positionX = e.pageX - imageOffsetLeft ;
  imageLat = (50 - positionY/5) * 1.8;
  imageLon = (positionX/10 - 50) * 3.6;
  console.log(imageLat , imageLon);
  fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${imageLat}&lon=${imageLon}&units=metric&APPID=261e313010ab3d43b1344ab9eba64cfa`)
  .then(response => response.json())
  .then(function(data) {
    wheatherAllWorld = data.main.temp ;
    document.querySelector(".temp-AllWorld").innerHTML = `${Math.round(wheatherAllWorld)}`;
    weatherAllWorldF = (wheatherAllWorld * 1.8)+32;
    document.querySelector(".tempF-AllWorld").innerHTML = `${Math.round(weatherAllWorldF)}`;
    wheatherIconWorld = data.weather[0].icon;
    document.querySelector(".icon-AllWorld").innerHTML = `<img class="icon-Img-Tokyo" src="../content/${wheatherIconWorld}.png" width="70px" height="70px">`;
  })
  .then(function() {
    fetch(` https://maps.googleapis.com/maps/api/geocode/json?latlng=${imageLat},${imageLon}&key=AIzaSyAhbhZNE6A-Zcg49SMCyO7r_lH4MCDylRc `)
    .then(response => response.json())
    .then(function(cityName , i) {
      if (cityName.results[0] == undefined ||cityName.results[0].address_components[1] == undefined ||cityName.results[0].address_components[3] == undefined)  {
        worldPlace = cityName.results[0].address_components[1].short_name ;
        document.querySelector(".World-city").innerHTML = `${worldPlace}`;
        countryShortName = '';
        document.querySelector(".World-countrey").innerHTML = `${countryShortName}`;
      } else {
        worldPlace = cityName.results[0].address_components[1].short_name;
        document.querySelector(".World-city").innerHTML = `${worldPlace}` ;
        countryShortName = cityName.results[0].address_components[3].short_name;
        document.querySelector(".World-countrey").innerHTML = `${countryShortName}`;
        const placeNameLi = { worldPlace,  countryShortName , wheatherAllWorld , weatherAllWorldF };
        savedcities.push(placeNameLi);
        console.log('savedcities',savedcities);
        const savedList = document.querySelector('.list');
        savedList.innerHTML = savedcities.map(city => {
            return `
              <li>
              <input type="checkbox" data-index=${i} id="item${i}"> <span> ${city.worldPlace} ${city.countryShortName} ${Math.round(city.wheatherAllWorld)}C| ${Math.round(city.weatherAllWorldF)}F</span>
              </li>
            `;
          }).join('');
      }
    });
  });
}
image.addEventListener("click", imageClick);

function getTimeWorld(){
  fetch(` https://maps.googleapis.com/maps/api/timezone/json?location=${imageLat},${imageLon}&timestamp=1331161200&key=AIzaSyANpHwd0ZvP_2qrvqEEp-5l6NS3LkwxSbY `)
  .then(response => response.json())
  .then(function(world) {
    offsetWorld = world.rawOffset;
  });
}
const secondHandWorld = document.querySelector('.second-handWorld');
const minsHandWorld = document.querySelector('.min-handWorld');
const hourHandWorld = document.querySelector('.hour-handWorld');
function setDateWorld() {
  const nowWorld = new Date();
  const secondsWorld = nowWorld.getSeconds();
  const secondsDegreesWorld = ((secondsWorld / 60) * 360) + 90;
  secondHandWorld.style.transform = `rotate(${secondsDegreesWorld}deg)`;
  const minsWorld = nowWorld.getMinutes();
  const minsDegreesWorld = ((minsWorld / 60) * 360) + ((secondsWorld / 60)*6) + 90;
  minsHandTokio.style.transform = `rotate(${minsDegreesWorld}deg)`;
  const hourWorld = nowWorld.getHours();
  const offsetHoursWorld = (offsetWorld / 3600);
  const guadalajaraOffsetHours = (guadalajaraOffset / 3600);
  const hourDegreesWorld = (((hourWorld + offsetHoursWorld + guadalajaraOffsetHours) / 12) * 360) + ((minsWorld/60)*30) + 90;
  hourHandWorld.style.transform = `rotate(${hourDegreesWorld}deg)`;
}
setInterval(setDateWorld, 1000);
setDateWorld();
image.addEventListener("click", getTimeWorld);
