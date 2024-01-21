# 왜 마이바티스인가
회사에서 mybatis로 업무를 하고 있는데 아주 예~전에 업무 없을 때 차장님이 알려주신 후 한번도 초기 설정은 해보지 않은것 같아서 , 새로 포트폴리오 만들 때 겸사겸사 초기 구성을 해보았다.

# XML vs Class
요즘 mybatis는 xml을 거의 사용하지 않고 class로 구성이 가능한 것 같았다.
그런데 mybatis의 장점은 xml을 사용할 때 더 있는거 같아서 (vo만 만들면되니) xml로 database 핸들링 할 수 있게 세팅했다.

# 세줄 설정법

1. resources 아래에 mappers 디렉토리 생성
2. 생성한 mappers 디렉토리에 [맵퍼이름].xml 파일 생성 후 아래 내용 추가
	```xml
	<?xml version="1.0" encoding="UTF-8"?>  
	<!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN" "http://mybatis.org/dtd/mybatis-3-mapper.dtd">  
	<mapper namespace="TestMapper">  
	    <select id="selectSomething" resultType="java.util.HashMap">  
	  
	        SELECT * FROM [테이블 이름];  
	  
	    </select>  
	</mapper>
   ```
3. application.properties 에  아래 내용 추가
	```xml
	mybatis.mapper-locations=classpath:/mappers/*.xml
	```

SqlSessionFactory 설정이나, mybatis-config.xml 설정 안해도 된다.