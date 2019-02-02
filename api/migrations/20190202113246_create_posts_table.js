exports.up = function(knex, Promise) {
  return knex.schema.createTable("posts", function(t) {
    t.increments("id").primary();
    t.string("name");
    t.string("body");
    t.integer("threadsId");
    t.integer("usersId");
    t.timestamp("createdAt").defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("posts");
};
