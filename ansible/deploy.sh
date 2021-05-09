#!/bin/bash

. ./openrc.sh; ansible-playbook -i hosts.ini config-system.yaml