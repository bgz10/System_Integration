import xmltodict
import json

with open('input.xml') as fd:
    doc = xmltodict.parse(fd.read())
    with open('res.json', 'w') as f:
        f.write(json.dumps(doc))
