#!/bin/bash

ssh -i keys/cloud.key ubuntu@172.26.131.35 nohup python3 harvester1.py &
ssh -i keys/cloud.key ubuntu@172.26.133.112 nohup python3 harvester2.py &
ssh -i keys/cloud.key ubuntu@172.26.132.137 nohup python3 harvester3.py &