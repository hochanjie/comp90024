# Created by Yilin Xu (1201608) from group 45 of COMP90024 2021 Semester 1 Assignment 2 at the University of Melbourne

import json
import couchdb

sa2 = open('./AURIN Dataset/SA2_10%.geojson', 'r')
homeless = open('./AURIN Dataset/SA2_homeless_2016.json', 'r')
income = open('./AURIN Dataset/SA2_income_2016.json', 'r')
population = open('./AURIN Dataset/SA2_population_2016.json', 'r')

with open('/home/ubuntu/comp90024/ansible/IP.txt', 'r') as f:
    ip = f.readline().strip()

dbName = "AURIN"
couch = couchdb.Server('http://admin:group45@' + str(ip) + ':5984')

try:
    if dbName in couch:
        db = couch[dbName]
    else:
        db = couch.create(dbName)
except Exception as e:
    print(e)
    exit(-1)

try:
    db.save(json.load(sa2))
    db.save(json.load(homeless))
    db.save(json.load(income))
    db.save(json.load(population))
except Exception as e:
    print(e)
