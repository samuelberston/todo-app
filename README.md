todo app

// build the docker image
docker build -t todo-app .

// run the container
docker run --name todo-app -p 3000:3000 -it todo-app
