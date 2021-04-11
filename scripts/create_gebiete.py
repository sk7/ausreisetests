#!/usr/bin/env python

import sys
import json

from shapely.geometry import Polygon, mapping
from shapely.ops import cascaded_union


with open(sys.argv[2]) as gemeinden_file:
    gemeinden_json = json.load(gemeinden_file)

with open(sys.argv[1]) as affected_file:
    gebiete_affected = json.load(affected_file)['affected']


def combine_gemeinden(gemeinden):
    polygons = []
    for feature in gemeinden_json['features']:
        if feature['properties']['name'] in gemeinden:
            polygon = Polygon([(coor[0], coor[1]) for coor in feature['geometry']['coordinates'][0]])
            polygons.append(polygon)

    # https://gis.stackexchange.com/a/348395
    new_geometry = mapping(cascaded_union(polygons))  # magic
    name = "Gebiet der Gemeinden %s" % ", ".join(gemeinden[:-1]) + " und " + gemeinden[-1]

    print(name)
    print("Combined %s Polygons into one" % len(polygons))

    return {
        "type": "Feature",
        "properties": {
            "name": name,
        },
        "geometry": new_geometry
    }


output = {
    "type": "FeatureCollection",
    "name": "gebiete_95_affected",
    "crs": {
        "type": "name",
        "properties": {
            "name": "urn:ogc:def:crs:OGC:1.3:CRS84"
        }
    },
    "features": []
}

output['features'] = list(map(combine_gemeinden, gebiete_affected))

with open(sys.argv[3], 'w') as gebiete_file:
    json.dump(output, gebiete_file)
