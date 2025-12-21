#docker compose down

docker compose up -d

#--volume käsud--

#volume nägemine
docker volume ls

#volume kontroll
docker volume inspect microservices_pgdata

#volume kustutamine
<#
docker volume rm microservices_pgdata

Või kõik kasutamata volume’id:
docker volume prune
#>



