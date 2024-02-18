# Issue

Docker 기반의 couchdb를 설치하던 중에, Setup Wizard를 통해서 클러스터 세팅 시, 두개의 Replication 노드를 추가 하려고 했으나, 서버 네트워크 인식이 안되는 문제가 발생하였다.

# 문제가 되었던 구성

```yml
version: '3'
services:
  couchdb1:
    container_name: couchdb1
    image: couchdb:latest
    volumes:
      - ./couchdb1_data:/opt/couchdb/data
    ports:
      - 5984:5984
    networks:
      - couchdb_cluster
    environment:
      - COUCHDB_USER=${COUCHDB_USER}
      - COUCHDB_PASSWORD=${COUCHDB_PASSWORD}
      - NODENAME=couchdb1

  couchdb2:
    container_name: couchdb2
    image: couchdb:latest
    volumes:
      - ./couchdb2_data:/opt/couchdb/data
    ports:
      - 5985:5984
    networks:
      - couchdb_cluster
    environment:
      - COUCHDB_USER=${COUCHDB_USER}
      - COUCHDB_PASSWORD=${COUCHDB_PASSWORD}
      - NODENAME=couchdb2

  couchdb3:
    container_name: couchdb3  
    image: couchdb:latest
    volumes:
      - ./couchdb3_data:/opt/couchdb/data
    ports:
      - 5986:5984
    networks:
      - couchdb_cluster
    environment:
      - COUCHDB_USER=${COUCHDB_USER}
      - COUCHDB_PASSWORD=${COUCHDB_PASSWORD}
      - NODENAME=couchdb3

networks:
  couchdb_cluster:
```

메인 노드에서 `http://couchdb2:5984/[path]` `http://couchdb3:5984/[path]` 호출하도록 하기 위해 구성하였다.
실제로 메인 노드에서 `podman exec -it bash [container id]` 로 컨테이너에 접속하여 `curl http://couchdb2:5984/_up` 명령어를 날려보면 `{"status":"ok","seeds":{}}` 응답이 정상적으로 온다.

# 원인

```bash
# couchdb3 container
# /opt/couchdb/etc/vm.args
...
# Comment this line out to enable the interactive Erlang shell on startup
+Bd -noinput
-name couchdb@couchdb3
```
> [참고했던 글](https://stackoverflow.com/questions/48709281/couchdb-this-database-failed-to-load-no-db-shards-could-be-opened-logged-in)

컨테이너에 접속하여 `cat /opt/couchdb/etc/vm.args` 을 해보면 위와 같이 설정되는데, env 값으로 `NODENAME=couchdb3` 을 넣은 값이 들어가게된다. 이렇게 들어가도 되어야 할거 같긴한데... (자세히 아시는분은 댓글 부탁드려요) 도커 컨테이너가 올라갈 때 고정 ip를 컨테이너에 부여하는 방식으로 해결할 수 있었다.



# 해결한 docker-compose.yml

```yml
version: '3'
services:
  couchdb1:
    container_name: couchdb1
    image: couchdb:latest
    volumes:
      - ./couchdb1_data:/opt/couchdb/data
    ports:
      - 5984:5984
    networks:
      couchdb_cluster:
        ipv4_address: 172.16.238.11
    environment:
      - COUCHDB_USER=${COUCHDB_USER}
      - COUCHDB_PASSWORD=${COUCHDB_PASSWORD}
      - COUCHDB_SECRET=${COUCHDB_SECRET}
      - NODENAME=172.16.238.11

  couchdb2:
    container_name: couchdb2
    image: couchdb:latest
    volumes:
      - ./couchdb2_data:/opt/couchdb/data
    ports:
      - 5985:5984
    networks:
      couchdb_cluster:
        ipv4_address: 172.16.238.12
    environment:
      - COUCHDB_USER=${COUCHDB_USER}
      - COUCHDB_PASSWORD=${COUCHDB_PASSWORD}
      - COUCHDB_SECRET=${COUCHDB_SECRET}
      - NODENAME=172.16.238.12

  couchdb3:
    container_name: couchdb3  
    image: couchdb:latest
    volumes:
      - ./couchdb3_data:/opt/couchdb/data
    ports:
      - 5986:5984
    networks:
      couchdb_cluster:
        ipv4_address: 172.16.238.13

    environment:
      - COUCHDB_USER=${COUCHDB_USER}
      - COUCHDB_PASSWORD=${COUCHDB_PASSWORD}
      - COUCHDB_SECRET=${COUCHDB_SECRET}
      - NODENAME=172.16.238.13

networks:
  couchdb_cluster:
    driver: bridge
    attachable: true
    ipam:
      driver: default
      config:
        - subnet: 172.16.238.0/24
```

위 처럼 고정 ip를 넣어주면 문제없이 Replication Node 들을 연결할 수 있게 된다.