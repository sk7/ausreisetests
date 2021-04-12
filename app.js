// Map

var map = L.map('map', {
  center: [47.66, 13.71],
  zoom: 8,
});

L.tileLayer('https://maps.wien.gv.at/basemap/bmaphidpi/normal/google3857/{z}/{y}/{x}.jpeg', {
  maxZoom: 20,
  attribution: 'Grundkarte: <a href="https://www.basemap.at/" target="_blank">basemap.at</a> | Daten: <a href="https://github.com/ginseng666/GeoJSON-TopoJSON-Austria" target="_blank">Flooh Perlot</a>, <a href="https://data.statistik.gv.at/web/meta.jsp?dataset=OGDEXT_GEM_1" target="_blank">Statistik Austria</a>',
  id: 'wien.gv.at'
}).addTo(map);

map.fitBounds([
    [46.621, 9.522],
    [49.011, 16.971]
]);


// Overlay layers

const bezirkeAffectedStyle = {
    'color': '#ff7800',
    'weight': 5,
    'opacity': 0.65,
    'fill': '#ff7800',
    'fillOpacity': 0.4
}

function onEachFeature(feature, layer) {
  console.log(layer)
  layer.bindPopup(feature.properties.name);
  layer.bindTooltip(feature.properties.name)
}
// Laender
const laenderAffectedLayer = new L.geoJSON.ajax("data/geo/laender_995_affected_geo.json", {
  onEachFeature: onEachFeature,
  style: bezirkeAffectedStyle
}).addTo(map);
// Gebiete - combinations of Bezirke
const gebieteAffectedLayer = new L.geoJSON.ajax("data/geo/gebiete_95_affected_geo.json", {
  onEachFeature: onEachFeature,
  style: bezirkeAffectedStyle
}).addTo(map);
// Bezirke
const bezirkeAffectedLayer = new L.geoJSON.ajax("data/geo/bezirke_995_affected_geo.json", {
  onEachFeature: onEachFeature,
  style: bezirkeAffectedStyle
}).addTo(map);
// Gemeinden
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
