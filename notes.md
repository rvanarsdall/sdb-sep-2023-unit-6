# MONGO DB

## MERN STACK

M - Mongo DB
E - Express
R - React
N - Node

## Traditional Databases

Databases = Collection of Tables
Table = Primary Keys, Columns
Record = Each Row in a table is a record (Fields and Values)

## Mongo DB

Database = Collection of Collections
Collections = Collection is the same thing as a Table in a normal DB
Document = Document is the same thing as a Record in a normal DB

## Initial Setup of Server

- `npm init -y` create the package.json file
- install dependencies: `npm install express mongoose bcrypt jsonwebtoken dotenv`
- create a .gitignore file
- create an app.js file
- update the `package.json` to reflect the correct starting file `app.js`
- used our `.env` file to store our environment variables such as the port number.
- added boiler plate code to our `app.js` file to start our server

## Boiler Plate without DB Connection

```js
require("dotenv").config();
const express = require("express");
const app = express();

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`server is running on port: ${PORT}`);
});
```

## Boiler Plate for App.js

Make sure your `.env` file has the proper variables in it to match the app.js file.

```js
require("dotenv").config();
const express = require("express");
const app = express();

const mongoose = require("mongoose");

const PORT = process.env.PORT;
const DBName = process.env.DBNAME;
const DB_URL = process.env.DB_URL;

mongoose.connect(DB_URL + DBName);
const db = mongoose.connection;
db.once("open", () => {
  console.log("connected to the DB", DBName);
});

app.listen(PORT, () => {
  console.log(`server is running on port: ${PORT}`);
});
```

## Models and Creating Them

- Models help define what our data collection will look like.
- Define the fields and the data types that will be used to describe the JSON Object.
- File naming convention `[name of the collection].model.js`
