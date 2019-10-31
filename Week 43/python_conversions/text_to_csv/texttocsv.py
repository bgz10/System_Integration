import csv
import itertools

with open('input.txt', 'r') as f:
    stripped = (line.strip() for line in f)
    lines = (line for line in stripped if line)
    grouped = itertools.zip_longest(*[lines] * 3)
    with open('result.csv', 'w') as csv_file:
        writer = csv.writer(csv_file)
        writer.writerow(('title', 'intro', 'tagline'))
        writer.writerows(grouped)