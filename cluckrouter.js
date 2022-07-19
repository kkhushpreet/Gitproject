const express = require('express');
const knex = require('../db/connections');
const router = express.Router();

// when click on the cluck! button to create a new cluck, it brings the user to the new page if signed in
//if not signed in, it redirects them to the sign in page

router.get('/new', (request, response) => {
  const username = request.cookies.username;
  let message = 'error';
  if (username) {
    response.render('clucks/new');
  } else response.render('SignIn', { message });
});

// after the user fills out the form on the new page, data is sent to the clucks table in the db
// they are then redirected to the index page
router.post('/', (request, response) => {
  const username = request.cookies.username;

  const cluckInfo = request.body;
  knex('clucks')
    .insert({
      username: username,
      content: cluckInfo.content,
      image_url: cluckInfo.image_url
    })
    .returning('*')
    .then(response.redirect(`clucks/index`));
});

router.get('/index', (request, response) => {
  knex('clucks')
    .orderBy('created_at', 'desc')
    .then(clucks => {
      response.render('clucks/index', { clucks });
    });
});

module.exports = router;