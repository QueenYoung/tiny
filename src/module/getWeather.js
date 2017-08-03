import { $ } from '../../helper';
/**
 * @return a promise object either resolve or reject for local coordinates in browser.
 */
function getLocalCoordinates() {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        resolve([latitude, longitude].map(val => val.toFixed(1)));
      },
      (err) => {
        reject(err);
      },
    );
  });
}

// const client = {
//   id: '00dae568153346fc964b1323fca861d3',
//   secret: 'b730b7470280476d8514db0b7cc0ae70'
// };


/**
 * 
 * @param {HTMLElement} ctx 
 * the element which can trigger operation
 * @param {string} options
 * options for choose which JSON data.
 * @return {JSON} a promise object for weather json
 */
async function getWeatherJson(ctx, options = 'weather') {
  if (!['weather', 'forecast', 'forecast/daily'].includes(options)) {
    throw TypeError('Invalid params, only can use three ways.');
  }

  ctx.disabled = true;
  ctx.textContent = 'I am trying!';
  const [latitude, longitude] = await getLocalCoordinates();
  const url = `http://api.openweathermap.org/data/2.5/${options}?lat=${latitude}&lon=${longitude}&appid=839d380bc67fe744e5d04efa59e19c45`;

  const res = await fetch(url, {
    headers: new Headers({ Accept: 'application/json' }),
    cache: 'default',
  });
  if ((res.status >= 200 && res.status < 300) || res.status === 304) {
    return res.json();
  }

  throw Error(res.statusText);
}

function getWeather() {
  const btn = $('button');
  if (!btn) return;
  btn.addEventListener('click', (e) => {
    const target = e.target;
    const origin = target.textContent;
    getWeatherJson(target)
      .then(({ weather, main }) => {
        console.log(weather[0].main, weather[0].description);
        console.log((main.temp - 273.15).toFixed(1));
      })
      .then(() => {
        target.disabled = false;
        target.textContent = origin;
      })
      .catch((err) => {
        console.log(err);
        target.disabled = false;
        target.textContent = origin;
      });
  });
}
export default getWeather;
