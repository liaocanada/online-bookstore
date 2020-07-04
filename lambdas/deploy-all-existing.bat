:: This batch file redeploys all lambda functions (all *.js in this dir except runner.js)
:: Usage: deploy-all-existing.bat
echo off
echo WARNING: this will delete any index.js or index.zip you have in the current directory!
pause

setlocal EnableDelayedExpansion
for %%f in (*.js) do if not "%%~f"=="runner.js" (
    set toDeploy=%%f
    echo !toDeploy:~0,-3!

    :: Redeploy
    powershell -Command "(gc %toDeploy%) -replace './helpers', '/opt/lambdas/helpers' | Out-File -encoding ASCII index.js"
    powershell "Compress-Archive index.js index.zip"
    aws lambda update-function-code --function-name %toDeploy% --zip-file fileb://index.zip

    del index.js
    del index.zip

    :: Set env variables, timeout, layer
    aws lambda update-function-configuration --function-name "!toDeploy:~0,-3!" --environment "Variables={NODE_PATH=/opt/lambdas/node_modules}" --timeout 90 --layers "arn:aws:lambda:us-east-1:095371326078:layer:bookstore-layer-aurora:2"
)
