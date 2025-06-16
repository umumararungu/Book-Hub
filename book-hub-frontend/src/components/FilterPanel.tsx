import React from 'react';
import { useBooks } from '../contexts/BookContext';
import { TextField, Button, FormControl, InputLabel, Select, MenuItem, Typography, Box, Chip, Stack } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const FilterPanel: React.FC = () => {
  const { genres, authors, filters, applyFilters, resetFilters } = useBooks();

  return (
    <Box sx={{ p: 2, backgroundColor: '#f5f5f5', borderRadius: 1 }}>
      <Typography variant="h6" gutterBottom>Filters</Typography>
      
      <TextField
        fullWidth
        label="Search"
        variant="outlined"
        value={filters.searchQuery}
        onChange={(e) => applyFilters({ searchQuery: e.target.value })}
        sx={{ mb: 2 }}
      />
      
      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Genres</InputLabel>
        <Select
          multiple
          value={filters.genres}
          onChange={(e) => applyFilters({ genres: e.target.value as string[] })}
          renderValue={(selected) => (
            <Stack gap={1} direction="row" flexWrap="wrap">
              {(selected as string[]).map((value) => (
                <Chip key={value} label={value} size="small" />
              ))}
            </Stack>
          )}
        >
          {genres.map((genre) => (
            <MenuItem key={genre} value={genre}>
              {genre}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      
      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Authors</InputLabel>
        <Select
          multiple
          value={filters.authors}
          onChange={(e) => applyFilters({ authors: e.target.value as string[] })}
          renderValue={(selected) => (
            <Stack gap={1} direction="row" flexWrap="wrap">
              {(selected as string[]).map((value) => (
                <Chip key={value} label={value} size="small" />
              ))}
            </Stack>
          )}
        >
          {authors.map((author) => (
            <MenuItem key={author} value={author}>
              {author}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      
      <Box sx={{ mb: 2 }}>
        <Typography gutterBottom>Publication Date Range</Typography>
        <DatePicker
          label="From"
          value={filters.minDate || null}
          onChange={(date) => applyFilters({ minDate: date?.toISOString().split('T')[0] || '' })}
          sx={{ mr: 1, width: '48%' }}
        />
        <DatePicker
          label="To"
          value={filters.maxDate || null}
          onChange={(date) => applyFilters({ maxDate: date?.toISOString().split('T')[0] || '' })}
          sx={{ width: '48%' }}
        />
      </Box>
      
      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Sort By</InputLabel>
        <Select
          value={filters.sortBy}
          onChange={(e) => applyFilters({ sortBy: e.target.value as any })}
        >
          <MenuItem value="title">Title</MenuItem>
          <MenuItem value="author">Author</MenuItem>
          <MenuItem value="publicationDate">Publication Date</MenuItem>
          <MenuItem value="rating">Rating</MenuItem>
        </Select>
      </FormControl>
      
      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Sort Order</InputLabel>
        <Select
          value={filters.sortOrder}
          onChange={(e) => applyFilters({ sortOrder: e.target.value as any })}
        >
          <MenuItem value="asc">Ascending</MenuItem>
          <MenuItem value="desc">Descending</MenuItem>
        </Select>
      </FormControl>
      
      <Button
        variant="outlined"
        onClick={resetFilters}
        fullWidth
      >
        Reset Filters
      </Button>
    </Box>
  );
};

export default FilterPanel;
