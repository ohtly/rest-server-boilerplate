#!/bin/sh
mkdir -p ./config
if [ ! -e ./config/config.json ]; then
    cp ./dist/config.json.template ./config/config.json
else
    echo \"File exists, do nothing\"
fi
node ./dist/index.js
