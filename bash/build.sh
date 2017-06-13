#!/bin/sh
webpack &&
cd cordova &&
cordova-splash &&
cordova-icon &&
cd ..