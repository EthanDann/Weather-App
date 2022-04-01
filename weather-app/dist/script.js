const inputval = document.querySelector(`#location-form`);
const btn = document.querySelector(`#submit`);
const city = document.querySelector(`#cityoutput`);
const desc = document.querySelector(`#description`);
const temp = document.querySelector(`#temp`);
const wind = document.querySelector(`#wind`);

apik = "3045dd712ffe6e702e3245525ac7fa38";

// Kelvin to Fahrenheit. 1 kelvin is equal to -457.87 fahrenheit.

function convertion(val) {
  return (((val - 273.15) * 9) / 5 + 32).toFixed(2);
}

// Km/H to Mi/H for wind speed. 1 km/h is equal to 0.621371 mi/h.

function windConvertion(val) {
  return (val / 1.609).toFixed(2);
}

// This is to collect all the information

function gather() {
  fetch(
    "https://api.openweathermap.org/data/2.5/weather?q=" +
      inputval.value +
      "&appid=" +
      apik
  )
    .then((res) => res.json())
    .then((data) => {
      const nameval = data[`name`];
      const descrip = data[`weather`][`0`][`description`];
      const temperature = data[`main`][`temp`];
      const windspeed = data[`wind`][`speed`];

      city.innerHTML = `<span>${nameval}<span>`;
      temp.innerHTML = `Temperature: <span>${convertion(temperature)} °F<span>`;
      desc.innerHTML = `Sky Conditions: <span>${descrip}<span>`;
      wind.innerHTML = `Wind Speed: <span>${windspeed} mi/h<span>`;
    });
}
btn.addEventListener(`click`, gather);

// Same function, just if you press enter

function enterLocation(event) {
  if (event.keyCode === 13) {
    gather();
  }
}

inputval.addEventListener(`keypress`, enterLocation);