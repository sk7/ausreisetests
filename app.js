// Map

var map = L.map('map', {
  center: [47.66, 13.71],
  zoom: 8,
});

L.tileLayer('https://maps.wien.gv.at/basemap/bmaphidpi/normal/google3857/{z}/{y}/{x}.jpeg', {
  maxZoom: 20,
  attribution: '<a href="https://www.data.gv.at/katalog/dataset/2c54f4d6-5712-4e5a-a025-b7f7a396c39b" target="_blank">basemap.at</a>',
  id: 'wien.gv.at'
}).addTo(map);

// Overlay layers

const bezirkeAffectedStyle = {
    'color': '#ff7800',
    'weight': 5,
    'opacity': 0.65,
    'fill': '#ff7800',
    'fillOpacity': 0.5
}

function bezirkeAffectedFilter(feature) {
  const bezirkeAffected = [
    "Braunau",
    "Scheibbs",
    "Wiener Neustadt (Stadt)",
    "Wiener Neustadt (Land)",
    "Neunkirchen",
    "Kufstein",
  ]
  if (bezirkeAffected.includes(feature.properties.name)) {
    return true
  }
}

function onEachFeature(feature, layer) {
  console.log(layer)
  layer.bindPopup(feature.properties.name);
}
// Laender - filtered serverside
const laenderAffectedLayer = new L.geoJSON.ajax("data/geo/laender_995_affected_geo.json", {
  onEachFeature: onEachFeature,
  style: bezirkeAffectedStyle
}).addTo(map);
// Gebiete - combinations of Bezirke - filtered serverside
const gebieteAffectedLayer = new L.geoJSON.ajax("data/geo/gebiete_95_affected_geo.json", {
  onEachFeature: onEachFeature,
  style: bezirkeAffectedStyle
}).addTo(map);
// Bezirke - filtered clientside
const bezirkeAffectedLayer = new L.geoJSON.ajax("data/geo/bezirke_995_geo.json", {
  onEachFeature: onEachFeature,
  filter: bezirkeAffectedFilter,
  style: bezirkeAffectedStyle
}).addTo(map);
// Gemeinden  - filtered serverside
const gemeindenAffectedLayer = new L.geoJSON.ajax("data/geo/gemeinden_95_affected_geo.json", {
  onEachFeature: onEachFeature,
  style: bezirkeAffectedStyle
}).addTo(map);


const overlayLayers = {
  "Bundesländer": laenderAffectedLayer,
  "Gebiete (kombinierte Bezirke)": gebieteAffectedLayer,
  "Bezirke": bezirkeAffectedLayer,
  "Gemeinden": gemeindenAffectedLayer
};



const layerControl = L.control.layers(null, overlayLayers).addTo(map);
