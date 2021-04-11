all: data/geo/laender_995_affected_geo.json data/geo/gebiete_95_affected_geo.json data/geo/gemeinden_95_affected_geo.json

data/geo/laender_995_affected_geo.json: ./scripts/filter_geojson.sh data/laender_affected.json data/geo/laender_995_geo.json
	./scripts/filter_geojson.sh data/laender_affected.json data/geo/laender_995_geo.json data/geo/laender_995_affected_geo.json

data/geo/gebiete_95_affected_geo.json: ./scripts/create_gebiete.py data/gebiete_affected.json data/geo/gemeinden_95_geo.json
	./scripts/create_gebiete.py data/gebiete_affected.json data/geo/gemeinden_95_geo.json data/geo/gebiete_95_affected_geo.json

data/geo/gemeinden_95_affected_geo.json: ./scripts/filter_geojson.sh data/gemeinden_affected.json data/geo/gemeinden_95_geo.json
	./scripts/filter_geojson.sh data/gemeinden_affected.json data/geo/gemeinden_95_geo.json data/geo/gemeinden_95_affected_geo.json

clean:
	rm -f data/geo/laender_995_affected_geo.json data/geo/gebiete_95_affected_geo.json data/geo/gemeinden_95_affected_geo.json
