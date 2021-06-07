@echo off
start "" npx webpack --env=debug --config-name=server --watch ^
    && npx webpack --env=debug --config-name=client ^
    && npx webpack serve --env=debug --config-name=client