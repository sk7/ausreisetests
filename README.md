# Ausreisetests.at Map

**A map of Austrian areas which require a negative Corona-Test (Antigen or PCR) to leave.**

Live: https://ausreisetests.at/

Architecture:

* Currently affected areas are stored machine-readble JSON in `data/`.
* Geodata is filtered during the build process using those files.
* The web frontend fetches the filtered files from `data/geo/` and displays them.

Libraries used:

* [Leaflet](https://leafletjs.com/) (BSD)
* [leaflet-ajax](https://github.com/calvinmetcalf/leaflet-ajax/) (MIT)
* [Shapely](https://pypi.org/project/Shapely/) (BSD)

Data used:

* Tiles: [Basemap.at](https://basemap.at/) (CC-BY 4.0)
* Overlays: [GeoJSON-TopoJSON-Austria](https://github.com/ginseng666/GeoJSON-TopoJSON-Austria) by Flooh Perlot and [Statistik Austria](https://data.statistik.gv.at/web/meta.jsp?dataset=OGDEXT_GEM_1) (CC BY 4.0)
* Inspired by [ÖAMTC - Corona-Ausreisetestpflicht aus Regionen und Gemeinden in Österreich](https://www.oeamtc.at/news/corona-ausreisetestpflicht-aus-regionen-und-gemeinden-in-oesterreich-43159282)

Licenses

* Code: BSD
* Data of affected areas (files directly in /data): [CC0](https://creativecommons.org/share-your-work/public-domain/cc0/)


## Development

### Requirements

* Python 3
* `pip install -r requirements.txt`

### Local development server

To prevent CORS issues.

```
python -m http.server 8000
```

### Update affected areas

1. Change files in `/data`:
    - `bezirke_affected.json` - affected Bezirke
    - `gebiete_affected` - affected Gebiete (multiple Gemeinden combined to a Gebiet)
    - `gemeinden_affected.json` - affected Gemeinden
    - `laender_affected.json` - affected Bundesländer

1. Run

    ```
    make
    ```

Note: laender geo data is not re-generated automatically when running `make` because it requires manually removing parts of Tirol. You can run `make data/geo/laender_995_affected_geo.json` to force re-generation.
