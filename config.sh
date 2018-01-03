#!/usr/bin/env bash
APP_NAME="persistent-layer"

appSet() {
  fn_mac apps config set $APP_NAME $1 $2
}

getIP() {
  docker inspect --type container -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' $1
}

appSet SERVER_IP $(getIP fnserver)
appSet DB_IP $(getIP mysql)
appSet DB_NAME database
appSet DB_USER yy
appSet DB_PASS password
