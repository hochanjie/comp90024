#!/bin/bash
# Created by Yilin Xu (1201608) from group 45 of COMP90024 2021 Semester 1 Assignment 2 at the University of Melbourne

echo "====== getting ip ======"
NODENAME=$(/sbin/ip -o -4 addr list eth0 | awk '{print $4}' | cut -d/ -f1)
echo "nodename couchdb@{$NODENAME}"

# Set the password variable.
echo "== setting password for couchdb ===="
COUCHDB_PASSWORD=group45
echo -e "$COUCHDB_PASSWORD" >> /home/ubuntu/CouchDB.txt

# Update cache.
sudo apt-get update

# Bindaddress: 0.0.0.0 (does not bind to anything).
echo "== Setting up cluster variable for couch =="
echo "couchdb couchdb/mode select clustered
couchdb couchdb/mode seen true
couchdb couchdb/nodename string couchdb@${NODENAME}
couchdb couchdb/nodename seen true
couchdb couchdb/cookie string group45
couchdb couchdb/cookie seen true
couchdb couchdb/bindaddress string 0.0.0.0
couchdb couchdb/bindaddress seen true
couchdb couchdb/adminpass password ${COUCHDB_PASSWORD}
couchdb couchdb/adminpass seen true
couchdb couchdb/adminpass_again password ${COUCHDB_PASSWORD}
couchdb couchdb/adminpass_again seen true" | sudo debconf-set-selections

# We enter non-interactive mode instead of interactive mode here.
sudo apt-get -y install \
    build-essential pkg-config erlang-base \
    libicu-dev libmozjs185-dev libcurl4-openssl-dev

sudo DEBIAN_FRONTEND=noninteractive apt-get -yq install couchdb
