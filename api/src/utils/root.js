const express = require('express');

/**
 * Create all express routes
 * @param {express.Express} app
 */

module.exports = (app) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static('public'));

  app.use('/api/users', require('../routes/users'));
  app.use('/api/post', require('../routes/posts'));
};
