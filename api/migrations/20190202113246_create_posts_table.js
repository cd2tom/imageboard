exports.up = function(knex, Promise) {
  return knex.schema.createTable("posts", function(t) {
    t.increments("id").primary();
    t.string("subject").defaultTo("");
    t.string("name").defaultTo("");
    t.string("body");
    t.boolean("archived").defaultTo(false);
    t.integer("boardsId");
    t.integer("threadsId").defaultTo(null);
    t.integer("usersId").defaultTo(null);
    t.timestamp("createdAt").defaultTo(knex.fn.now());
    t.timestamp("updatedAt").defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("posts");
};
