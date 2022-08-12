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

```bash
docker compose up -d # or docker-compose up -d
```


## Tasks
- [ ] Setup environments

  - [ ] setup typescript environment for express and socketio.
  - [ ] setup database mongodb and redis via docker.
  - [ ] Run a simple test app.

- [ ] Create database schema for users.
- [ ] Implement login functionality via [passport.js](https://www.passportjs.org/)
- [ ] Create events via socket.io to handle communication with the client.
