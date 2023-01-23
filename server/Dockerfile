FROM node

RUN npm install -g nodemon

WORKDIR "/app"

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install

COPY . .
