// weatehr api cdn https://cdnjs.com/libraries/weather-icons
var weather_icons_name_mapping = {
  "clear-day" : "wi-day-sunny",
  "clear-night" : "wi-night-clear",
  "rain-day" : "wi-day-rain",
  "rain-night" : "wi-night-alt-rain-wind",
  "snow-day" : "wi-day-snow",
  "snow-night" : "wi-night-alt-snow",
  "sleet-day" : "wi-day-sleet",
  "sleet-night" : "wi-night-sleet",
  "wind-day" : "wi-day-windy",
  "wind-night" : "wi-night-cloudy-windy",
  "fog-day" : "wi-day-fog",
  "fog-night" : "wi-night-fog",
  "cloudy-day" : "wi-day-cloudy",
  "cloudy-night" : "wi-night-cloudy",
  "partly-cloudy-day-day" : "wi-day-cloudy-gusts",
  "partly-cloudy-night-night" : "wi-night-partly-cloudy",
  "hail-day" : "wi-day-hail",
  "hail-night" : "wi-night-hail",
  "thunderstorm-day" : "wi-day-thunderstorm",
  "thunderstorm-night" : "wi-night-thunderstorm",
  "default" : "wi-day-sunny"
}

function check_weather_icons_functionality(){
  console.log('adding elements');
  for (key in weather_icons_name_mapping){
    $('.container').append('<div style="text-size:40px">'+ key + ' <i class="wi ' + weather_icons_name_mapping[key] + '"</i></div>');
  }
}

function get_location_suceess(position) {
  latitude = position.coords.latitude;
  longitute = position.coords.longitude;
  console.log(latitude, longitute);
  get_weather_forecast(latitude, longitute);
}

function get_location_failure(err) {
  console.error(err.code, err.message);
}

function create_api_url(latitude, longitute) {
  var base_url = "https://crossorigin.me/https://api.darksky.net/forecast/8760d2c6d40d890d89d1bc9aa0d4e9a3/";
  base_url += latitude;
  base_url += ",";
  base_url += longitute;
  base_url += "/?exclude=[minutely,hourly,daily,alerts,flags]";
  console.log(base_url);
  return base_url;
}

function get_weather_forecast_sucess(data, status, requestObject) {
  for (key in data){
    console.log(key, data[key]);
  }
}

function get_weather_forecast_error(requestObject, status, error) {
  console.error(status, error);
}
function get_weather_forecast(latitude, longitute) {
  $.ajax({
    url: create_api_url(latitude, longitute),
    success: get_weather_forecast_sucess,
    error: get_weather_forecast_error,
    cache: false,
    crossDomain: true,
    dataType: "json"
  });
}

if ("geolocation" in navigator) {
  /* geolocation is available */
  //navigator.geolocation.getCurrentPosition(get_location_suceess, get_location_failure);
} else {
  alert("Geo loation is not available. Please use this app on different browser which has geolocation");
}
