import './weather.scss';

function getGeo() {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        resolve([latitude, longitude].map(val => val.toFixed(0)));
      },
      err => reject(err),
    );
  });
}

async function getWeather() {
  const apiUrl = await getGeo()
    .then(([latitude, longitude]) => {
      const url = 'https://fcc-weather-api.glitch.me/';
      return url.concat(`api/current?lon=${longitude}&lat=${latitude}`);
    })
    .catch(err => console.log(err));

  const { weather: [{ main, icon }], main: { temp } } = await fetch(
    apiUrl,
  ).then(res => res.json());

  const weatherIcon = new Image(100, 200);
  weatherIcon.src = icon;

  const [positionPar, temperaturePar, weatherPar] = document.querySelectorAll(
    'p',
  );
  positionPar.textContent = 'where';
  temperaturePar.textContent = `${temp} ⁰`;
  weatherPar.textContent = main;

  document.querySelector('div').appendChild(weatherIcon);
}

getWeather();

document.querySelector('a.turnOn').addEventListener('click', (e) => {
  e.preventDefault();
  const currentUnit = e.target.textContent === 'C' ? 'celsius' : 'fahrenheit';
  const par = e.target.parentNode.children[0];
  const currentTemperature = Number(par.textContent.slice(0, -1));

  if (Number.isNaN(currentTemperature)) return;

  let text;
  if (currentUnit === 'celsius') {
    text = Math.floor((currentTemperature - 32) * 5 / 9);
    e.target.textContent = 'F';
  } else {
    text = Math.floor(currentTemperature * 9 / 5) + 32;
    e.target.textContent = 'C';
  }
  par.textContent = `${text }⁰`;
});
