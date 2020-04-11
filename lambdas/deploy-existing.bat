:: This batch file redeploys an existing lambda function
:: Usage: deploy-existing.bat getAllProducts
echo off
echo WARNING: this will delete any index.js or index.zip you have in the current directory!
pause
set /p toDeploy=Enter lambda name (without the .js): 
powershell -Command "(gc %toDeploy%.js) -replace './helpers', '/opt/lambdas/helpers' | Out-File -encoding ASCII index.js"
powershell "Compress-Archive index.js index.zip"
aws lambda update-function-code --function-name %toDeploy% --zip-file fileb://index.zip
del index.js
del index.zip