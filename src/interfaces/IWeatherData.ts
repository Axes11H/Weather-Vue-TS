export interface IWeatherData {
   name: string,
   dt: number,
   visibility: number,
   timezone: number,
   main: {
     feels_like: number,
     humidity: number,
     pressure: number,
     temp: number,
     temp_min: number,
     temp_max: number,
   },
   sys: {
     sunrise: number,
     sunset: number,
   },
   weather: {
     main: string,
   }[],
   wind: {
     speed: number
   }
 }