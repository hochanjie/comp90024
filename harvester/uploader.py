# Created by Yilin Xu (1201608) from group 45 of COMP90024 2021 Semester 1 Assignment 2 at the University of Melbourne

import json
import couchdb

sa2 = open('/home/ubuntu/comp90024/AURIN Dataset/SA2_10%.geojson', 'r')
homeless = open('/home/ubuntu/comp90024/AURIN Dataset/SA2_homeless_2016.json', 'r')
income = open('/home/ubuntu/comp90024/AURIN Dataset/SA2_income_2016.json', 'r')
population = open('/home/ubuntu/comp90024/AURIN Dataset/SA2_population_2016.json', 'r')
Adelaide = open('/home/ubuntu/comp90024/AURIN Dataset/SA2Name_Adelaide.json', 'r')
Brisbane = open('/home/ubuntu/comp90024/AURIN Dataset/SA2Name_Brisbane.json', 'r')
Melbourne = open('/home/ubuntu/comp90024/AURIN Dataset/SA2Name_Melbourne.json', 'r')
Perth = open('/home/ubuntu/comp90024/AURIN Dataset/SA2Name_Perth.json', 'r')
Sydney = open('/home/ubuntu/comp90024/AURIN Dataset/SA2Name_Sydney.json', 'r')

with open('/home/ubuntu/comp90024/ansible/IP.txt', 'r') as f:
  ip = f.readline().strip()

dbName = "aurin"
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
  db['sa2'] = json.load(sa2)
  db['homeless'] = json.load(homeless)
  db['income'] = json.load(income)
  db['population'] = json.load(population)
  db['adelaide'] = json.load(Adelaide)
  db['brisbane'] = json.load(Brisbane)
  db['melbourne'] = json.load(Melbourne)
  db['perth'] = json.load(Perth)
  db['sydney'] = json.load(Sydney)
except Exception as e:
  print(e)
