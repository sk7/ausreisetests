let updating_url = false;
let initial_load = true;

mapboxgl.accessToken =
  'xxx'

var map = new mapboxgl.Map({
  container: 'map',
  style: 'https://vtbasemapat.azurewebsites.net/json/style',
  center: [16.3, 48.1],
  zoom: 10,
})

map.on('moveend', function (event) { updateUrl(); });

window.onhashchange = function (arguments) {
    if (updating_url) { return };
    var p = parseUrl();
    if (null === p) { return; }
    map.jumpTo({
        center: p.c,
        zoom: p.z
    });
};

let updateUrl = function () {
    updating_url = true;
    let z = map.getZoom().toFixed(1);
    let lnglat = map.getCenter();
    location.hash = `#${z}/${lnglat.lng.toFixed(6)}/${lnglat.lat.toFixed(6)}`;
    setTimeout(function () { updating_url = false; }, 250);
}

let parseUrl = function () {
    var hash = location.hash.replace('#', '').split('/');
    if (hash.length !== 3) { return null; }
    var params = {
        z: hash[0],
        c: [hash[1], hash[2]]
    };
    console.log(hash);
    console.log(params);
    return params;
}

setTimeout(function () {
    var p = parseUrl();
    if (null === p) {
        initial_load = false; return;
    }
    map.jumpTo({
        center: p.c,
        zoom: p.z
    });
    setTimeout(function () {
        initial_load = false;
    }, 500);
}, 250);
