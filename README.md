# Stackoverflow project

## Technologies

- [React](https://reactjs.org/) - React for the frontend
- [Chakra](https://chakra-ui.com/) - Component library for React, good theme and responsiveness support
- [MongoDB Atlas](https://www.mongodb.com/atlas/database) - NoSQL database, easy to use
- [Axios](https://axios-http.com/docs/intro) - Simpler HTTP request library
- [Framer Motion](https://www.framer.com/motion/) - Animations for React

## Installation

1. Git clone the to an empty folder

```
git clone https://github.com/Haksa6/stackoverflow-copy-project.git
```

2. Cd into to the stackoverflow-copy-project and run npm install

```
npm install
```

3. Create a new file called .env in the server folder. Add three new values as such:

```
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster-name>.mongodb.net/<database-name>?retryWrites=true&w=majority
PORT=5000
JWT_SECRET=SECRET
```

Replace "username" and "password" with your MongoDB Atlas username and password. Replace "cluster-name" with the name of your cluster. Replace "database-name" with the name of your database.

## User manual

## Features

| Features                                                      | Max points |
| ------------------------------------------------------------- | :--------: |
| Basic features                                                |     25     |
| Utilization of a frontside framework (React)                  |     5      |
| Own feature (Light/ Dark theme)                               |     5      |
| Vote (up or down) posts and comments (only one vote per user) |     3      |
| **Total score**                                               |   **38**   |
