# Created by Yilin Xu (1201608) from group 45 of COMP90024 2021 Semester 1 Assignment 2 at the University of Melbourne

import json
from constant import dbName, couch
from textblob import TextBlob
from shapely.geometry import shape, Point



SA2Data = []
with open('/home/ubuntu/comp90024/AURIN Dataset/SA2_10%.geojson') as f:
    data = json.load(f)
for feature in data['features']:
    polygon = shape(feature['geometry'])
    SA2Data.append([feature['properties'].get('sa2_code_0'), feature['properties'].get('sa2_name16'), polygon])


def saveRecord(record):
    try:
        if dbName in couch:
            db = couch[dbName]
        else:
            db = couch.create(dbName)
    except Exception as e:
        print(e)
        exit(-1)

    # prevent duplication
    if db.get(record["_id"]) is None:
        try:
            db.save(record)
            print(str(record["_id"]) + " saved")
        except Exception as e:
            print(e)
    else:
        print("Ignore duplicate tweets")
        return


def findArea(status):
    point = Point(float(status.coordinates.get('coordinates')[0]), float(status.coordinates.get('coordinates')[1]))
    for item in SA2Data:
        if item[2].contains(point):
            return item[0], item[1]
    return None


def parseStatus(status, city):
    if "full_text" in status._json:
        text = status.full_text
    elif "extended_tweet" in status._json:
        text = status.extended_tweet['full_text']
    else:
        text = status.text

    if findArea(status) is not None:
        SA2Code, SA2Name = findArea(status)
    else:
        SA2Code, SA2Name = None, None

    result = {
        "_id": status.id_str,
        "text": text,
        "location": status.coordinates.get('coordinates'),
        "sentiment": TextBlob(text).sentiment.polarity,
        "timestamp": str(status.created_at),
        "SA2_code": SA2Code,
        "SA2_name": SA2Name
    }

    if status.place.place_type == "city":
        result["place"] = {
            "type": status.place.place_type,
            "city": city
            # "state": str(status.place.full_name).split(", ")[1],
            # "bounding_box": {"type": status.place.bounding_box.type,
            #                  "coordinates": status.place.bounding_box.coordinates,
            #                  }
        }
    else:
        result["place"] = {
            "type": status.place.place_type,
            "neighborhood": status.place.name,
            "city": city
        }

    result["user"] = {
        "id": status.user.id,
        "name": status.user.name,
        "location": status.user.location
    }
    return result


def processStatus(status):
    flag = False
    if status.coordinates is not None:
        try:
            if status.place.country_code != 'AU':
                return flag
            elif status.place.place_type not in ["city", "neighborhood"]:
                return flag
        except AttributeError:
            return flag
        if status.place.place_type == "city":
            city = str(status.place.name).split(" ")[0]
        else:
            city = str(status.place.full_name).split(", ")[1]
        if city in ["Melbourne", "Sydney", "Brisbane", "Adelaide", "Perth"]:
            record = parseStatus(status, city)
            saveRecord(record)
            flag = True
    return flag
