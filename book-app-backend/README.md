### Book hub Back end Documentation

## Technologies used 
- Node.js
- Express.js
- MongoDB

## Backend Structure

``` bash

/backend
  /routes
    bookRoutes.js      ← Get all books (public)
  /models
    Book.js

  /config
    db.js        ← file for Database connection
  /seed
   seedDatabase.js    ← initial Database

  /swagger
   swagger.js   ← API Documentation
  server.js
  
```
# to run back end 
 ``` bash
 cd backend
npm install
npm run dev

 ```

 Runs at http://localhost:5000

 ## API Endpoints
|Method|Endpoint|Description|
|------|--------|-----------|
|GET|/api/books|Get all books|
|---|----------|-------------|
|GET|/api/books/:id|Get book by ID|
|---|--------------|--------------|
|POST|/api/books| Add new book|
|----|----------|-------------|
|PUT|/api/books/:id| Update book by ID|
|---|--------------|------------------|
|DELETE|/api/books/:id|Delete book by ID|
|------|--------------|-----------------|
