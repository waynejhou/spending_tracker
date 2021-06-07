@echo off
set BROWSER_PATH=C:\Program Files (x86)\Google\Chrome\Application\chrome.exe
npx webpack --env=release --config-name=server ^
    && npx webpack --env=release --config-name=client ^
    && start "" "%BROWSER_PATH%" http://localhost:5000 ^
    && node ./dist/release/server.js ^