couchdb와 obsidian-sync 플러그인으로 잘 사용하고 있다가, couchdb를 설치해 둔 linux서버를 reboot 할 일이 생겼었다.

reboot을 하고 로그를 보니, master노드와 replica노드 간 인증문제 때문에 에러가 나고 있었다.

공식문서에도 자세히 안나와있어서 정확한 동작은 잘 모르겠지만.. 아래와 같이 하면 해결을 할 수 있다.


# 첫번째, .erlang.cookie값을 모두 맞춰주기

마스터 노드의 `/opt/couchdb/.erlang.cookie` 값을 복사해서 각 replica의 `/opt/couchdb/.erlang.cookie` 값을 덮어씌우면 된다.

# 두번째, cookie가 생기지 않게 하기

`docker-compose.yml` 에서 아래처럼 추가하면 `/opt/couchdb/.erlang.cookie`가 생기지 않는다.
```yml
...
command: -setcookie thecookie
...
```
[문서](https://docs.couchdb.org/en/stable/setup/cluster.html#confirming-connectivity-between-nodes)에 관련된 항목이 있는데, 이렇게 하면 cookie가 생기게 하지 않는 것을 의도한건지는 잘 모르겠다..

cookie가 존재하지 않으면, clustering 설정 때 사용한 password를 사용하는 것으로 보인다.