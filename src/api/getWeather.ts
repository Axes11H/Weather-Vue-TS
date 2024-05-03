export async function getWeather(lat: number, lon: number) {
   const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=925f97eb2ff163b81f0156e8d9a6888a`;
   let getWeather = await fetch(api);
   return getWeather.json();
}