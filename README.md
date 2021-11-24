# NodeJS File Explorer
NodeJs File explorer for the file system on host



## Docker Container Proccess

### Get into container docker exec -it <container-id> /bin/sh
### Build new image docker build . -t meelio/nodejs-file-explorer
### Run/deploy image docker run -e PORT=8080 -p 49160:8080 -d meelio/nodejs-file-explorer