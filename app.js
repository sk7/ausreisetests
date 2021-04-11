let updating_url = false;
let initial_load = true;

mapboxgl.accessToken =
  'xxx'

var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v11',
  center: [16.3, 48.1],
  zoom: 10,
})
