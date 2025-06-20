# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```

### Book app Front End Documentation

## Technology used

- React
- Redux Tookkit
- Typescript
- CSS Modules

## Front End Setup

``` bash
/src
  /features
    /books         ← Redux slice for books
    /user          ← Redux slice for auth (planned)
  /components
    /SearchBar
    /BookList
    /RatingStars   ← (future)
  /pages
    HomePage.tsx
  /api
    bookApi.ts     ← API calls
  /types
    book.ts
    filters.ts
```
## To run Front End
``` bash
cd frontend
npm install
npm run dev  # or npm start
```
runs at http://localhost:5173

## Key Features
Books are fetched from backend and stored in Redux

# Search & Filter
- by title or author
- live filtering using Redux FilterBooks State

# Planned Features
- User login/logout
- Book rating(1 to 5)
- Admin : add/edit/delete books

## Redux Overview

# bookSlice.ts
- manages:
  - books:all books
  - filteredBooks: Search Results
  - filters: current search/sort settings

# key Actions

``` ts
loadBooks()            // fetch all books
setSearchQuery(query)  // search by title/author
setSortBy('title')     // sort books

```

# API Call(bookApi.ts)

```ts
export const fetchBooks = async () => {
  const response = await fetch('http://localhost:5000/api/books');
  return await response.json();
};
```
