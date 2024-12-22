## Endpoints REST

### POST `/accounts`

Cria a conta para um novo participante.

#### Request body
```json
{
  "name": "John Doe",
  "email": "johndoe@example.com",
  "password": "12345678"
}
```

#### Response body
```json
{
  "statusCode": 201
}
```

### POST `/sessions`

Autentica um participante.

#### Request body
```json
{
  "email": "johndoe@example.com",
  "password": "12345678"
}
```
#### Response body
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
}
```