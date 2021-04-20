#!/usr/bin/env python

import sys
import json

from shapely.geometry import Polygon, mapping
from shapely.ops import cascaded_union


with open(sys.argv[2]) as gemeinden_file:
    gemeinden_json = json.load(gemeinden_file)

with open(sys.argv[1]) as affected_file:
    gebiete_affected = json.load(affected_file)['affected']


def combine_gemeinden(gebiet):
    gemeinden = gebiet['gemeinden']
    polygons = []
    for feature in gemeinden_json['features']:
        for gemeinde in gemeinden:
            # Match Gemeinde by ISO number (if available) and by name
            if feature['properties']['name'] == gemeinde.get('name') and (not gemeinde.get('iso') or feature['properties']['iso'] == gemeinde.get('iso')):
                polygon = Polygon([(coor[0], coor[1]) for coor in feature['geometry']['coordinates'][0]])
                polygons.append(polygon)
                break

    # https://gis.stackexchange.com/a/348395
    new_geometry = mapping(cascaded_union(polygons))  # magic

    if gebiet.get('name'):
        name = gebiet['name']
    else:
        names = [g['name'] for g in gemeinden]
        name = "Gebiet der Gemeinden %s" % ", ".join(names[:-1]) + " und " + names[-1]

    print(name)
    print("Combined %s Polygons into one" % len(polygons))

    new_feature = {
        "type": "Feature",
        "properties": {
            "name": name,
        },
        "geometry": new_geometry
    }
    del gebiet['gemeinden']
    new_feature['properties'].update(gebiet)

    return new_feature


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
