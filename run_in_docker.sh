#!/bin/bash -e

docker build .

touch ./cv.pdf

docker run \
    --name javicv \
    --rm \
    -it \
    -v${PWD}/cv.pdf:/cv/cv.pdf \
    $(docker build -q .) $@



