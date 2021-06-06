@echo off
npx webpack --env=debug --config-name=database ^
    && start "" cmd.exe /c "node ./dist/debug/database.js && pause"