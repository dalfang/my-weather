export type Location = {
  id?: number;
  name?: string;
  latitude: number;
  longitude: number;
  elevation: number;
  feature_code?: string;
  country_code?: string;
  timezone: string;
  population: number;
  postcodes: string[];
  country_id?: number;
  country?: string;
  admin1?: string;
  admin2?: string;
  admin3?: string;
  admin4?: string;
  admin1_id?: number;
  admin2_id?: number;
  admin3_id?: number;
  admin4_id?: number;
};

export interface LocationResponse {
  city: string;
  country: string;
  results?: Location[];
}
export type WeatherResponse = {
  current_weather: {
    temperature: number;
    windspeed: number;
    winddirection: number;
    weathercode: number;
    is_day: boolean;
    weather: [
      {
        description: string;
        icon: string;
      }
    ];
    location?: {
      city: string;
      country: string;
    };
  };
  hourly: {
    temperature_2m: number[];
  };
  daily?: {
    time: string[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    precipitation_sum?: number[];
    windspeed_10m_max?: number[];
    uv_index_max?: number[];
    sunrise?: string[];
    sunset?: string[];
  };
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  current_weather_units: {
    time: string;
    interval: string;
    temperature: string;
    windspeed: string;
    winddirection: string;
    is_day: string;
    weathercode: string;
  };
};

export interface ForecastResponse {
  time: string[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
  precipitation_sum: number[];
  windspeed_10m_max: number[];
  uv_index_max?: number[];
  sunrise?: string[];
  sunset?: string[];
}

export type PartialLocation = {
  latitude: number;
  longitude: number;
};
