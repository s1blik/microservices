#cd C:\Portfoolio\Apidev\microservices

docker compose up -d
SEND_ORDERS=false docker compose up -d --build

docker compose ps
docker ps
docker info
docker network ls

docker network rm microservices
docker compose up --build



#--volume käsud--

#volume nägemine
docker volume ls

#volume kontroll
docker volume inspect microservices_pgdata

docker compose ps
docker logs postgres
docker logs kafka

docker exec -it kafka netstat -tlnp
docker logs kafka --tail 20




#testandmete sisestamine:
#docker exec -it
docker exec -i postgres psql -U postgres -d paymentsdb -c "INSERT INTO payments (order_id, amount) VALUES (555, 42);
SELECT * FROM payments;"

docker exec -i postgres psql -U postgres -d paymentsdb -c "SELECT * FROM payments;"



#volume kustutamine
#docker compose down
#docker volume rm microservices_pgdata 

<#
docker volume rm microservices_pgdata

Või kõik kasutamata volume’id:
docker volume prune
#>



