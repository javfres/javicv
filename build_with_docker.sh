#!/bin/bash

docker build -t javfres/cv .

touch ./cv.pdf

docker run --rm -v${PWD}/cv.pdf:/cv/cv.pdf javfres/cv npm run cv $1