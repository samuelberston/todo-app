FROM node:18-alpine
WORKDIR /todo-app
EXPOSE 3000
COPY . .
RUN ["npm", "install"]
RUN ["npx", "webpack"]
CMD ["npm", "run", "start"]
