@echo off
set BROWSER_PATH=C:\Program Files (x86)\Google\Chrome\Application\chrome.exe
npx webpack --env=debug --config-name=server ^
    && npx webpack --env=debug --config-name=client ^
    && start "" "%BROWSER_PATH%" http://localhost:8080 ^
    && start "" node ./dist/debug/server.js ^
    && start "" npx webpack serve --env=debug --config-name=client