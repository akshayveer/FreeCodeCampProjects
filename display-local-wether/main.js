function get_location_suceess(position) {
  var latitude = position.coords.latitude;
  var longitute = position.coords.longitude;
  console.log(latitude, longitute);
}

function get_location_failure(err) {
  console.error(err.code, err.message);
}
if ("geolocation" in navigator) {
  /* geolocation is available */
  navigator.geolocation.getCurrentPosition(get_location_suceess, get_location_failure);
} else {
  alert("Geo loation is not available. Please use this app on different browser which has geolocation");
}
