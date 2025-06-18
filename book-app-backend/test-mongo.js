const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/bookstore')
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.error('❌ Connection failed:', err.message));