@echo off
chcp 65001

set base=%~dp0
set M_ADDR="0.0.0.0"
set M_PORT="8000"
set M_DATABASE="mysql://root:root@localhost:3306/moneybook"

node server.js -a %M_ADDR% -p %M_PORT% -d %M_DATABASE%