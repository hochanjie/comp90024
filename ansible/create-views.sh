# Created by Yilin Xu (1201608) from group 45 of COMP90024 2021 Semester 1 Assignment 2 at the University of Melbourne

IP=$(head -n 1 /home/ubuntu/comp90024/ansible/IP.txt)

curl -X PUT http://admin:group45@$IP:5984/tweets

curl -X PUT http://admin:group45@$IP:5984/tweets/_design/my_views -d '{
  "views": {
    "AvgSentimentsBySA2Code": {
      "map": "function (doc) {emit(doc.SA2_code, doc.sentiment);}",
	  "reduce": "function (keys, values){return sum(values)/values.length;}"
    },
    "AvgSentimentsBySA2Name": {
	  "map": "function (doc) {emit(doc.SA2_name, doc.sentiment);}",
	  "reduce": "function (keys, values){return sum(values)/values.length;}"
    }
  },
  "language": "javascript"
}'
