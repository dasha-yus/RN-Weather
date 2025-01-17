export interface Location {
  lat: number;
  lng: number;
  city: string;
  country: string;
  iso2: string;
  tz: string;
  localTime: string;
}

interface Condition {
  text: string;
  icon: string;
  code: number;
}

export interface Weather {
  temp_c: number; // Temperature in celsius
  is_day: number; // 1 = Yes 0 = No
  condition: Condition;
  wind_kph: number;
  pressure_mb: number; // Pressure in millibars
  humidity: number;
}

export interface Forecast {
  time: string;
  temp_c: number;
  condition: Condition;
}

export interface ForecastDay {
  hour: Array<Forecast>;
}
