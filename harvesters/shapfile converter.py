import geopandas

shp_file = geopandas.read_file('./AURIN Dataset/shp/91bb8072-1074-4580-bfe9-9334ecc692fe.shp')
shp_file.to_file('Melbourne_SA2.geojson', driver='GeoJSON')