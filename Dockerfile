FROM node:20.11
WORKDIR /app
RUN npm install -g npm
RUN npm install -g json-server
COPY ./db.json /app
CMD ["json-server", "-p", "8080", "-w", "/app/db.json"]
