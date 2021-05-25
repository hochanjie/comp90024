#!/bin/bash
# Created by Yilin Xu (1201608) from group 45 of COMP90024 2021 Semester 1 Assignment 2 at the University of Melbourne

IP=$(head -n 1 /home/ubuntu/comp90024/ansible/IP.txt)

curl -X PUT http://admin:group45@$IP:5984/tweets

curl -X PUT http://admin:group45@$IP:5984/tweets/_design/TwitterData -d '{
  "views": {
    "AvgSentimentsBySA2Code": {
      "map": "function (doc) {emit(doc.SA2_code, doc.sentiment);}",
	  "reduce": "function (keys, values){return sum(values)/values.length;}"
    },
    "AvgSentimentsBySA2Name": {
	  "map": "function (doc) {emit(doc.SA2_name, doc.sentiment);}",
	  "reduce": "function (keys, values){return sum(values)/values.length;}"
    },
	"AvgSentimentsByCity": {
	  "map": "function (doc) {emit(doc.place.city, doc.sentiment);}",
	  "reduce": "function (keys, values){return sum(values)/values.length;}"
    },
	"AllTweets": {
      "map": "function (doc) {emit(doc._id, {location: doc.location, sentiment: doc.sentiment, timestamp: doc.timestamp, SA2_code: doc.SA2_code, SA2_name: doc.SA2_name, place: doc.place});}"
    },
    "SentimentsBySA2Code": {
      "reduce": "_count",
      "map": "function (doc) {emit(doc.SA2_code, doc.sentiment);}"
    },
    "SentimentsBySA2Name": {
      "reduce": "_count",
      "map": "function (doc) {emit(doc.SA2_name, doc.sentiment);}"
    },
	"SentimentsByCity": {
      "reduce": "_count",
      "map": "function (doc) {emit(doc.place.city, doc.sentiment);}"
    },
    "TweetsBySA2Code": {
      "reduce": "_count",
      "map": "function (doc) {emit(doc.SA2_code, {location: doc.location, sentiment: doc.sentiment, timestamp: doc.timestamp, SA2_code: doc.SA2_code, SA2_name: doc.SA2_name, place: doc.place});}"
    },
    "TweetsBySA2Name": {
      "reduce": "_count",
      "map": "function (doc) {emit(doc.SA2_name, {location: doc.location, sentiment: doc.sentiment, timestamp: doc.timestamp, SA2_code: doc.SA2_code, SA2_name: doc.SA2_name, place: doc.place});}"
    },
    "TweetsByTime": {
      "reduce": "_count",
      "map": "function (doc) {emit(doc.timestamp, {location: doc.location, sentiment: doc.sentiment, timestamp: doc.timestamp, SA2_code: doc.SA2_code, SA2_name: doc.SA2_name, place: doc.place});}"
    },
    "TweetsBySentiment": {
      "reduce": "_count",
      "map": "function (doc) {emit(doc.sentiment, {location: doc.location, sentiment: doc.sentiment, timestamp: doc.timestamp, SA2_code: doc.SA2_code, SA2_name: doc.SA2_name, place: doc.place});}"
    },
	"TweetsByCity": {
      "reduce": "_count",
      "map": "function (doc) {emit(doc.place.city, {location: doc.location, sentiment: doc.sentiment, timestamp: doc.timestamp, SA2_code: doc.SA2_code, SA2_name: doc.SA2_name, place: doc.place});}"
    }
  },
  "language": "javascript"
}'
