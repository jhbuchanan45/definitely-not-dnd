FROM node:14.15.3-alpine3.12

RUN apk add  --no-cache -U \
    git \
    bash \
    openssh

# Copy SSH key for git private repos
ADD ./ssh-keys/key1 /root/.ssh/id_rsa
RUN chmod 600 /root/.ssh/id_rsa

# Use git with SSH instead of https
# RUN echo "[url \"git@github.com:\"]\n\tinsteadOf = https://github.com/" >> /root/.gitconfig

# Skip Host verification for git
RUN echo "StrictHostKeyChecking no " > /root/.ssh/config

VOLUME "/dnd-map-files"

WORKDIR /dnd-map-files

# clones only main (production branch)
RUN git clone --branch main --single-branch git@github.com:jhbuchanan45/definitely-not-dnd.git /dnd-map-files
RUN chmod -R 774 /dnd-map-files
RUN npm install -g serve

EXPOSE 5000
CMD ["sh" , "-c" , "npm install ; npm run build ; serve -s build"]