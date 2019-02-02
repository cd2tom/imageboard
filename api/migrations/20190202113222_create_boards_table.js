exports.up = function(knex, Promise) {
  return knex.schema.createTable("boards", function(t) {
    t.increments("id").primary();
    t.string("name");
    t.string("handle");
    t.timestamp("createdAt").defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("boards");
};
