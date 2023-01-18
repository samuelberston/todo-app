FROM node:18-alpine
WORKDIR /todo-app
EXPOSE 8080
COPY . .
RUN ["npm", "install"]
CMD ["npm", "run", "start"]
