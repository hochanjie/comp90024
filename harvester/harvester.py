# Created by Yilin Xu (1201608) from group 45 of COMP90024 2021 Semester 1 Assignment 2 at the University of Melbourne

import tweepy
import socket
import utility
import constant
from multiprocessing import Process


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


def filterStream(locations):
    print("Start Crawler")

    streamListener = MyStreamListener()
    myStream = tweepy.Stream(auth=userAPI.auth, listener=streamListener)

    while True:
        try:
            myStream.filter(locations=locations, languages=["en"])
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
    hostName = socket.gethostname()
    if hostName in ["harvesterserver-1", "harvesterserver-2", "harvesterserver-3"]:
        userAuth = tweepy.OAuthHandler(constant.auth.get(hostName).ckey, constant.auth.get(hostName).csec)
        userAuth.set_access_token(constant.auth.get(hostName).atoken, constant.auth.get(hostName).asec)
        userAPI = tweepy.API(userAuth, wait_on_rate_limit=True, wait_on_rate_limit_notify=True)
        appAuth = tweepy.AppAuthHandler(constant.auth.get(hostName).ckey, constant.auth.get(hostName).csec)
        appAPI = tweepy.API(appAuth, wait_on_rate_limit=True, wait_on_rate_limit_notify=True)
        search1, search2, stream = None, None, None
        if hostName == "harvesterserver-1":
            search1 = Process(target=searchRecent, args=(constant.SYDNEY_GC,))
            search2 = Process(target=searchRecent, args=(constant.ADELAIDE_GC,))
            stream = Process(target=filterStream, args=(constant.SYDNEY_BB + constant.ADELAIDE_BB,))
        elif hostName == "harvesterserver-2":
            search1 = Process(target=searchRecent, args=(constant.MELBOURNE_GC,))
            search2 = Process(target=searchRecent, args=(constant.PERTH_GC,))
            stream = Process(target=filterStream, args=(constant.MELBOURNE_BB + constant.PERTH_BB,))
        elif hostName == "harvesterserver-3":
            search1 = Process(target=searchRecent, args=(constant.BRISBANE_GC,))
            stream = Process(target=filterStream, args=(constant.BRISBANE_BB,))
        search1.start()
        if search2 is not None:
            search2.start()
        stream.start()
        search1.join()
        if search2 is not None:
            search2.join()
        stream.join()
    else:
        print("Cannot find a matched server")


