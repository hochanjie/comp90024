# Created by Yilin Xu (1201608) from group 45 of COMP90024 2021 Semester 1 Assignment 2 at the University of Melbourne

import geopandas

shp_file = geopandas.read_file('./AURIN Dataset/shp/91bb8072-1074-4580-bfe9-9334ecc692fe.shp')
shp_file.to_file('myfile.geojson', driver='GeoJSON')
