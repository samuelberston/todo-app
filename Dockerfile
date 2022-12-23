FROM node:18-alpine
WORKDIR /todo-app
COPY . .
RUN ["apk", "update", "&&", "apk", "add", "mysql"]
RUN ["npm", "install"]
RUN ["npx", "webpack"]
RUN ["echo", "'ran todo-app container'"]
CMD ["npm", "run", "start"]