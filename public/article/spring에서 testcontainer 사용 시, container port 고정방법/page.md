최근에 회사 법인카드 사용금액을 관리하기 위해 Spring Boot와 postgresql 기반의 간단한 영수증 프로그램을 만들고 있다.

local 개발 및 테스트 할 때 주로 H2를 사용해서 테스트를 했는데, H2와 Postgresql 간 쿼리 호환성이 안좋아서 다른방법이 필요했다.

찾다보니 요즘은 다들 `Testcontainers` 라는 것을 로컬 개발환경에서 사용하는 것 같아 적용해보았다.

세팅하고 써보니 만족도가 H2보다 아주아주 좋았지만, 설정을 다 하고 딱 하나가 마음에 안드는 부분이 있었다.

데이터가 잘 들어갔는지 확인 할 때 DataGrip을 사용해서 확인하는데 컨테이너 바인딩 된 포트가 계속 랜덤하게 바뀌어서 데이터 확인 하려 할 때 마다 포트를 확인해야 한다는 귀찮음이 발생했다.

```java
@Profile(value = {"test", "local", "dev"})
@Configuration
public class PostgresTestContainer {

    @Bean
    protected PostgreSQLContainer<?> postgreSQLContainer() {
        PostgreSQLContainer<?> postgreSQLContainer = new PostgreSQLContainer<>("postgres:16");
        postgreSQLContainer.withCreateContainerCmdModifier(cmd -> {
            cmd.withName("receipt_db");
            cmd.withHostName("receipt_db");

            // 특정 port binding
            Optional.ofNullable(cmd.getHostConfig()).ifPresent(hostConfig -> {
                hostConfig.withPortBindings(PortBinding.parse("40111:5432"));
            });

            cmd.withAliases("receipt_db");
        });
        postgreSQLContainer.withDatabaseName("receipt_db");
        postgreSQLContainer.withUsername("test");
        postgreSQLContainer.withPassword("test");

        postgreSQLContainer.start();
        return postgreSQLContainer;
    }
}
```

`withPortBindings` 설정을 해서 위 처럼 Bean을 하나 만들어주면, 포트를 고정시킬 수 있다!