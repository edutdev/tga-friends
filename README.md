## Endpoints REST

### POST `/accounts`

Cria uma nova conta para um participante.

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

Autentica um participante e retorna um token JWT para acesso.

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
  "access_token": "<your_access_token>"
}
```

### GET `/me`

Obtém as informações do participante com base no ID presente no token de autenticação.

#### Request body
```json
{
  "Authorization": "Bearer <your_access_token>"
}
```

#### Response body
```json
{
  "participant": {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "name": "John Doe",
    "email": "johndoe@example.com"
  }
}
```