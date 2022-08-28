# Lingo-backend

The backend code base for lingo. 

## What is Lingo?

Lingo is an app that let's users communicate with one another without having knowledge of the each other's language.
It tries to break the language barrier among humans. It does this by using instant translation. This prevents the user
from going back and forth to translate messages.

![lingo drawio](https://user-images.githubusercontent.com/45427673/183635721-f5eaa7be-4d63-4c5c-be4a-da9db33ae57e.png)


## Technologies
- **express**: This will be used to handle regular http requests.

- **socket.io**: This is used for real-time communication.

- **MongoDB**: Database to store users message.

- **Redis**: Database to store user sessions.

- **[google-translate-api](https://www.npmjs.com/package/@vitalets/google-translate-api)**: Node implementation of google translate api.

Figma design can be found [here](https://www.figma.com/file/K5Np072jExRFXnq4WhSjtZ/Lingo?node-id=0%3A1) by **[Lois Dagana](https://loisdagana.netlify.app/)**


## Usage

In other to run the app, you have to have **docker** installed.

Create a **.env** in the main directory then copy and paste the text below.

```
MONGO_URI="mongodb://lingo_user:lingo_pwd@mongo/lingo_db"
PORT=3000
SECRET="4274fffc957f5a2f5dabe93ea26c3b6c5ed95e9aac8111e2614d7adcb809986a"
```

The **SECRET** variable can be changed to any value you desire but its safe to keep it random.

Then run the command below:

```bash
docker compose up -d # or docker-compose up -d
```

## API

API routes for basic crud operations:

### Test route:

**GET 127.0.0.1:9000/**

*Response:*
```json
{"msg":"Lingo up"}
```

### Get users route:

**GET 127.0.0.1:9000/api/users/**

*Response:*
```json
 [
   {
    "_id": "630aaff5960b85d32420f516",
    "username": "Eteims",
    "friends": [],
    "groups": [
      "French",
      "Spanish"
    ],
    "createdAt": "2022-08-27T23:59:49.972Z",
    "updatedAt": "2022-08-28T00:02:17.882Z",
    "__v": 0,
    "lang": "English"
  },
  {
    "_id": "630ab174044d4c24d5e27d36",
    "username": "Alice",
    "friends": [],
    "groups": [],
    "createdAt": "2022-08-28T00:06:12.227Z",
    "updatedAt": "2022-08-28T00:06:12.227Z",
    "__v": 0
  },
 ]
```

### Get user route:

**GET 127.0.0.1:9000/api/users/630aaff5960b85d32420f516**

*Response:*

```json
{
  "_id": "630aaff5960b85d32420f516",
  "username": "Eteims",
  "friends": [],
  "groups": [
    "French",
    "Spanish"
  ],
  "createdAt": "2022-08-27T23:59:49.972Z",
  "updatedAt": "2022-08-28T00:02:17.882Z",
  "__v": 0,
  "lang": "English"
}
```

### Signup route:

**POST 127.0.0.1:9000/api/users/signup**

*Request body:*
```json
{
    "username": "Alice",
    "password": "alice123"
}
```

### Login route:

**POST 127.0.0.1:9000/api/users/login**

*Request body:*
```json
{
    "username": "Alice",
    "password": "alice123"
}
```

### Add lang route:

**PATCH 127.0.0.1:9000/api/users/lang**

*Request body:*
```json
{
    "lang": "English",
    "groups": ["Spanish", "Igbo", "French"]
}
```

### Delete route:

**DELETE 127.0.0.1:9000/api/users/**

Note: User most be signed in!

*Response:*
```json
{ "detail": "User successfully deleted" }
```



## Tasks
- [x] Setup environments

  - [x] setup typescript environment for express.
  - [x] setup database mongodb via docker.
  - [x] Run a simple test app.

- [x] Create database schema for users.
- [x] Implement login functionality.
