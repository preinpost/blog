```
runtimeOnly("com.h2database:h2") -> implementation("com.h2database:h2")
```

build.gradle.kts 에서 위 처럼 바꿔줍니다.

```java
@Bean
public void h2RunServer() throws SQLException {
    Server.createTcpServer("-tcp", "-tcpAllowOthers", "-tcpPort", "9092").start();
}
```

jvm 메모리 안에 생성된 h2 저장소를 tcp로 접속할 수 있게 Bean을 생성하여 노출시켜 줍니다.

```groovy
spring.datasource.url=jdbc:h2:mem:testdb;MODE=MYSQL;DB_CLOSE_DELAY=-1
```

application.properties에서 위 와 같이 url을 정의해두었다면,

```groovy
jdbc:h2:tcp://localhost:9092/mem:testdb
```

db client에서 위 url로 접속이 가능해집니다.