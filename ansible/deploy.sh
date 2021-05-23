#!/bin/bash
# Created by Yilin Xu (1201608) from group 45 of COMP90024 2021 Semester 1 Assignment 2 at the University of Melbourne

. ./openrc.sh; ansible-playbook -i hosts.ini config-system.yaml