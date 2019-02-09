exports.up = function(knex, Promise) {
  return knex.schema.createTable("users", function(t) {
    t.increments("id").primary();
    t.string("name");
    t.string("email");
    t.timestamp("createdAt").defaultTo(knex.fn.now());
    t.timestamp("updatedAt").defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("users");
};
