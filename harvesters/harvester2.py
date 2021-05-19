# Created by Yilin Xu (1201608) from group 45 of COMP90024 2021 Semester 1 Assignment 2 at the University of Melbourne

import tweepy
import time
import utility
from multiprocessing import Process

CKEY = "d9hL3Zt9yTZszuQYzMC05NrAh"
CSECRET = "eopL4XLJB6v16zNSXBzwcfUKy6dAafAMNOc5v1ILOFfWluduis"
ATOKEN = "1243359804690558977-DcA67kXXBFx6Bdbys5YEyIvjMAbvpS"
ASECRET = "Oxbn0cn57utarMLdmMY3bv5LHibwdtTRxKeIelUHtqrgd"
BTOKEN = "AAAAAAAAAAAAAAAAAAAAABLrOwEAAAAAgLBmgz%2BuhRYXdesXNPWNJB1cWnA%3DZdpD4toC8kanPFEhqFuY9QsnxSVd2VFbe8eprQl81OFdOgy15w"

# harvester 2 cities
MELBOURNE_GC = "-37.810003,144.962594,100km"
PERTH_GC = "-31.952712,115.860480,100km"
MELBOURNE_BB = [144.7497, -38.4996, 145.4995, -37.5003]
PERTH_BB = [115.6001, -32.7997, 116.3997, -31.4501]

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
            myStream.filter(locations=MELBOURNE_BB + PERTH_BB, languages=["en"])
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
    search1 = Process(target=searchRecent, args=(MELBOURNE_GC,))
    search2 = Process(target=searchRecent, args=(PERTH_GC,))
    stream = Process(target=filterStream)
    search1.start()
    search2.start()
    stream.start()
    search1.join()
    search2.join()
    stream.join()
