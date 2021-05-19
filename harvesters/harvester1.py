# Created by Yilin Xu (1201608) from group 45 of COMP90024 2021 Semester 1 Assignment 2 at the University of Melbourne

import tweepy
import time
import utility
from multiprocessing import Process

CKEY = "5j9AREhFGUlhTIgEhum5twtdv"
CSECRET = "cnydzUGUnE6s4stOBxgKZXRn9yr63hlw6H1ZgSPpDyJvBu0WvC"
ATOKEN = "1382639314555707399-3iz2KLqvs1BVIgJYrgGgiybtOhxtui"
ASECRET = "rfaLbjgenSEOozHF8Q7ntcAfBgYPR9BSwuSSgyN06gjNO"
BTOKEN = "AAAAAAAAAAAAAAAAAAAAADSiPAEAAAAA%2F20avH89KOkIU0o0zvvK%2FJEIol0%3D357ZyO4Z48UaB0Upuno8ctbpycWdJGbOuwihaQKBKBYtwbxLkW"

# harvester 1 cities
SYDNEY_GC = "-33.880901,151.206103,100km"
ADELAIDE_GC = "-34.928181,138.599931,100km"
SYDNEY_BB = [150.2004, -34.2001, 151.5986, -33.1989]
ADELAIDE_BB = [138.400761, -35.350029, 139.04999, -34.550264]

userAuth = tweepy.OAuthHandler(CKEY, CSECRET)
userAuth.set_access_token(ATOKEN, ASECRET)
userAPI = tweepy.API(userAuth, wait_on_rate_limit=True, wait_on_rate_limit_notify=True)

appAuth = tweepy.AppAuthHandler(CKEY, CSECRET)
appAPI = tweepy.API(appAuth, wait_on_rate_limit=True, wait_on_rate_limit_notify=True)


def searchTimeline(userID, depth=0):
    print("Start search timeline of " + str(userID))

    try:
        tweets = appAPI.user_timeline(user_id=userID, count=200, lang='en', tweet_mode='extended')
        if len(tweets) == 0:
            return
        else:
            for status in tweets[1:]:
                utility.processStatus(status)
    except tweepy.error.TweepError as e:
        print(e)
        return
    # if depth < 2:
    #     friends = appAPI.followers_ids(userID)
    #     friends.append(appAPI.friends_ids(userID))
    #     for friendID in friends:
    #         print("Start search friend timeline of " + str(userID))
    #         searchTimeline(friendID, depth=1)
    # else:
    #     return

def searchRecent(geoc):
    print("Start search recent tweets")

    oldestID = -1
    while True:
        try:
            tweets = appAPI.search(geocode=geoc, count=100, lang='en', max_id=oldestID - 1,
                                   tweet_mode='extended')
        except tweepy.error.TweepError as e:
            print(e)
            continue

        if len(tweets) == 0:
            return
        else:
            oldestID = tweets[-1].id
            for status in tweets:
                flag = utility.processStatus(status)
                if flag:
                    searchTimeline(status.user.id)


class MyStreamListener(tweepy.StreamListener):
    def on_error(self, status_code):
        print("ERROR: " + str(status_code))
        if status_code == 420:
            # returning False in on_error disconnects the stream
            return False

    def on_status(self, status):
        flag = utility.processStatus(status)
        if flag:
            searchTimeline(status.user.id)
        return True


def filterStream():
    print("Start Crawler")

    streamListener = MyStreamListener()
    myStream = tweepy.Stream(auth=userAPI.auth, listener=streamListener)

    while True:
        try:
            myStream.filter(locations=SYDNEY_BB + ADELAIDE_BB, languages=["en"])
        except ConnectionRefusedError as e:
            print(e)
            exit(-1)
        except FileNotFoundError as e:
            print(e)
            exit(-1)
        except Exception as e:
            print(e)
            continue


if __name__ == '__main__':
    search1 = Process(target=searchRecent, args=(SYDNEY_GC,))
    search2 = Process(target=searchRecent, args=(ADELAIDE_GC,))
    stream = Process(target=filterStream)
    search1.start()
    search2.start()
    stream.start()
    search1.join()
    search2.join()
    stream.join()
