const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3001;
const userRoutes = require('./routes/user-routes');

// express middleware, used to be bodyparser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve up static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client', 'build')));

  // Handle React routing, return all requests to React app
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

// Use API routes
app.use('/api/', userRoutes);

// Start the API server
app.listen(PORT, () => console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`));
