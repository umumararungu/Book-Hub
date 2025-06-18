import React from 'react';
import { useDispatch } from 'react-redux';
import { setSearchQuery } from '../../features/books/booksSlice';
import styles from './SearchBar.module.css';

const SearchBar: React.FC = () => {
  const dispatch = useDispatch();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchQuery(e.target.value));
  };

  return (
    <div className={styles.searchContainer}>
      <input
        type="text"
        placeholder="Search books..."
        onChange={handleSearch}
        className={styles.searchInput}
      />
    </div>
  );
};

export default SearchBar;