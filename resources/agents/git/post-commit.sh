#!/bin/bash
DIR=$(pwd)
COMMIT=$(git log -n 1 --pretty=oneline)
curl --insecure -X POST --data "{\"git\": \"commit\", \"dir\": \"$DIR\", \"commit\": "$COMMIT"}" $UBIQUITIOUS_CAPTURE > /dev/null
