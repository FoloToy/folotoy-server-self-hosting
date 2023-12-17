#!/bin/sh

/usr/sbin/mosquitto -d -c /etc/mosquitto/mosquitto.conf
python3 folotoy/main.py
