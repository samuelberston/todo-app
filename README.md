todo react frontend

// build the docker image
docker build -t todo-app .

// start the database
docker run --name todo-psql -e POSTGRES_PASSWORD=docker -e POSTGRES_USER=postgres -it -p 5432:5432 sberston/todo-psql

// start the controller
docker run --name todo-controller -p 3000:3000 sberston/todo-controller

// run the front end
docker run --name todo-react -p 8080:8080 -it sberston/todo-react

// start the kubernetes pod
kubectl apply -f pod.todo-app-ssl.yaml

// expose the ports locally
kubectl port-forward todo-app-ssl 8080 8443 9901

// confirm you can communicate with the service
curl https://localhost:8443 --insecure

docker tag todo-app sberston/todo-app 
docker push sberston/todo-app