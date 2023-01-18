todo app

// build the docker image
docker build -t todo-app .

// run the container
docker run --name todo-app -p 3000:3000 -it todo-app


// start the kubernetes service
kubectl apply -f pod.todo-app-ssl.yaml

// expose the ports locally
kubectl port-forward todo-app-ssl 8080 8443 9901

// confirm you can communicate with the service
curl https://localhost:8443 --insecure