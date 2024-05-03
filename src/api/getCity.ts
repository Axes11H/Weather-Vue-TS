export async function getCity(city: string) {
   const api = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=925f97eb2ff163b81f0156e8d9a6888a`;
   let getCity = await fetch(api);
   return getCity.json();
}
