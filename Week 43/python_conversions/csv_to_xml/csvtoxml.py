import csv
import lxml.etree as ET

# INITIALIZING XML FILE
root = ET.Element('root')

# READING CSV FILE AND BUILD TREE
with open('result.csv') as f:
     # Read labels
    headers = next(f)
    headers = headers.strip()
    headers = headers.split(',')

    print(headers)                            
    csvreader = csv.reader(f)

    for row in csvreader:        
        data = ET.SubElement(root, "row")
        for col in range(len(headers)):
            node = ET.SubElement(data, headers[col]).text = str(row[col])

# SAVE XML TO FILE
tree_out = (ET.tostring(root, pretty_print=True, xml_declaration=True, encoding="UTF-8"))

# OUTPUTTING XML CONTENT TO FILE
with open('Output.xml', 'wb') as f:
    f.write(tree_out)