FROM node:18-alpine
WORKDIR /todo-app
EXPOSE 8080
COPY . .
RUN ["npm", "install"]
RUN ["npx", "webpack"]
CMD ["npm", "run", "start"]
