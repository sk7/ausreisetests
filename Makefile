all: data/geo/gebiete_95_affected_geo.json data/geo/gemeinden_95_affected_geo.json data/geo/bezirke_995_geo.json data/geo/bezirke_995_affected_geo.json

# laender only manually because manual changes are needed
data/geo/laender_995_affected_geo.json: ./scripts/filter_geojson.py data/laender_affected.json data/geo/laender_995_geo.json
	./scripts/filter_geojson.py data/laender_affected.json data/geo/laender_995_geo.json data/geo/laender_995_affected_geo.json

data/geo/gebiete_95_affected_geo.json: ./scripts/create_gebiete.py data/gebiete_affected.json data/geo/gemeinden_95_geo.json
	./scripts/create_gebiete.py data/gebiete_affected.json data/geo/gemeinden_95_geo.json data/geo/gebiete_95_affected_geo.json

data/geo/gemeinden_95_affected_geo.json: ./scripts/filter_geojson.py data/gemeinden_affected.json data/geo/gemeinden_95_geo.json
	./scripts/filter_geojson.py data/gemeinden_affected.json data/geo/gemeinden_95_geo.json data/geo/gemeinden_95_affected_geo.json

data/geo/bezirke_995_geo.json: ./scripts/fix_bezirke_names.sh
	./scripts/fix_bezirke_names.sh data/geo/bezirke_995_geo.json

data/geo/bezirke_995_affected_geo.json: ./scripts/filter_geojson.py data/bezirke_affected.json data/geo/bezirke_995_geo.json
	./scripts/filter_geojson.py data/bezirke_affected.json data/geo/bezirke_995_geo.json data/geo/bezirke_995_affected_geo.json

clean:
	rm -f data/geo/laender_995_affected_geo.json data/geo/gebiete_95_affected_geo.json data/geo/gemeinden_95_affected_geo.json
