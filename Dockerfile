FROM node:18-alpine
WORKDIR /todo-app
EXPOSE 8080
COPY . .
# RUN ["npm", "install", "--legacy-peer-deps"]
CMD ["npm", "run", "start"]
