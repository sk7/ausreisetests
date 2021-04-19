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

const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: '2-digit'};
const dateFallback = "7-Tagesinzidenz unter 200, für 10 Tage (<a href='https://www.sozialministerium.at/dam/jcr:a1aa7427-4d70-4cf6-b28b-6894c4b3f216/Erlass_betreffend_zusaetzlicher_Massnahmen_in_Hochinzidenzgebieten.pdf'>Erlass</a>)";

function onEachFeature(feature, layer) {
  let props = feature.properties;
  layer.bindTooltip(props.name)
  layer.bindPopup(`
    <p>
      <strong>${props.name}</strong><br>
      ${props.info ? `${props.info}` : ''}
    </p>
    ${props.ab ? `
    <p>
      <strong>Ab:</strong> ${(new Date(Date.parse(props.ab))).toLocaleString('de-DE', dateOptions)}<br>
      <strong>Bis:</strong> ${props.bis ? (new Date(Date.parse(props.bis))).toLocaleString('de-DE', dateOptions) : dateFallback}
    </p>` : ''}
    ${props.verordnung_url ? `
      <p>
        <a href=${props.verordnung_url}>Verordnung</a>
      </p>` : ''}

    `);
}

const affectedStyle = {
    'color': '#ff7800',
    'weight': 5,
    'opacity': 0.65,
    'fill': '#ff7800',
    'fillOpacity': 0.4
}

const affectedSoonStyle = {
    'color': '#9c9b9a',
    'weight': 5,
    'opacity': 0.65,
    'fill': '#9c9b9a',
    'fillOpacity': 0.4
}

function style(feature) {
  if (feature.properties.ab) {
    startDateTime = new Date(Date.parse(feature.properties.ab));
    now = new Date();
    if (now < startDateTime) {
      return affectedSoonStyle
    }
  }
  return affectedStyle
}

function filter(feature) {
  if (feature.properties.bis) {
    endDateTime = new Date(Date.parse(feature.properties.bis))
    now = new Date();
    if (now > endDateTime) {
      return false
    }
  }

  return true
}

const options = {
  onEachFeature: onEachFeature,
  style: style,
  filter: filter,
}

const laenderAffectedLayer = new L.geoJSON.ajax("data/geo/laender_995_affected_geo.json", options).addTo(map);
const gebieteAffectedLayer = new L.geoJSON.ajax("data/geo/gebiete_95_affected_geo.json", options).addTo(map);
const bezirkeAffectedLayer = new L.geoJSON.ajax("data/geo/bezirke_995_affected_geo.json", options).addTo(map);
const gemeindenAffectedLayer = new L.geoJSON.ajax("data/geo/gemeinden_95_affected_geo.json", options).addTo(map);

const overlayLayers = {
  "Bundesländer": laenderAffectedLayer,
  "Gebiete (kombinierte Gemeinden)": gebieteAffectedLayer,
  "Bezirke": bezirkeAffectedLayer,
  "Gemeinden": gemeindenAffectedLayer
};

const layerControl = L.control.layers(null, overlayLayers).addTo(map);
