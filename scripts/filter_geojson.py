#!/usr/bin/env python

import sys
import json

with open(sys.argv[1]) as filter_file:
    affected_data = json.load(filter_file)['affected']

with open(sys.argv[2]) as geojson_file:
    data = json.load(geojson_file)

affected_map = {x['name']: x for x in affected_data}

new_features = []

for feature in data['features']:
    name = feature['properties']['name']
    if name in affected_map.keys():
        feature['properties'].update(affected_map[name])
        new_features.append(feature)

data['features'] = new_features
data['name'] += "_affected"

with open(sys.argv[3], 'w') as out_file:
    json.dump(data, out_file)
