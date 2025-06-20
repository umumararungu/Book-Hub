import React from 'react';
import { useDispatch } from 'react-redux';
import {
  setSearchQuery,
  setSortBy,
  setGenreFilter,
  setMinRating,
  setPublicationDate
} from '../../features/books/booksSlice';

const SearchBar: React.FC = () => {
  const dispatch = useDispatch();

  return (
    <div>
      <input
        type="text"
        placeholder="Search books..."
        onChange={(e) => dispatch(setSearchQuery(e.target.value))}
      />

      <select onChange={(e) => dispatch(setSortBy(e.target.value as any))}>
        <option value="title">Sort by Title</option>
        <option value="author">Sort by Author</option>
        <option value="date">Newest First</option>
        <option value="rating">Highest Rated</option>
      </select>

      <select onChange={(e) => dispatch(setGenreFilter(e.target.value))}>
        <option value="">All Genres</option>
        <option value="Fiction">Fiction</option>
        <option value="contemporary romance">Contemporary Romance</option>
        <option value="New Adult">New Adult</option>
        <option value="Fantasy">Fantasy</option>
        <option value="Contemporary Fiction">Contemporary Fiction</option>
        <option value="Romance">Romance</option>
      </select>

      <input
        type="number"
        placeholder="Min rating"
        min="0"
        max="5"
        onChange={(e) => dispatch(setMinRating(Number(e.target.value)))}
      />

      <input
        type="date"
        onChange={(e) => dispatch(setPublicationDate(e.target.value))}
      />
    </div>
  );
};

export default SearchBar;
