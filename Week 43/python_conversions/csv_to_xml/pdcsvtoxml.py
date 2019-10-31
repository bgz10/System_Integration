import lxml.etree
import pandas
xmlroot = lxml.etree.Element('RootElement')
df = pandas.read_csv('result.csv')
for row in df.to_dict(orient='records'):
	current_row = lxml.etree.Element('row')
	xmlroot.append(current_row)
	for colname, cellvalue in row.items():
		current_row.set(colname, cellvalue)
with open('out.xml', 'wb') as filepath:
    filepath.write(lxml.etree.tostring(xmlroot, pretty_print=True))