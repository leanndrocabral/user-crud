<h2 align="center" style='font-family: sans-serif'>
	User CRUD API 
</h2>

<br/>

<p align = "center">
A URL base é https://usercrrud.vercel.app
</p>

<br/>

<h2 align ='center'>Endpoints</h2>

## **Rotas Sem Autenticação**

<li style='font-size: 20px'>Criação de Usuário:</li>

<br/>

`POST /users - FORMATO DA REQUISIÇÃO - STATUS 201`

```json
{
  "name": "John Doe",
  "username": "John",
  "email": "johndoe@mail.com",
  "password": "12345678"
}
```

Caso dê tudo certo, a resposta será assim:

```json
{
  "id": "03443313-1808-400a-9554-effc703a710a",
  "name": "John Doe",
  "username": "John",
  "email": "johndoe@mail.com"
}
```

Caso dê um erro de campo irá retornar o seguinte erro:

`POST /users - FORMATO DA RESPOSTA - STATUS 400`

```json
{
  "statusCode": 400,
  "message": [
    "name must be longer than or equal to 3 characters",
    "name should not be empty",
    "username must be longer than or equal to 1 characters",
    "username should not be empty",
    "email must be an email",
    "email should not be empty",
    "password must be longer than or equal to 8 characters",
    "password should not be empty"
  ],
  "error": "Bad Request"
}
```

Caso dê um erro de conflito irá retornar o seguinte erro:

`POST /users - FORMATO DA RESPOSTA - STATUS 409`

```json
{
  "message": "Username or email already exists."
}
```

<br/>

<li style='font-size: 20px'>Sessão do Usuário</li>

<br/>

`POST /sessions - FORMATO DA REQUISIÇÃO - STATUS 201`

```json
{
  "email": "johndoe@mail.com",
  "password": "12345678"
}
```

Caso dê tudo certo, a resposta será assim:

`POST /sessions - FORMATO DA RESPOSTA - STATUS 201`

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIwMzQ0MzMxMy0xODA4LTQwMGEtOTU1NC1lZmZjNzAzYTcxMGEiLCJpYXQiOjE2ODYxNTQyMzAsImV4cCI6MTY4NjMyNzAzMH0.3Xdi_VdrsXo8QNUuQxdIPdMTfl8DIJuur49OLeZsovI"
}
```

Caso dê um erro irá retornar o seguinte erro:

`POST /sessions - FORMATO DA RESPOSTA - STATUS 400`

```json
{
  "message": "Incorrect email or password."
}
```

<br/>

## **Rotas Com Autenticação**

Rotas que necessitam de autorização deve ser informado no cabeçalho da requisição o campo "Authorization", dessa forma:

> Authorization: Bearer { access_token }

Após o cliente estar logado, ele deve conseguir adicionar novos contatos a sua lista.

> Caso você tente acessar os endpoints sem um token receberá o seguinte erro:

<br/>

`(Exemplo) GET /users - 401 Sem Autorização`

<br/>

```json
{
  "message": "Token not provided!"
}
```

> Caso você tente acessar os endpoints sem um token válido receberá o seguinte erro:

<br/>

`(Exemplo) GET /users - 403 Proibido`

```json
{
  "message": {
    "name": "JsonWebTokenError",
    "message": "invalid signature"
  }
}
```

 <br/>

<li style='font-size: 20px'>Acessar um usuário logado</li>

<br/>

`GET /sessions/user - FORMATO DA RESPOSTA - STATUS 200`

```json
{
  "id": "03443313-1808-400a-9554-effc703a710a",
  "name": "John Doe",
  "username": "Johnn",
  "email": "johndoe@mail.com"
}
```

<li style='font-size: 20px'>Listagem de usuários</li>

<br/>

Caso dê tudo certo, a resposta será assim:

`GET /users - FORMATO DA RESPOSTA - STATUS 200`

```json
{
  "limit": 10,
  "exceedCount": false,
  "exceedTotalPages": false,
  "result": [
    {
      "id": "03443313-1808-400a-9554-effc703a710a",
      "name": "John Doe",
      "username": "John",
      "email": "johndoe@mail.com"
    },
    {
      "id": "13443313-1808-400a-9554-effc703a710b",
      "name": "Jane Doe",
      "username": "Jane",
      "email": "janedoe@mail.com"
    }
  ],
  "count": 2,
  "totalPages": 1,
  "hasNextPage": false,
  "hasPrevPage": false,
  "page": 1
}
```

<li style='font-size: 20px'>Atualização de um usuário</li>

<br/>

`PATCH /users/:id - FORMATO DA REQUISIÇÃO`

```json
{
  "name": "Jane Doe",
  "username": "Jane",
  "email": "janedoe@mail.com"
}
```

Caso dê tudo certo, a resposta será assim:

`PATCH /users/:id - FORMATO DA RESPOSTA - STATUS 200`

```json
{
  "id": "03443313-1808-400a-9554-effc703a710a",
  "name": "Jane Doe",
  "username": "Jane",
  "email": "janedoe@mail.com"
}
```

Caso dê um erro de campo irá retornar o seguinte erro:

`PATCH /users/:id - FORMATO DA RESPOSTA - STATUS 400`

```json
{
  "statusCode": 400,
  "message": [
    "username must be longer than or equal to 1 characters",
    "username should not be empty",
    "email must be an email",
    "email should not be empty"
  ],
  "error": "Bad Request"
}
```

<li style='font-size: 20px'>Deleção de usuário</li>

<br/>

`DELETE /users/:id - FORMATO DA RESPOSTA - STATUS 204`

Caso dê tudo certo, a resposta será assim:

```json
{
  "id": "03443313-1808-400a-9554-effc703a710a",
  "name": "John Doe",
  "username": "Johnn",
  "email": "janedoe@mail.com"
}
```

<br/>

<li style='font-size: 20px'>Outras Possíveis Mensagens de Erro:</li>

<br/>

Caso o usuário não seja encontrado:

```json
{
  "message": "You are not allowed!"
}
```

Caso você tente editar ou deletar um usuário diferente do seu:

```json
{
  "message": "User does not exists!"
}
```

_Criado por Leandro Lourenço_
