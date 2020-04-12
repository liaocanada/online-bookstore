echo off
set /p toDeploy=Enter lambda name (without the .js): 

set HOST="ebookstore-davidliao.caz1q21i1ocv.us-east-1.rds.amazonaws.com"
set DATABASE="bookstore"
set /p USERNAME=Enter database username:
set /p PASSWORD=Enter database password:
cls
aws lambda update-function-configuration --function-name %toDeploy% --environment "Variables={DB_HOST=%HOST%, DB_DATABASE=%DATABASE%, DB_USER="%USERNAME%", DB_PASSWORD="%PASSWORD%", NODE_PATH=/opt/lambdas/node_modules}"
