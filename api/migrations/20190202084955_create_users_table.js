exports.up = function(knex, Promise) {
  return knex.schema.createTable("users", function(t) {
    t.increments("id").primary();
    t.string("name");
    t.string("email");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("users");
};
