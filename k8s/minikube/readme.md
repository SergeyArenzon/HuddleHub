for local debugging do:

minikube start
minikube addons enable ingress           
minikube tunnel


for creating migrations file use:
minikube mount /Users/sergeyarenzon/dev/HuddleHub/services/user/src/migrations:/mnt/user-migrations