# Created by Yilin Xu (1201608) from group 45 of COMP90024 2021 Semester 1 Assignment 2 at the University of Melbourne

import tweepy
import time
import utility
from multiprocessing import Process

CKEY = "6HnE7UFtziydux0ocaYqeQgMg"
CSECRET = "QX1G2viedkPutuU35QFOhtKXsMsJvuqDzkEyIbYG9XP9U554Ft"
ATOKEN = "1391310857569640448-0y9s1snwBfeJ2jCPS2JF1lEeAWCXak"
ASECRET = "aOv2Lw29Hw0ltu5aHffKi86itB3lxj9zxdYqubrhWMExJ"
BTOKEN = "AAAAAAAAAAAAAAAAAAAAAM%2BJPQEAAAAAocan7%2BWfT5rCoyNv1fIkxSSRb48%3DmCvjrGHRWEEPAagV0sWuwMbjGfa7xb1N3p0jvhd0LXVZ1uJCa3"

# harvester 3 cities
BRISBANE_GC = "-27.467103,153.014206,100km"
BRISBANE_BB = [152.2015, -28.3995, 153.6, -26.6005]

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

    if depth < 2:
        friends = appAPI.followers_ids(userID)
        friends.append(appAPI.friends_ids(userID))
        for friendID in friends:
            print("Start search friend timeline of " + str(userID))
            searchTimeline(friendID, depth=1)
    else:
        return


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
            myStream.filter(locations=BRISBANE_BB, languages=["en"])
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
    search = Process(target=searchRecent, args=(BRISBANE_GC,))
    stream = Process(target=filterStream)
    search.start()
    stream.start()
    search.join()
    stream.join()
