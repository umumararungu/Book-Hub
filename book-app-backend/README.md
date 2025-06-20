### Book hub Back end Documentation

## Technologies used 
- Node.js
- Express.js
- MongoDB

## Backend Structure

``` bash

/backend
  /routes
    auth.js       ← User login/register
    books.js      ← Get all books (public)
    ratings.js    ← Add/view ratings (auth required)
  /models
    Book.js
    User.js
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
