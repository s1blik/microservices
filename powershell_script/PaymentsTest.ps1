docker compose restart payment-service
docker logs payment-service --tail 20
docker logs payment-service 

curl http://localhost:3002/payments

docker exec -it kafka kafka-topics.sh --bootstrap-server kafka:9092 --list
docker logs order-service

