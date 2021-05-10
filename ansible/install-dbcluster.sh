#!/usr/bin/env bash

export declare -a nodes=(172.26.134.63 172.26.131.35 172.26.133.112 172.26.132.137)
export masternode=`echo ${nodes} | cut -f1 -d' '`
export declare -a othernodes=`echo ${nodes[@]} | sed s/${masternode}//`
export user='admin'
export pass='group45'



for node in ${nodes[@]}
do
	curl -XPUT http://${user}:${pass}@${node}:5984/_node/_local/_config/couchdb/uuid -d '"a09235ef99c7942afbd1c5046b000e9e"'
	curl -XPUT http://${user}:${pass}@${node}:5984/_node/_local/_config/couch_httpd_auth/secret -d '"a09235ef99c7942afbd1c5046b001e0a"'

done

for node in ${othernodes} 
do
    curl -XPOST "http://${user}:${pass}@${masternode}:5984/_cluster_setup" \
      --header "Content-Type: application/json"\
      --data "{\"action\": \"enable_cluster\", \"bind_address\":\"0.0.0.0\",\
             \"username\": \"${user}\", \"password\":\"${pass}\", \"port\": \"5984\",\
             \"remote_node\": \"${node}\", \"node_count\": \"$(echo ${nodes[@]} | wc -w)\",\
             \"remote_current_user\":\"${user}\", \"remote_current_password\":\"${pass}\"}"
done

for node in ${othernodes}
do
    curl -XPOST "http://${user}:${pass}@${masternode}:5984/_cluster_setup"\
      --header "Content-Type: application/json"\
      --data "{\"action\": \"add_node\", \"host\":\"${node}\",\
             \"port\": \"5984\", \"username\": \"${user}\", \"password\":\"${pass}\"}"
done

curl -XPOST "http://${user}:${pass}@${masternode}:5984/_cluster_setup"\
    --header "Content-Type: application/json" --data "{\"action\": \"finish_cluster\"}"

for node in "${nodes[@]}"; do  curl -X GET "http://${user}:${pass}@${node}:5984/_membership"; done
