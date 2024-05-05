export interface IRestructData {
   name: string;
   temp: number;
   min: number;
   max: number;
   main: string;
   time: string | undefined;
   sunRise: string;
   sunSet: string;
   wind: number;
   pressure: number;
   humidity: number;
   feelLike: number;
   visibility: number;
 }