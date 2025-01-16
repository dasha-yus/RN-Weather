export interface Location {
  lat: number;
  lng: number;
  city: string;
  country: string;
  iso2: string;
  tz: string;
  localTime: string;
}

export interface Weather {
  temp_c: number; // Temperature in celsius
  is_day: number; // 1 = Yes 0 = No
  condition: {
    text: string;
    icon: string;
    code: number;
  };
  wind_kph: number;
  pressure_mb: number; // Pressure in millibars
  humidity: number;
}
