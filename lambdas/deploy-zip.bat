echo off
echo WARNING: this will delete any index.js or index.zip you have in the current directory!
pause
del index.zip
set /p toDeploy=Enter lambda name (without the .js): 
powershell -Command "(gc %toDeploy%.js) -replace './helpers', '/opt/lambdas/helpers' | Out-File -encoding ASCII index.js"
powershell "Compress-Archive index.js index.zip"
del index.js
echo Created index.zip