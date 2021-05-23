#!/bin/bash
# Created by Yilin Xu (1201608) from group 45 of COMP90024 2021 Semester 1 Assignment 2 at the University of Melbourne

#i=1
#while read -r line
#do 
#	test $i -eq 1 && ((i=i+1)) && continue
#	ssh -i keys/cloud.key ubuntu@$line sudo python3 /home/ubuntu/comp90024/harvesters/harvester.py
#done < "./IP.txt"

ssh -i keys/cloud.key ubuntu@172.26.129.173 sudo python3 /home/ubuntu/comp90024/harvesters/harvester.py
ssh -i keys/cloud.key ubuntu@172.26.130.207 sudo python3 /home/ubuntu/comp90024/harvesters/harvester.py
ssh -i keys/cloud.key ubuntu@172.26.130.23 sudo python3 /home/ubuntu/comp90024/harvesters/harvester.py
