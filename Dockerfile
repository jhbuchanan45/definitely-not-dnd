FROM node:14.15.3-alpine3.12 as intermediate

RUN apk add  --no-cache -U \
    git \
    bash \
    openssh

VOLUME "/dnd-map-files"

WORKDIR /dnd-map-files
# bundle scripts for bot (now in bot source)
# COPY ./*.sh /dnd-files

# clones only main (production branch)
RUN git clone --branch main --single-branch https://837f8c97bf6731bcfab72042285b4cde0af222d3@github.com/jhbuchanan45/dnd-map-react /dnd-map-files
RUN chmod -R 774 /dnd-map-files
RUN npm install
RUN npm install -g serve
RUN npm run build

EXPOSE 5000
CMD serve -s build