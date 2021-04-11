var map = L.map('map').setView([48.1, 16.3], 10);

L.tileLayer('https://maps.wien.gv.at/basemap/bmaphidpi/normal/google3857/{z}/{y}/{x}.jpeg', {
  maxZoom: 20,
  attribution: '<a href="https://www.data.gv.at/katalog/dataset/2c54f4d6-5712-4e5a-a025-b7f7a396c39b" target="_blank">basemap.at</a>',
  id: 'wien.gv.at'
}).addTo(map);
