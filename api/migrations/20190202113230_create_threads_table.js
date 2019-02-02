exports.up = function(knex, Promise) {
  return knex.schema.createTable("threads", function(t) {
    t.increments("id").primary();
    t.string("name");
    t.integer("boardsId");
    t.timestamp("createdAt").defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("threads");
};
