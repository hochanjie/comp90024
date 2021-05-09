import couchdb
from textblob import TextBlob

couch = couchdb.Server('http://admin:group45@localhost:5984')

dbName = "tweets"


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


def parseStatus(status):
    if "full_text" in status._json:
        text = status.full_text
    elif "extended_tweet" in status._json:
        text = status.extended_tweet['full_text']
    else:
        text = status.text

    result = {
        "_id": status.id_str,
        "text": text,
        "sentiment": TextBlob(text).sentiment.polarity,
        "location": status.coordinates,
        "timestamp": str(status.created_at)
    }

    if status.place is not None:
        result["place"] = {
            "type": status.place.place_type,
            "full_name": status.place.full_name,
            "bounding_box": {"type": status.place.bounding_box.type,
                             "coordinates": status.place.bounding_box.coordinates,
                             }
        }
    else:
        result["place"] = status.place

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
        except AttributeError:
            return flag
        record = parseStatus(status)
        saveRecord(record)
        flag = True
    return flag
