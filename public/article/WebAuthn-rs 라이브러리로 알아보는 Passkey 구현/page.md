# WebAuthn 이란
FIDO2 라고도 불리는 WebAuthn은 비밀번호로 사용자를 식별하는 것이 아니라, 비밀번호 없이 신뢰 플랫폼 모듈을 이용하여 사용자를 식별하는 웹 표준이다.
2022년 WWDC와 구글IO 에서 Passkey라는 비밀번호가 없는 공개키 기반의 인증 인터페이스를 공개했었는데, 두 회사의 세션 모두 재미있게 본 기억이 있다. [WWDC링크](https://developer.apple.com/wwdc22/10092)

# 인증 Flow
WebAuthn 인증은 크게 두 부분으로 나눠서 생각할 수 있다. 첫번째는 등록, 두번째는 인증이다.
개략적인 흐름은 아래와 같다. 두 부분이 큰 흐름이 유사해서 이해하기 어렵지는 않다.
### Register
1. 클라이언트는 사용자의 이름과 함께 challenge를 서버에 요청
2. 서버는 `start_passkey_registration` 함수를 호출하여  `CreationChallengeResponse` (ccr) 를 서버에서 만들어 클라이언트 응답값으로 전달. `start_passkey_registration` 함수를 호출하면 `CreationChallengeResponse` 구조체와 `PasskeyRegistration` 구조체 두개가 return 된다.
3. 이때 서버는 `PasskeyRegistration` 구조체를 세션에 보관하고 있다가 아래 7번의 `finish_passkey_registration` 함수 호출 시 같이 넣어줘야 한다.
4. 브라우저는 서버에서 받은 ccr을 `navigator.credentials.create`  option으로 넣은 후 함수 호출
5. 사용자의 서명이 끝나면 `navigator.credentials.create` 함수는 `RegisterPublicKeyCredential` (rpkc) 구조체를 return 한다.
6. 브라우저는 rpkc값을 서버로 보낸다. 
7. 서버는 브라우저에서 받은 rpkc값으로 `finish_passkey_registration` 함수를 호출하여 `Passkey` 구조체를 만든다.
8. `Passkey` 구조체를 영속시키면 인증 시 검증할 수 있게 된다.

### Authentication
1. 클라이언트는 사용자 아이디와 함께 인증요청을 서버에 보낸다.
2. 사용자 아이디를 이용하여 영속시킨 `Passkey` 구조체를 조회 후, `start_passkey_authentication` 함수를 호출하여 하여 `RequestChallengeResponse` (rcr) 를 만들어 클라이언트 응답값으로 전달. `start_passkey_authentication` 함수를 호출하면 `RequestChallengeResponse` 구조체와 `PassKeyAuthentication` 구조체 두개가 return 된다.
3. 이때 서버는 `PassKeyAuthentication` 구조체를 세션에 보관하고 있다가 아래 7번의 ``finish_passkey_authentication`` 호출 시 같이 함수에 넣어줘야한다.
4. 브라우저는 서버에서 받은 rcr을  `navigator.credentials.get` option으로 rcr 넣어서 함수 호출
5. 사용자의 서명이 끝나면 `navigator.credentials.get` 함수는 `PublicKeyCredetial` (pkc) 구조체를 return 한다.
6. 브라우저는 pkc값을 서버로 보낸다.
7. 서버는 브라우저에서 받은 pkc 값으로 `finish_passkey_authentication` 함수를 호출하여 일치하는지 비교한다.

# 구현
클라이언트 부분은 webauthn-rs 라이브러리 example을 따라가지 않고, 순수 javascript로 따로 구현하였다.

### Register
1. Client는 서버에게 Challenge를 요청한다.
```js
const json = await (async () => {  
  const res = await fetch("/login/get_challenge", {  
    method: "GET",  
    headers: {  
      "Content-Type": "application/json",  
    },
    body: {
	  "id": "Claire"
    }
  })  
  
  return res.json();  
})();
```
2. 서버는 `CreationChallengeResponse` 를 다시 Client에 보낸다.
```rust
let (ccr, reg_state) = webauthn  
    .start_passkey_registration(  
        user_unique_id,  
        "claire",  
        "Claire",  
        None, // No other credentials are registered yet.  
    )  
    .expect("Failed to start registration.");

// PasskeyRegistration 구조체는 session에 보관
session.insert("reg_state", reg_state).expect("fail to insert reg_state");

// CreationChallengeResponse 구조체는 Client에 보낸다.
Json(ccr) 
```
3. Client는 ccr로 rpkc값을 만든다
```js
const ccr = json.publicKey  
  
// challenge, id는 type 때문에 변환해줌  
ccr.challenge = base64urlToUint8Array(ccr.challenge);  
ccr.user.id = base64urlToUint8Array(ccr.user.id);  
  
// 브라우저는 ccr을 받아서 navigator.credentials.create 호출해서 option으로 ccr 넣어서 다시 서버로 요청  
const credential = await navigator.credentials.create({  
  publicKey: ccr  
});  
  
const rpkc = {  
  authenticatorAttachment: credential.authenticatorAttachment,  
  id: credential.id,  
  rawId: bufferToBase64url(credential.rawId),  
  response: {  
    attestationObject: bufferToBase64url(credential.response.attestationObject),  
    clientDataJSON: bufferToBase64url(credential.response.clientDataJSON)  
  },  
  type: credential.type  
};
```

4. Client는 rpkc값을 서버에 전달하고 정상 응답을 서버에게 받으면 된다.
```js
const res = await fetch("/login/member_register", {  
  method: "POST",  
  headers: {  
    "Content-Type": "application/json",  
  },  
  body: JSON.stringify(rpkc),  
})
```
5. 서버는 session에서 `PasskeyRegistration` 를 찾고 요청값인 rpkc 를 가지고 인증한다.
```rust
// session에서 PasskeyRegistration 값을 꺼낸다.
let reg_state = session.get::<PasskeyRegistration>("reg_state").unwrap().unwrap();

let sk = webauthn  
    .finish_passkey_registration(&rpkc, &reg_state)  
    .map_err(|e| {  
        info!("challenge_register -> {:?}", e);  
        return HttpResponse::BadRequest().finish();  
    })  
    .expect("error");

// 성공 시 Passkey 영속시킨다.
let cnt = sqlx::query("INSERT INTO users (user_id, name, passkey) VALUES ($1, $2, $3)")  
    .bind("Claire")  
    .bind("John Doe")  
    .bind(sk)  
    .execute(pool.get_ref()).await.unwrap();

```


### Authentication
1. Client는 사용자 아이디와 함께 인증요청을 서버에 보내서 rcr을 받아온다.
```js
const json = await (async () => {  
  const res = await fetch("/login/get_login_challenge", {  
    method: "GET",  
    headers: {  
      "Content-Type": "application/json",  
    },
    body: {
	  "id": "Claire"
    }
  })
  
  return res.json();
})();
```
2. 서버는  `RequestChallengeResponse` 를 다시 Client에 보낸다
```rust
// 영속시킨 Passkey를 찾아서 꺼낸다.
let user = sqlx::query_as::<_, User>("SELECT * FROM users WHERE user_id = 'Claire'")  
    .fetch_one(pool.get_ref()).await.unwrap();

let passkey = general_purpose::URL_SAFE_NO_PAD.decode(user.passkey.as_bytes()).unwrap();

let passkey: Passkey = serde_json::from_str(String::from_utf8(passkey).unwrap().as_str()).unwrap();

// Passkey를 복구한 후 start_passkey_authentication 함수를 호출하여 RequestChallengeResponse, PassKeyAuthentication 구조체를 얻는다.
let (rcr, auth_state) = webauthn.start_passkey_authentication(&*vec![passkey])  
    .expect("Failed to start login.");

// PassKeyAuthentication는 session에 넣어준다.
session.insert("auth_state", auth_state).expect("fail to insert auth_state");

// RequestChallengeResponse 구조체는 Client에 보낸다.
Json(rcr)
```
3. Client는 rcr로 pkc를 만든다.
```js
const rcr = json.publicKey;  
  
// challenge, id는 type 때문에 변환해줌  
rcr.challenge = base64urlToUint8Array(rcr.challenge);  
rcr.allowCredentials = rcr.allowCredentials.map((ac) => {  
  ac.id = base64urlToUint8Array(ac.id);  
  return ac;  
})

const credential = await navigator.credentials.get({  
  publicKey: rcr  
});

const pkc = {  
  authenticatorAttachment: credential.authenticatorAttachment,  
  id: credential.id,  
  rawId: bufferToBase64url(credential.rawId),  
  response: {  
    authenticatorData: bufferToBase64url(credential.response.authenticatorData),  
    clientDataJSON: bufferToBase64url(credential.response.clientDataJSON),  
    signature: bufferToBase64url(credential.response.signature),  
    userHandle: bufferToBase64url(credential.response.userHandle)  
  },  
  type: credential.type  
};
```
4. Client는 pkc값을 서버에 전달하고 정상 응답을 서버에게 받으면 된다.
```js
const res = await fetch("/login/member_login", {  
  method: "POST",  
  headers: {  
    "Content-Type": "application/json",  
  },  
  body: JSON.stringify(serializeable),
})
```

5. 서버는 session에서 `PassKeyAuthentication` 를 찾고 요청값인 pkc 를 가지고 인증한다.
```rust
// 세션에서 PassKeyAuthentication 를 꺼낸다.
let auth_state = session.get::<PasskeyAuthentication>("auth_state").unwrap().unwrap();

let auth_result = webauthn  
    .finish_passkey_authentication(&pkc, &auth_state)  
    .map_err(|e| {  
        info!("challenge_register -> {:?}", e);  
        return HttpResponse::BadRequest().finish();  
    })  
    .expect("error");

// 정상 응답을 해준다.
HttpResponse::Ok().finish()

```


### 특이사항
`navigator.credentials.create`, `navigator.credentials.get`  두 함수 호출 시 Uint8Array 로 타입이 지정된 것들이 있어 Json 변환 시 제대로 변환되지 않는 문제가 있다. 아래 함수를 사용해서 base64url 인코딩해서 서버로 보내면 Json 변환 문제도 해결할 수 있다.

```js
function bufferToBase64url(buffer) {  
  
  // modified from https://github.com/github/webauthn-json/blob/main/src/webauthn-json/base64url.ts  
  
  const byteView = new Uint8Array(buffer);  
  let str = "";  
  for (const charCode of byteView) {  
    str += String.fromCharCode(charCode);  
  }  
  
  // Binary string to base64  
  const base64String = btoa(str);  
  
  // Base64 to base64url  
  // We assume that the base64url string is well-formed.  const base64urlString = base64String.replace(/\+/g, "-").replace(  
    /\//g,  
    "_",  
  ).replace(/=/g, "");  
  return base64urlString;  
}  
  
function base64urlToUint8Array(str) {  
  return Uint8Array.from(atob(str.replace(/-/g, '+').replace(/_/g, '/').replace(/\s/g, '')), c => c.charCodeAt(0))  
}
```

### 참고문서
+ https://www.w3.org/TR/webauthn-2/#webauthn-relying-party
+ https://webauthn.guide/