exports.up = function(knex, Promise) {
    return knex.schema.createTable('clucks', table => {
      table.increments('id');
      table.string('username');
      table.string('image_url');
      table.string('content'); // I decided to use a character limit of 255 to keep to the whole twitter theme, this is why I used string and not text
      table.timestamps(true, true);
    });
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTable('clucks');
  };