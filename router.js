const express = require('express');
const knex = require('../db/connections');
const router = express.Router();

const COOKIE_MAX_AGE = 1000 * 60 * 60 * 24 * 7; // A week in milliseconds

//greets new user with the home page

router.get('/', (request, response) => {
  response.redirect('clucks/index');
});

router.get('/sign_in', (request, response) => {
  let message = 'none';
  response.render('signIn', { message });
});

//allows sign in function to happen, redirects the user to the index page

router.post('/sign_in', (request, response) => {
  const params = request.body;
  console.log('request.body: ', params);

  response.cookie('username', params.username, { maxAge: COOKIE_MAX_AGE });
  response.redirect('/clucks/index');
});

//allows the sign out page to happen, redirects user to the index page

router.post('/sign_out', (request, response) => {
  response.clearCookie('username');
  response.redirect('/clucks/index');
});

module.exports = router;